import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { YearRangeFilter } from '../YearRangeFilter'

describe('YearRangeFilter', () => {
  const defaultProps = {
    startYear: 2023,
    endYear: 2050,
    onStartYearChange: vi.fn(),
    onEndYearChange: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders with default props', () => {
    render(<YearRangeFilter {...defaultProps} />)
    
    expect(screen.getByText('Year Range Filter')).toBeInTheDocument()
    expect(screen.getByText('Start Year')).toBeInTheDocument()
    expect(screen.getByText('End Year')).toBeInTheDocument()
    expect(screen.getByText('Reset')).toBeInTheDocument()
  })

  it('displays the current year range', () => {
    render(<YearRangeFilter {...defaultProps} />)
    
    expect(screen.getByText((content, element) => {
      return element?.textContent === 'Showing data from 2023 to 2050'
    })).toBeInTheDocument()
    expect(screen.getByText('28 years selected')).toBeInTheDocument()
  })

  it('calls onStartYearChange when start year is changed', () => {
    render(<YearRangeFilter {...defaultProps} />)
    
    const startYearSelect = screen.getByDisplayValue('2023')
    fireEvent.change(startYearSelect, { target: { value: '2025' } })
    
    expect(defaultProps.onStartYearChange).toHaveBeenCalledWith(2025)
  })

  it('calls onEndYearChange when end year is changed', () => {
    render(<YearRangeFilter {...defaultProps} />)
    
    const endYearSelect = screen.getByDisplayValue('2050')
    fireEvent.change(endYearSelect, { target: { value: '2045' } })
    
    expect(defaultProps.onEndYearChange).toHaveBeenCalledWith(2045)
  })

  it('calls reset handlers when reset button is clicked', () => {
    render(<YearRangeFilter {...defaultProps} />)
    
    const resetButton = screen.getByText('Reset')
    fireEvent.click(resetButton)
    
    expect(defaultProps.onStartYearChange).toHaveBeenCalledWith(2023)
    expect(defaultProps.onEndYearChange).toHaveBeenCalledWith(2050)
  })

  it('uses custom min and max years when provided', () => {
    const customProps = {
      ...defaultProps,
      minYear: 2020,
      maxYear: 2030,
    }
    
    render(<YearRangeFilter {...customProps} />)
    
    const resetButton = screen.getByText('Reset')
    fireEvent.click(resetButton)
    
    expect(defaultProps.onStartYearChange).toHaveBeenCalledWith(2020)
    expect(defaultProps.onEndYearChange).toHaveBeenCalledWith(2030)
  })

  it('generates correct number of year options', () => {
    render(<YearRangeFilter {...defaultProps} />)
    
    const startYearSelect = screen.getByDisplayValue('2023')
    const options = startYearSelect.querySelectorAll('option')
    
    // Should have options from 2023 to 2050 (28 years)
    expect(options).toHaveLength(28)
  })

  it('updates year range display when props change', () => {
    const { rerender } = render(<YearRangeFilter {...defaultProps} />)
    
    expect(screen.getByText((content, element) => {
      return element?.textContent === 'Showing data from 2023 to 2050'
    })).toBeInTheDocument()
    expect(screen.getByText('28 years selected')).toBeInTheDocument()
    
    rerender(
      <YearRangeFilter 
        {...defaultProps} 
        startYear={2025} 
        endYear={2035} 
      />
    )
    
    expect(screen.getByText((content, element) => {
      return element?.textContent === 'Showing data from 2025 to 2035'
    })).toBeInTheDocument()
    expect(screen.getByText('11 years selected')).toBeInTheDocument()
  })
})
