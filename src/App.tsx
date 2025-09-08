import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { chartConfig, chartKeys } from '@/constants';
import { useDatasets, useDatasetComparison } from '@/hooks/useApi';
import { EnergyTypeFilter } from '@/components/EnergyTypeFilter';
import { DatasetSelector } from '@/components/DatasetSelector';
import { ComparisonView } from '@/components/ComparisonView';
import { YearRangeFilter } from '@/components/YearRangeFilter';

export default function App() {
  const [selectedDatasets, setSelectedDatasets] = useState<string[]>(['indonesia-generation-medium-resolution']);
  const [visibleEnergyTypes, setVisibleEnergyTypes] = useState<string[]>(chartKeys);
  const [startYear, setStartYear] = useState<number>(2023);
  const [endYear, setEndYear] = useState<number>(2050);

  // Use TanStack Query hooks
  const { data: datasets = [], isLoading: datasetsLoading, error: datasetsError } = useDatasets();
  const { 
    data: datasetData, 
    isLoading: dataLoading, 
    isError: dataError, 
    error: dataErrorDetails
  } = useDatasetComparison(selectedDatasets, {
    energyTypes: visibleEnergyTypes,
    startYear: startYear,
    endYear: endYear,
  });

  const handleDatasetToggle = (datasetId: string) => {
    setSelectedDatasets(prev => {
      if (prev.includes(datasetId)) {
        return prev.filter(id => id !== datasetId);
      } else {
        return [...prev, datasetId];
      }
    });
  };

  const handleEnergyTypeToggle = (energyType: string) => {
    setVisibleEnergyTypes(prev => {
      if (prev.includes(energyType)) {
        return prev.filter(type => type !== energyType);
      } else {
        return [...prev, energyType];
      }
    });
  };

  const handleStartYearChange = (year: number) => {
    setStartYear(year);
    // Ensure start year is not after end year
    if (year > endYear) {
      setEndYear(year);
    }
  };

  const handleEndYearChange = (year: number) => {
    setEndYear(year);
    // Ensure end year is not before start year
    if (year < startYear) {
      setStartYear(year);
    }
  };

  const getDatasetName = (datasetId: string) => {
    const dataset = datasets.find(d => d.id === datasetId);
    return dataset?.name || datasetId;
  };

  if (datasetsLoading && datasets.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading datasets...</p>
        </div>
      </div>
    );
  }

  if (datasetsError || dataError) {
    const errorMessage = datasetsError?.message || dataErrorDetails?.message || 'An error occurred';
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error: {errorMessage}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-4"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Indonesia Energy Generation Analysis
          </h1>
          <p className="text-gray-600">
            Compare energy generation scenarios and explore data from 2023 to 2050
          </p>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <DatasetSelector
            datasets={datasets}
            selectedDatasets={selectedDatasets}
            onDatasetToggle={handleDatasetToggle}
          />
          <EnergyTypeFilter
            energyTypes={chartKeys}
            visibleEnergyTypes={visibleEnergyTypes}
            onEnergyTypeToggle={handleEnergyTypeToggle}
            chartConfig={chartConfig}
          />
        </div>

        {/* Year Range Filter */}
        <div className="mb-8">
          <YearRangeFilter
            startYear={startYear}
            endYear={endYear}
            onStartYearChange={handleStartYearChange}
            onEndYearChange={handleEndYearChange}
          />
        </div>

        {/* Comparison View */}
        <ComparisonView
          datasets={datasetData}
          visibleEnergyTypes={visibleEnergyTypes}
          chartConfig={chartConfig}
          getDatasetName={getDatasetName}
          loading={dataLoading}
        />
      </div>
    </div>
  );
}