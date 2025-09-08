import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ComparisonView } from '../ComparisonView'
import { DatasetResponse } from '@/types/api'
import { ChartConfig } from '@/components/ui/chart'

// Mock the StackedBarChart component
vi.mock('@/components/ui/stacked-bar-chart', () => ({
  StackedBarChart: ({ data, keys, config, className }: any) => (
    <div data-testid="stacked-bar-chart" data-keys={keys.join(',')} className={className}>
      Mocked Chart with {data.length} data points
    </div>
  ),
}))

describe('ComparisonView', () => {
  const mockChartConfig: ChartConfig = {
    solar: { label: 'Solar', color: '#ff6b6b' },
    wind: { label: 'Wind', color: '#4ecdc4' },
  }

  const mockDatasetData: Record<string, DatasetResponse> = {
    'dataset-1': {
      id: 'dataset-1',
      data: [
        { year: 2023, solar: 100, wind: 200 },
        { year: 2024, solar: 150, wind: 250 },
      ],
      metadata: {
        totalRecords: 2,
        years: [2023, 2024],
        energyTypes: ['solar', 'wind'],
      },
    },
    'dataset-2': {
      id: 'dataset-2',
      data: [
        { year: 2023, solar: 120, wind: 180 },
        { year: 2024, solar: 160, wind: 220 },
      ],
      metadata: {
        totalRecords: 2,
        years: [2023, 2024],
        energyTypes: ['solar', 'wind'],
      },
    },
  }

  const defaultProps = {
    datasets: mockDatasetData,
    visibleEnergyTypes: ['solar', 'wind'],
    chartConfig: mockChartConfig,
    getDatasetName: vi.fn((id: string) => `Dataset ${id}`),
    loading: false,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders empty state when no datasets are provided', () => {
    const emptyProps = {
      ...defaultProps,
      datasets: {},
    }
    
    render(<ComparisonView {...emptyProps} />)
    
    expect(screen.getByText('Select datasets to compare energy generation scenarios')).toBeInTheDocument()
  })

  it('renders single dataset view', () => {
    const singleDatasetProps = {
      ...defaultProps,
      datasets: { 'dataset-1': mockDatasetData['dataset-1'] },
    }
    
    render(<ComparisonView {...singleDatasetProps} />)
    
    expect(screen.getByText('Dataset dataset-1')).toBeInTheDocument()
    expect(screen.getByTestId('stacked-bar-chart')).toBeInTheDocument()
  })

  it('renders multiple datasets in grid layout', () => {
    render(<ComparisonView {...defaultProps} />)
    
    expect(screen.getByText('Dataset dataset-1')).toBeInTheDocument()
    expect(screen.getByText('Dataset dataset-2')).toBeInTheDocument()
    
    const charts = screen.getAllByTestId('stacked-bar-chart')
    expect(charts).toHaveLength(2)
  })

  it('passes correct props to StackedBarChart for single dataset', () => {
    const singleDatasetProps = {
      ...defaultProps,
      datasets: { 'dataset-1': mockDatasetData['dataset-1'] },
    }
    
    render(<ComparisonView {...singleDatasetProps} />)
    
    const chart = screen.getByTestId('stacked-bar-chart')
    expect(chart).toHaveAttribute('data-keys', 'solar,wind')
  })

  it('passes correct props to StackedBarChart for multiple datasets', () => {
    render(<ComparisonView {...defaultProps} />)
    
    const charts = screen.getAllByTestId('stacked-bar-chart')
    charts.forEach(chart => {
      expect(chart).toHaveAttribute('data-keys', 'solar,wind')
    })
  })

  it('applies correct className for multiple datasets', () => {
    render(<ComparisonView {...defaultProps} />)
    
    const charts = screen.getAllByTestId('stacked-bar-chart')
    charts.forEach(chart => {
      expect(chart).toHaveClass('h-[400px]')
    })
  })

  it('does not apply height className for single dataset', () => {
    const singleDatasetProps = {
      ...defaultProps,
      datasets: { 'dataset-1': mockDatasetData['dataset-1'] },
    }
    
    render(<ComparisonView {...singleDatasetProps} />)
    
    const chart = screen.getByTestId('stacked-bar-chart')
    expect(chart).not.toHaveClass('h-[400px]')
  })

  it('shows loading spinner when loading is true', () => {
    const loadingProps = {
      ...defaultProps,
      loading: true,
    }
    
    render(<ComparisonView {...loadingProps} />)
    
    const loadingSpinners = screen.getAllByRole('generic')
    const spinner = loadingSpinners.find(el => 
      el.className.includes('animate-spin') && 
      el.className.includes('rounded-full')
    )
    
    expect(spinner).toBeInTheDocument()
  })

  it('does not show loading spinner when loading is false', () => {
    render(<ComparisonView {...defaultProps} />)
    
    const loadingSpinners = screen.getAllByRole('generic')
    const spinner = loadingSpinners.find(el => 
      el.className.includes('animate-spin') && 
      el.className.includes('rounded-full')
    )
    
    expect(spinner).toBeUndefined()
  })

  it('calls getDatasetName for each dataset', () => {
    render(<ComparisonView {...defaultProps} />)
    
    expect(defaultProps.getDatasetName).toHaveBeenCalledWith('dataset-1')
    expect(defaultProps.getDatasetName).toHaveBeenCalledWith('dataset-2')
    expect(defaultProps.getDatasetName).toHaveBeenCalledTimes(2)
  })

  it('handles empty visibleEnergyTypes array', () => {
    const emptyEnergyTypesProps = {
      ...defaultProps,
      visibleEnergyTypes: [],
    }
    
    render(<ComparisonView {...emptyEnergyTypesProps} />)
    
    const charts = screen.getAllByTestId('stacked-bar-chart')
    charts.forEach(chart => {
      expect(chart).toHaveAttribute('data-keys', '')
    })
  })

  it('renders with correct grid layout for multiple datasets', () => {
    render(<ComparisonView {...defaultProps} />)
    
    const gridContainer = screen.getByText('Dataset dataset-1').closest('.grid')
    expect(gridContainer).toHaveClass('grid-cols-1', 'lg:grid-cols-2')
  })
})
