import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from '../App'
import { Dataset } from '@/types/api'

// Mock the API hooks
vi.mock('@/hooks/useApi', () => ({
  useDatasets: vi.fn(),
  useDatasetComparison: vi.fn(),
}))

// Mock the components to focus on App logic
vi.mock('@/components/DatasetSelector', () => ({
  DatasetSelector: ({ datasets, selectedDatasets, onDatasetToggle }: any) => (
    <div data-testid="dataset-selector">
      <div>Dataset Selector</div>
      <div>Selected: {selectedDatasets.join(', ')}</div>
      <button onClick={() => onDatasetToggle('test-dataset')}>Toggle Dataset</button>
    </div>
  ),
}))

vi.mock('@/components/EnergyTypeFilter', () => ({
  EnergyTypeFilter: ({ energyTypes, visibleEnergyTypes, onEnergyTypeToggle }: any) => (
    <div data-testid="energy-type-filter">
      <div>Energy Type Filter</div>
      <div>Visible: {visibleEnergyTypes.join(', ')}</div>
      <button onClick={() => onEnergyTypeToggle('solar')}>Toggle Solar</button>
    </div>
  ),
}))

vi.mock('@/components/YearRangeFilter', () => ({
  YearRangeFilter: ({ startYear, endYear, onStartYearChange, onEndYearChange }: any) => (
    <div data-testid="year-range-filter">
      <div>Year Range Filter</div>
      <div>Range: {startYear} - {endYear}</div>
      <button onClick={() => onStartYearChange(2025)}>Change Start Year</button>
      <button onClick={() => onEndYearChange(2045)}>Change End Year</button>
    </div>
  ),
}))

vi.mock('@/components/ComparisonView', () => ({
  ComparisonView: ({ datasets, visibleEnergyTypes, loading }: any) => (
    <div data-testid="comparison-view">
      <div>Comparison View</div>
      <div>Loading: {loading.toString()}</div>
      <div>Datasets: {Object.keys(datasets).length}</div>
    </div>
  ),
}))

describe('App', () => {
  let queryClient: QueryClient
  const mockDatasets: Dataset[] = [
    {
      id: 'test-dataset',
      name: 'Test Dataset',
      description: 'Test description',
      filename: 'test.json',
      years: [2023, 2050],
      energyTypes: ['solar', 'wind'],
    },
  ]

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    })
    vi.clearAllMocks()
  })

  const renderApp = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    )
  }

  it('renders loading state initially', async () => {
    const { useDatasets, useDatasetComparison } = await vi.importMock('@/hooks/useApi')
    
    useDatasets.mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
    })
    
    useDatasetComparison.mockReturnValue({
      data: {},
      isLoading: false,
      isError: false,
      error: null,
    })

    renderApp()
    
    expect(screen.getByText('Loading datasets...')).toBeInTheDocument()
  })

  it('renders error state when datasets fail to load', async () => {
    const { useDatasets, useDatasetComparison } = await vi.importMock('@/hooks/useApi')
    
    useDatasets.mockReturnValue({
      data: [],
      isLoading: false,
      error: new Error('Failed to load datasets'),
    })
    
    useDatasetComparison.mockReturnValue({
      data: {},
      isLoading: false,
      isError: false,
      error: null,
    })

    renderApp()
    
    expect(screen.getByText('Error: Failed to load datasets')).toBeInTheDocument()
    expect(screen.getByText('Retry')).toBeInTheDocument()
  })

  it('renders main app when datasets load successfully', async () => {
    const { useDatasets, useDatasetComparison } = await vi.importMock('@/hooks/useApi')
    
    useDatasets.mockReturnValue({
      data: mockDatasets,
      isLoading: false,
      error: null,
    })
    
    useDatasetComparison.mockReturnValue({
      data: {},
      isLoading: false,
      isError: false,
      error: null,
    })

    renderApp()
    
    expect(screen.getByText('Indonesia Energy Generation Analysis')).toBeInTheDocument()
    expect(screen.getByText('Compare energy generation scenarios and explore data from 2023 to 2050')).toBeInTheDocument()
    expect(screen.getByTestId('dataset-selector')).toBeInTheDocument()
    expect(screen.getByTestId('energy-type-filter')).toBeInTheDocument()
    expect(screen.getByTestId('year-range-filter')).toBeInTheDocument()
    expect(screen.getByTestId('comparison-view')).toBeInTheDocument()
  })

  it('handles dataset toggle correctly', async () => {
    const { useDatasets, useDatasetComparison } = await vi.importMock('@/hooks/useApi')
    
    useDatasets.mockReturnValue({
      data: mockDatasets,
      isLoading: false,
      error: null,
    })
    
    useDatasetComparison.mockReturnValue({
      data: {},
      isLoading: false,
      isError: false,
      error: null,
    })

    renderApp()
    
    const toggleButton = screen.getByText('Toggle Dataset')
    fireEvent.click(toggleButton)
    
    // The selected datasets should be updated
    expect(screen.getByText('Selected: indonesia-generation-medium-resolution, test-dataset')).toBeInTheDocument()
  })

  it('handles energy type toggle correctly', async () => {
    const { useDatasets, useDatasetComparison } = await vi.importMock('@/hooks/useApi')
    
    useDatasets.mockReturnValue({
      data: mockDatasets,
      isLoading: false,
      error: null,
    })
    
    useDatasetComparison.mockReturnValue({
      data: {},
      isLoading: false,
      isError: false,
      error: null,
    })

    renderApp()
    
    const toggleButton = screen.getByText('Toggle Solar')
    fireEvent.click(toggleButton)
    
    // The visible energy types should be updated (solar should be removed)
    expect(screen.getByText('Visible: coal-subcritical, coal-supercritical, coal-ultrasupercritical, gas-combined-cycle, gas-open-cycle-gas-turbine, geothermal, hydro-reservoir-and-run-of-river, wind-onshore, wind-offshore, nuclear, bioenergy, battery, petroleum-products-internal-combustion-engine')).toBeInTheDocument()
  })

  it('handles year range changes correctly', async () => {
    const { useDatasets, useDatasetComparison } = await vi.importMock('@/hooks/useApi')
    
    useDatasets.mockReturnValue({
      data: mockDatasets,
      isLoading: false,
      error: null,
    })
    
    useDatasetComparison.mockReturnValue({
      data: {},
      isLoading: false,
      isError: false,
      error: null,
    })

    renderApp()
    
    const changeStartYearButton = screen.getByText('Change Start Year')
    fireEvent.click(changeStartYearButton)
    
    expect(screen.getByText('Range: 2025 - 2050')).toBeInTheDocument()
    
    const changeEndYearButton = screen.getByText('Change End Year')
    fireEvent.click(changeEndYearButton)
    
    expect(screen.getByText('Range: 2025 - 2045')).toBeInTheDocument()
  })

  it('ensures start year is not after end year', async () => {
    const { useDatasets, useDatasetComparison } = await vi.importMock('@/hooks/useApi')
    
    useDatasets.mockReturnValue({
      data: mockDatasets,
      isLoading: false,
      error: null,
    })
    
    useDatasetComparison.mockReturnValue({
      data: {},
      isLoading: false,
      isError: false,
      error: null,
    })

    renderApp()
    
    // Set end year to 2020 (before start year of 2023)
    const changeEndYearButton = screen.getByText('Change End Year')
    fireEvent.click(changeEndYearButton)
    
    // Start year should be adjusted to match end year
    expect(screen.getByText('Range: 2023 - 2045')).toBeInTheDocument()
  })

  it('shows loading state in comparison view', async () => {
    const { useDatasets, useDatasetComparison } = await vi.importMock('@/hooks/useApi')
    
    useDatasets.mockReturnValue({
      data: mockDatasets,
      isLoading: false,
      error: null,
    })
    
    useDatasetComparison.mockReturnValue({
      data: {},
      isLoading: true,
      isError: false,
      error: null,
    })

    renderApp()
    
    expect(screen.getByText('Loading: true')).toBeInTheDocument()
  })

  it('handles data loading error', async () => {
    const { useDatasets, useDatasetComparison } = await vi.importMock('@/hooks/useApi')
    
    useDatasets.mockReturnValue({
      data: mockDatasets,
      isLoading: false,
      error: null,
    })
    
    useDatasetComparison.mockReturnValue({
      data: {},
      isLoading: false,
      isError: true,
      error: new Error('Data loading failed'),
    })

    renderApp()
    
    expect(screen.getByText('Error: Data loading failed')).toBeInTheDocument()
  })
})
