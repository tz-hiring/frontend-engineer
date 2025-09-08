import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { DatasetSelector } from '../DatasetSelector'
import { Dataset } from '@/types/api'

describe('DatasetSelector', () => {
  const mockDatasets: Dataset[] = [
    {
      id: 'dataset-1',
      name: 'High Resolution Dataset',
      description: 'High resolution energy generation data',
      filename: 'high-res.json',
      years: [2023, 2050],
      energyTypes: ['solar', 'wind', 'hydro'],
    },
    {
      id: 'dataset-2',
      name: 'Medium Resolution Dataset',
      description: 'Medium resolution energy generation data',
      filename: 'medium-res.json',
      years: [2023, 2050],
      energyTypes: ['solar', 'wind', 'hydro', 'coal'],
    },
  ]

  const defaultProps = {
    datasets: mockDatasets,
    selectedDatasets: ['dataset-1'],
    onDatasetToggle: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders with default props', () => {
    render(<DatasetSelector {...defaultProps} />)
    
    expect(screen.getByText('Dataset Selection')).toBeInTheDocument()
    expect(screen.getByText('Select one or more datasets to compare energy generation scenarios')).toBeInTheDocument()
  })

  it('renders all datasets', () => {
    render(<DatasetSelector {...defaultProps} />)
    
    expect(screen.getByText('High Resolution Dataset')).toBeInTheDocument()
    expect(screen.getByText('High resolution energy generation data')).toBeInTheDocument()
    expect(screen.getByText('Medium Resolution Dataset')).toBeInTheDocument()
    expect(screen.getByText('Medium resolution energy generation data')).toBeInTheDocument()
  })

  it('shows correct button states based on selection', () => {
    render(<DatasetSelector {...defaultProps} />)
    
    // dataset-1 should be selected
    const dataset1Button = screen.getByText('Selected')
    expect(dataset1Button).toBeInTheDocument()
    expect(dataset1Button.closest('button')).toHaveClass('bg-primary')
    
    // dataset-2 should not be selected
    const dataset2Button = screen.getByText('Select')
    expect(dataset2Button).toBeInTheDocument()
    expect(dataset2Button.closest('button')).toHaveClass('border-input')
  })

  it('calls onDatasetToggle when dataset button is clicked', () => {
    render(<DatasetSelector {...defaultProps} />)
    
    const dataset2Button = screen.getByText('Select')
    fireEvent.click(dataset2Button)
    
    expect(defaultProps.onDatasetToggle).toHaveBeenCalledWith('dataset-2')
  })

  it('handles empty datasets array', () => {
    const emptyProps = {
      ...defaultProps,
      datasets: [],
    }
    
    render(<DatasetSelector {...emptyProps} />)
    
    expect(screen.getByText('Dataset Selection')).toBeInTheDocument()
    expect(screen.getByText('Select one or more datasets to compare energy generation scenarios')).toBeInTheDocument()
  })

  it('handles empty selectedDatasets array', () => {
    const noSelectionProps = {
      ...defaultProps,
      selectedDatasets: [],
    }
    
    render(<DatasetSelector {...noSelectionProps} />)
    
    // All buttons should show "Select"
    const selectButtons = screen.getAllByText('Select')
    expect(selectButtons).toHaveLength(2)
  })

  it('updates button states when selectedDatasets prop changes', () => {
    const { rerender } = render(<DatasetSelector {...defaultProps} />)
    
    // Initially dataset-1 is selected
    expect(screen.getByText('Selected')).toBeInTheDocument()
    expect(screen.getByText('Select')).toBeInTheDocument()
    
    // Change selection to dataset-2
    rerender(
      <DatasetSelector 
        {...defaultProps} 
        selectedDatasets={['dataset-2']} 
      />
    )
    
    // Now dataset-2 should be selected
    const selectedButtons = screen.getAllByText('Selected')
    const selectButtons = screen.getAllByText('Select')
    
    expect(selectedButtons).toHaveLength(1)
    expect(selectButtons).toHaveLength(1)
  })

  it('handles multiple selected datasets', () => {
    const multipleSelectionProps = {
      ...defaultProps,
      selectedDatasets: ['dataset-1', 'dataset-2'],
    }
    
    render(<DatasetSelector {...multipleSelectionProps} />)
    
    const selectedButtons = screen.getAllByText('Selected')
    expect(selectedButtons).toHaveLength(2)
  })

  it('displays dataset information correctly', () => {
    render(<DatasetSelector {...defaultProps} />)
    
    // Check that dataset names and descriptions are displayed
    expect(screen.getByText('High Resolution Dataset')).toBeInTheDocument()
    expect(screen.getByText('High resolution energy generation data')).toBeInTheDocument()
    expect(screen.getByText('Medium Resolution Dataset')).toBeInTheDocument()
    expect(screen.getByText('Medium resolution energy generation data')).toBeInTheDocument()
  })
})
