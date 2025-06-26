# Recordings Module

A modular, reusable component system for recording-related functionality following the same pattern as the widgets module.

## Structure

```
recordings/
├── index.js                 # Main exports
├── README.md                # This file
├── cards/                   # Main card components
│   ├── RecordingCard.jsx    # Recent recordings section
│   ├── AnalyticsCard.jsx    # Analytics metrics section
│   └── TrainingCard.jsx     # Training categories section
├── config/                  # Configuration and data
│   └── recordingsConfig.js  # All data configurations
└── types/                   # Reusable type components
    ├── RecentRecordingItem.jsx    # Individual recording item
    ├── AnalyticsMetric.jsx        # Individual analytics metric
    └── TrainingCategory.jsx       # Individual training category
```

## Usage

### Basic Import

```jsx
import { 
  RecordingCard, 
  AnalyticsCard, 
  TrainingCard,
  getRecordingDataByRole,
  getAnalyticsDataByRole,
  getTrainingDataByRole 
} from '../recordings/index.js';
```

### Using the Cards

#### RecordingCard
```jsx
function RecentRecordingsSection({ selectedRole, selectedLocation, selectedOffice }) {
  const data = getRecordingDataByRole(selectedRole, selectedLocation, selectedOffice);

  const handleItemPlay = (recordingId) => {
    console.log('Playing recording:', recordingId);
  };

  const handleViewAll = () => {
    console.log('View all recordings clicked');
  };

  return (
    <RecordingCard
      title={data.title}
      subtitle="Recent recordings and audio content"
      recordings={data.recordings}
      onItemPlay={handleItemPlay}
      onViewAll={handleViewAll}
    />
  );
}
```

#### AnalyticsCard
```jsx
function RecordingAnalyticsSection({ selectedRole, selectedLocation, selectedOffice }) {
  const data = getAnalyticsDataByRole(selectedRole, selectedLocation, selectedOffice);

  const handleViewDetails = () => {
    console.log('View detailed analytics clicked');
  };

  return (
    <AnalyticsCard
      title={data.title}
      subtitle={data.subtitle}
      metrics={data.metrics}
      insights={data.insights}
      onViewDetails={handleViewDetails}
    />
  );
}
```

#### TrainingCard
```jsx
function TrainingCoachingSection({ selectedRole, selectedLocation, selectedOffice }) {
  const data = getTrainingDataByRole(selectedRole, selectedLocation, selectedOffice);

  const handleCategoryClick = (category) => {
    console.log('Training category clicked:', category);
  };

  const handleBrowseLibrary = () => {
    console.log('Browse training library clicked');
  };

  return (
    <TrainingCard
      title={data.title}
      subtitle={data.subtitle}
      categories={data.categories}
      onCategoryClick={handleCategoryClick}
      onBrowseLibrary={handleBrowseLibrary}
    />
  );
}
```

## Benefits

### ✅ Before Refactoring
- **453 lines** of hardcoded data and components in RecentRecordingsSection
- **534 lines** of hardcoded data and components in RecordingAnalyticsSection  
- **467 lines** of hardcoded data and components in TrainingCoachingSection
- **Total: 1,454 lines** of duplicated logic

### ✅ After Refactoring
- **18 lines** in RecentRecordingsSection (96% reduction)
- **18 lines** in RecordingAnalyticsSection (97% reduction)
- **24 lines** in TrainingCoachingSection (95% reduction)
- **Total: 60 lines** in sections + reusable module

### Key Improvements

1. **DRY Principle**: All data configurations centralized in `recordingsConfig.js`
2. **Reusability**: Components can be used anywhere, not just in sections
3. **Maintainability**: Changes to UI or data only need to be made in one place
4. **Modularity**: Each component has a single responsibility
5. **Consistency**: All recording functionality follows the same patterns
6. **Type Safety**: Centralized data types and constants
7. **Scalability**: Easy to add new recording types or roles

## Configuration

All data is stored in `config/recordingsConfig.js`:

- `DEFAULT_RECENT_RECORDINGS` - Recording data by role
- `DEFAULT_ANALYTICS_DATA` - Analytics metrics by role  
- `DEFAULT_TRAINING_DATA` - Training categories by role
- `RECORDING_TYPES` - Recording type constants
- `ANALYTICS_METRIC_TYPES` - Analytics icon types
- `TRAINING_CATEGORY_TYPES` - Training icon types

## Helper Functions

- `getRecordingDataByRole(role, location, office)` - Gets recording data with location/office customization
- `getAnalyticsDataByRole(role, location, office)` - Gets analytics data with location/office customization  
- `getTrainingDataByRole(role, location, office)` - Gets training data (no customization currently)

## Adding New Features

### New Recording Type
1. Add to `RECORDING_TYPES` in config
2. Add icon case in `RecentRecordingItem.jsx`
3. Add to relevant role data

### New Analytics Metric
1. Add to `ANALYTICS_METRIC_TYPES` in config
2. Add icon case in `AnalyticsMetric.jsx`
3. Add to relevant role data

### New Training Category
1. Add to `TRAINING_CATEGORY_TYPES` in config
2. Add icon case in `TrainingCategory.jsx`
3. Add to relevant role data

This modular approach makes the recordings system much more maintainable and follows the same successful pattern established by the widgets module. 