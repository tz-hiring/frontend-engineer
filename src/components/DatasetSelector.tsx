import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dataset } from '@/types/api';

interface DatasetSelectorProps {
  datasets: Dataset[];
  selectedDatasets: string[];
  onDatasetToggle: (datasetId: string) => void;
}

export function DatasetSelector({ datasets, selectedDatasets, onDatasetToggle }: DatasetSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Dataset Selection</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {datasets.map((dataset) => (
            <div key={dataset.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-sm">{dataset.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{dataset.description}</p>
              </div>
              <Button
                variant={selectedDatasets.includes(dataset.id) ? "default" : "outline"}
                size="sm"
                onClick={() => onDatasetToggle(dataset.id)}
                className="ml-4"
              >
                {selectedDatasets.includes(dataset.id) ? 'Selected' : 'Select'}
              </Button>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Select one or more datasets to compare energy generation scenarios
        </p>
      </CardContent>
    </Card>
  );
}
