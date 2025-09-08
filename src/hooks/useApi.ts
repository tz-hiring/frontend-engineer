import { useQuery, useQueries } from '@tanstack/react-query';
import { getDatasets, getFilteredDataset } from '@/lib/api';
import { FilteredDatasetResponse } from '@/types/api';

// Query keys for caching
export const queryKeys = {
  datasets: ['datasets'] as const,
  dataset: (id: string) => ['dataset', id] as const,
  filteredDataset: (id: string, filters?: any) => ['filteredDataset', id, filters] as const,
};

// Hook to get all available datasets
export const useDatasets = () => {
  return useQuery({
    queryKey: queryKeys.datasets,
    queryFn: getDatasets,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to get filtered dataset data
export const useFilteredDataset = (
  id: string,
  filters?: {
    startYear?: number;
    endYear?: number;
    energyTypes?: string[];
  }
) => {
  return useQuery({
    queryKey: queryKeys.filteredDataset(id, filters),
    queryFn: () => getFilteredDataset(id, filters),
  });
};

// Hook to get multiple filtered datasets in parallel
export const useMultipleFilteredDatasets = (
  datasetIds: string[],
  filters?: {
    startYear?: number;
    endYear?: number;
    energyTypes?: string[];
  }
) => {
  return useQueries({
    queries: datasetIds.map((id) => ({
      queryKey: queryKeys.filteredDataset(id, filters),
      queryFn: () => getFilteredDataset(id, filters),
      enabled: !!id,
      staleTime: 2 * 60 * 1000,
    })),
  });
};

// Custom hook that combines multiple datasets into a single object
export const useDatasetComparison = (
  selectedDatasets: string[],
  filters?: {
    startYear?: number;
    endYear?: number;
    energyTypes?: string[];
  }
) => {
  const queries = useMultipleFilteredDatasets(selectedDatasets, filters);
  
  const isLoading = queries.some(query => query.isLoading);
  const isError = queries.some(query => query.isError);
  const error = queries.find(query => query.error)?.error;
  
  // Combine all successful queries into a single object
  const datasetData: Record<string, FilteredDatasetResponse> = {};
  queries.forEach((query, index) => {
    if (query.data && selectedDatasets[index]) {
      datasetData[selectedDatasets[index]] = query.data;
    }
  });
  
  return {
    data: datasetData,
    isLoading,
    isError,
    error,
    refetch: () => queries.forEach(query => query.refetch()),
  };
};