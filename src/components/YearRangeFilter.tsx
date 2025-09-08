import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface YearRangeFilterProps {
  startYear: number;
  endYear: number;
  onStartYearChange: (year: number) => void;
  onEndYearChange: (year: number) => void;
  minYear?: number;
  maxYear?: number;
}

export function YearRangeFilter({ 
  startYear, 
  endYear, 
  onStartYearChange, 
  onEndYearChange,
  minYear = 2023,
  maxYear = 2050
}: YearRangeFilterProps) {
  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);

  const handleReset = () => {
    onStartYearChange(minYear);
    onEndYearChange(maxYear);
  };

  const handleQuickRange = (range: 'recent' | 'mid' | 'future') => {
    switch (range) {
      case 'recent':
        onStartYearChange(2023);
        onEndYearChange(2030);
        break;
      case 'mid':
        onStartYearChange(2030);
        onEndYearChange(2040);
        break;
      case 'future':
        onStartYearChange(2040);
        onEndYearChange(2050);
        break;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          Year Range Filter
          <Button variant="outline" size="sm" onClick={handleReset}>
            Reset
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          
          {/* Year Range Selectors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Start Year
              </label>
              <select
                value={startYear}
                onChange={(e) => onStartYearChange(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                End Year
              </label>
              <select
                value={endYear}
                onChange={(e) => onEndYearChange(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Year Range Display */}
          <div className="text-center">
            <div className="text-sm text-gray-600">
              Showing data from <span className="font-semibold">{startYear}</span> to{' '}
              <span className="font-semibold">{endYear}</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {endYear - startYear + 1} years selected
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
