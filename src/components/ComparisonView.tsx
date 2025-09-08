import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StackedBarChart } from '@/components/ui/stacked-bar-chart';
import { ChartConfig } from '@/components/ui/chart';
import { DatasetResponse } from '@/types/api';

interface ComparisonViewProps {
  datasets: Record<string, DatasetResponse>;
  visibleEnergyTypes: string[];
  chartConfig: ChartConfig;
  getDatasetName: (id: string) => string;
  loading: boolean;
}

export function ComparisonView({ 
  datasets, 
  visibleEnergyTypes, 
  chartConfig, 
  getDatasetName,
  loading 
}: ComparisonViewProps) {
  const datasetIds = Object.keys(datasets);
  
  if (datasetIds.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <p className="text-gray-500 text-lg">
            Select datasets to compare energy generation scenarios
          </p>
        </CardContent>
      </Card>
    );
  }

  if (datasetIds.length === 1) {
    const [datasetId] = datasetIds;
    const data = datasets[datasetId];
    
    return (
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {getDatasetName(datasetId)}
            {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <StackedBarChart
            data={data.data}
            keys={visibleEnergyTypes}
            config={chartConfig}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {datasetIds.map((datasetId) => {
        const data = datasets[datasetId];
        
        return (
          <Card key={datasetId} className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg">
                {getDatasetName(datasetId)}
                {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <StackedBarChart
                data={data.data}
                keys={visibleEnergyTypes}
                config={chartConfig}
                className="h-[400px]"
              />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
