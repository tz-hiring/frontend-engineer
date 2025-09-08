import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartConfig } from '@/components/ui/chart';

interface EnergyTypeFilterProps {
  energyTypes: string[];
  visibleEnergyTypes: string[];
  onEnergyTypeToggle: (energyType: string) => void;
  chartConfig: ChartConfig;
}

export function EnergyTypeFilter({ 
  energyTypes, 
  visibleEnergyTypes, 
  onEnergyTypeToggle, 
  chartConfig 
}: EnergyTypeFilterProps) {
  const handleSelectAll = () => {
    energyTypes.forEach(type => {
      if (!visibleEnergyTypes.includes(type)) {
        onEnergyTypeToggle(type);
      }
    });
  };

  const handleDeselectAll = () => {
    visibleEnergyTypes.forEach(type => {
      onEnergyTypeToggle(type);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          Energy Type Filter
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleSelectAll}>
              Select All
            </Button>
            <Button variant="outline" size="sm" onClick={handleDeselectAll}>
              Deselect All
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {energyTypes.map((energyType) => {
            const config = chartConfig[energyType];
            const isVisible = visibleEnergyTypes.includes(energyType);
            
            return (
              <Button
                key={energyType}
                variant={isVisible ? "default" : "outline"}
                size="sm"
                onClick={() => onEnergyTypeToggle(energyType)}
                className="justify-start h-auto p-2"
              >
                <div 
                  className="w-3 h-3 rounded-sm mr-2 flex-shrink-0"
                  style={{ backgroundColor: config?.color || '#gray' }}
                />
                <span className="text-xs">{config?.label || energyType}</span>
              </Button>
            );
          })}
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Toggle energy types to show/hide them in the charts
        </p>
      </CardContent>
    </Card>
  );
}
