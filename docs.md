# Documentation

## Your Approach & Decisions

### Implementation Overview

I've implemented a comprehensive energy generation data visualization tool that meets all the requirements:

1. **API Integration**: Created a robust API service (`src/lib/api.ts`) that handles all endpoints
2. **Dataset Comparison**: Built side-by-side comparison views for medium vs high resolution data
3. **Interactive Filtering**: Implemented energy type filtering with show/hide functionality
4. **Year Range Filtering**: Added year range selection for focused data analysis
5. **Enhanced UI**: Created a modern, responsive interface with loading states and error handling

### Key Components

- **ApiService**: Centralized API communication with proper error handling
- **DatasetSelector**: Allows users to select one or both datasets for comparison
- **EnergyTypeFilter**: Interactive filter for showing/hiding energy types with visual indicators
- **YearRangeFilter**: Year range selection with quick preset buttons and custom range selection
- **ComparisonView**: Responsive layout that adapts to single or multiple dataset selection
- **Enhanced StackedBarChart**: Improved tooltips with MW values and better formatting

### Technical Decisions

1. **Responsive Design**: Mobile-first approach with Tailwind CSS
2. **Performance**: Efficient data fetching with Promise.all for parallel requests
3. **User Experience**: Clear loading indicators, error states, and intuitive controls
4. **TanStack Query**: Advanced caching, background refetching, and error handling
5. **Year Filtering**: Server-side filtering for optimal performance
6. **Testing**: Basic Vitest unit testing for some components


### Notes

- The app automatically loads the medium resolution dataset by default
- Users can select both datasets for side-by-side comparison
- Energy type filtering works across all selected datasets
- Year range filtering allows users to focus on specific time periods
- Tooltips show precise MW values for each technology
- The interface is fully responsive and works on mobile devices

### Future Improvements

If I had more time, I would add:

1. **Data Export**: Allow users to export filtered data as CSV/JSON
2. **Caching**: Implement client-side caching for better performance
3. **Accessibility**: Add ARIA labels and keyboard navigation
4. **Testing**: Further expand on unit tests and include integration tests
5. **Themes**: Add dark mode support
6. **Advanced Visualizations**: Add line charts, pie charts, and other chart types
7. **Deployment**: Deploy to vercel or similar
