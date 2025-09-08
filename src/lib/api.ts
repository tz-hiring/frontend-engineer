import { Dataset, DatasetResponse, FilteredDatasetResponse } from '@/types/api';

const API_BASE_URL = 'http://localhost:3001/api';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }
  return response.json();
};

// Get all available datasets
export const getDatasets = async (): Promise<Dataset[]> => {
  const response = await fetch(`${API_BASE_URL}/datasets`);
  const data = await handleResponse(response);
  return data.datasets;
};

// Get specific dataset by id
export const getDataset = async (id: string): Promise<DatasetResponse> => {
  const response = await fetch(`${API_BASE_URL}/datasets/${id}`);
  return handleResponse(response);
};

// Get filtered dataset with optional filters
export const getFilteredDataset = async (
  id: string,
  filters?: {
    startYear?: number;
    endYear?: number;
    energyTypes?: string[];
  }
): Promise<FilteredDatasetResponse> => {
  const params = new URLSearchParams();
  
  if (filters?.startYear) {
    params.append('startYear', filters.startYear.toString());
  }
  if (filters?.endYear) {
    params.append('endYear', filters.endYear.toString());
  }
  if (filters?.energyTypes && filters.energyTypes.length > 0) {
    params.append('energyTypes', filters.energyTypes.join(','));
  }

  const url = `${API_BASE_URL}/datasets/${id}/filter${params.toString() ? `?${params.toString()}` : ''}`;
  const response = await fetch(url);
  return handleResponse(response);
};

// Health check
export const getHealth = async (): Promise<{ status: string; timestamp: string; version: string }> => {
  const response = await fetch(`${API_BASE_URL}/health`);
  return handleResponse(response);
};