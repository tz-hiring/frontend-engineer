import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi , beforeEach} from 'vitest'
import { EnergyTypeFilter } from '../EnergyTypeFilter'
import { ChartConfig } from '@/components/ui/chart'

describe('EnergyTypeFilter', () => {
  const mockChartConfig: ChartConfig = {
    solar: { label: 'Solar', color: '#ff6b6b' },
    wind: { label: 'Wind', color: '#4ecdc4' },
    hydro: { label: 'Hydro', color: '#45b7d1' },
    coal: { label: 'Coal', color: '#96ceb4' },
  }

  const defaultProps = {
    energyTypes: ['solar', 'wind', 'hydro', 'coal'],
    visibleEnergyTypes: ['solar', 'wind'],
    onEnergyTypeToggle: vi.fn(),
    chartConfig: mockChartConfig,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders with default props', () => {
    render(<EnergyTypeFilter {...defaultProps} />)
    
    expect(screen.getByText('Energy Type Filter')).toBeInTheDocument()
    expect(screen.getByText('Select All')).toBeInTheDocument()
    expect(screen.getByText('Deselect All')).toBeInTheDocument()
    expect(screen.getByText('Toggle energy types to show/hide them in the charts')).toBeInTheDocument()
  })

  it('renders all energy type buttons', () => {
    render(<EnergyTypeFilter {...defaultProps} />)
    
    expect(screen.getByText('Solar')).toBeInTheDocument()
    expect(screen.getByText('Wind')).toBeInTheDocument()
    expect(screen.getByText('Hydro')).toBeInTheDocument()
    expect(screen.getByText('Coal')).toBeInTheDocument()
  })

  it('shows correct button variants based on visibility', () => {
    render(<EnergyTypeFilter {...defaultProps} />)
    
    // Solar and Wind should be visible (default variant)
    const solarButton = screen.getByText('Solar').closest('button')
    const windButton = screen.getByText('Wind').closest('button')
    
    // Hydro and Coal should be hidden (outline variant)
    const hydroButton = screen.getByText('Hydro').closest('button')
    const coalButton = screen.getByText('Coal').closest('button')
    
    expect(solarButton).toHaveClass('bg-primary')
    expect(windButton).toHaveClass('bg-primary')
    expect(hydroButton).toHaveClass('border-input')
    expect(coalButton).toHaveClass('border-input')
  })

  it('calls onEnergyTypeToggle when energy type button is clicked', () => {
    render(<EnergyTypeFilter {...defaultProps} />)
    
    const solarButton = screen.getByText('Solar')
    fireEvent.click(solarButton)
    
    expect(defaultProps.onEnergyTypeToggle).toHaveBeenCalledWith('solar')
  })

  it('calls onEnergyTypeToggle for all hidden types when Select All is clicked', () => {
    render(<EnergyTypeFilter {...defaultProps} />)
    
    const selectAllButton = screen.getByText('Select All')
    fireEvent.click(selectAllButton)
    
    expect(defaultProps.onEnergyTypeToggle).toHaveBeenCalledWith('hydro')
    expect(defaultProps.onEnergyTypeToggle).toHaveBeenCalledWith('coal')
    expect(defaultProps.onEnergyTypeToggle).toHaveBeenCalledTimes(2)
  })

  it('calls onEnergyTypeToggle for all visible types when Deselect All is clicked', () => {
    render(<EnergyTypeFilter {...defaultProps} />)
    
    const deselectAllButton = screen.getByText('Deselect All')
    fireEvent.click(deselectAllButton)
    
    expect(defaultProps.onEnergyTypeToggle).toHaveBeenCalledWith('solar')
    expect(defaultProps.onEnergyTypeToggle).toHaveBeenCalledWith('wind')
    expect(defaultProps.onEnergyTypeToggle).toHaveBeenCalledTimes(2)
  })

  it('displays color indicators for each energy type', () => {
    render(<EnergyTypeFilter {...defaultProps} />)
    
    const colorIndicators = screen.getAllByRole('generic')
    const colorElements = colorIndicators.filter(el => 
      el.style.backgroundColor && el.className.includes('w-3 h-3')
    )
    
    expect(colorElements).toHaveLength(4)
  })

  it('handles energy types without chart config gracefully', () => {
    const propsWithMissingConfig = {
      ...defaultProps,
      energyTypes: ['solar', 'unknown'],
      chartConfig: { solar: { label: 'Solar', color: '#ff6b6b' } },
    }
    
    render(<EnergyTypeFilter {...propsWithMissingConfig} />)
    
    expect(screen.getByText('Solar')).toBeInTheDocument()
    expect(screen.getByText('unknown')).toBeInTheDocument()
  })

  it('updates button states when visibleEnergyTypes prop changes', () => {
    const { rerender } = render(<EnergyTypeFilter {...defaultProps} />)
    
    // Initially solar and wind are visible
    expect(screen.getByText('Solar').closest('button')).toHaveClass('bg-primary')
    
    // Change to show only hydro
    rerender(
      <EnergyTypeFilter 
        {...defaultProps} 
        visibleEnergyTypes={['hydro']} 
      />
    )
    
    expect(screen.getByText('Hydro').closest('button')).toHaveClass('bg-primary')
    expect(screen.getByText('Solar').closest('button')).toHaveClass('border-input')
  })
})
