# Selectors Directory Structure

This directory contains all selector-related components organized for scalability and maintainability.

## Directory Structure

```
selectors/
├── components/          # Shared selector components
│   └── SelectorBase.jsx    # Base selector with consistent styling
├── types/              # Specific selector implementations
│   ├── RoleSelector.jsx
│   ├── LocationSelector.jsx
│   └── OfficeSelector.jsx
├── hooks/              # Shared selector logic
│   └── useSelector.js      # Common selector behavior
├── config/             # Selector configurations
│   └── selectorConfig.js   # Data, icons, and utility functions
├── index.js           # Main exports file
└── README.md          # This file
```

## Usage

### Basic Import
```javascript
import { 
  RoleSelector, 
  LocationSelector, 
  OfficeSelector,
  useSelector 
} from './selectors/index.js';
```

### Selector Components (All Logic Preserved)

#### 1. **RoleSelector**
- ✅ Role hierarchy and permissions intact
- ✅ User role transformation logic preserved
- ✅ Available roles filtering based on user level
- ✅ VP, Regional, District, Office, Closer, Setter roles
- ✅ All role-specific data and descriptions

```javascript
<RoleSelector 
  userRole={userProfile?.role} 
  onRoleChange={setSelectedRole} 
/>
```

#### 2. **LocationSelector**
- ✅ Location filtering based on selected role
- ✅ Territory assignments for Closers and Setters
- ✅ Office-specific location handling
- ✅ District and Regional location logic
- ✅ All location data and descriptions

```javascript
<LocationSelector 
  selectedRole={selectedRole}
  userRole={userProfile?.role}
  onLocationChange={setSelectedLocation} 
/>
```

#### 3. **OfficeSelector**
- ✅ Office filtering based on selected state/region
- ✅ South Carolina and Virginia office data
- ✅ All office options and descriptions
- ✅ Conditional rendering logic

```javascript
<OfficeSelector 
  selectedState={selectedLocation}
  onOfficeChange={setSelectedOffice} 
/>
```

## Shared Components

### SelectorBase
Provides consistent selector functionality:
- Unified styling and animations
- Dropdown behavior
- Option rendering
- Icon and description support
- Customizable width, font size, and styling

### useSelector Hook
Shared selector logic:
- Open/close state management
- Click outside detection
- ESC key handling
- Selection change handling
- Auto-select first option logic

## Configuration System

### Centralized Data Management
All selector data is centralized in `selectorConfig.js`:

- **ROLES**: Role definitions with hierarchy levels
- **LOCATIONS**: Location data organized by role type
- **OFFICES**: Office data organized by state/region
- **ICONS**: Consistent icon set for all selectors

### Utility Functions
- `transformRole()`: Converts raw role strings to display format
- `getAvailableRoles()`: Returns roles based on user permissions
- `getAvailableLocations()`: Returns locations based on selected role
- `getAvailableOffices()`: Returns offices based on selected state
- `getUserOffice()`: Determines user's default office

## Key Benefits

### ✅ **All Original Logic Preserved**
- Role hierarchy and permissions unchanged
- Location filtering logic intact
- Office assignment logic preserved
- User role transformations maintained
- All business rules preserved

### ✅ **Enhanced Architecture**
- Shared components reduce code duplication
- Centralized configuration for easy maintenance
- Consistent behavior across all selectors
- Scalable for adding new selector types

### ✅ **Maintained Functionality**
- All role-based filtering works exactly as before
- Location and office dependencies preserved
- User permissions and access levels intact
- All existing features work identically

### ✅ **Improved Developer Experience**
- Consistent API across all selectors
- Shared styling and animations
- Easy to customize and extend
- Better code organization and readability

## Data Flow

1. **User Role** → Determines available roles in RoleSelector
2. **Selected Role** → Determines available locations in LocationSelector  
3. **Selected Location** → Determines available offices in OfficeSelector
4. **All Selections** → Passed to OverviewHeader for role-specific data display

## Integration with GlobalNavbar

The GlobalNavbar imports all selectors from the centralized location:
```javascript
import { 
  RoleSelector,
  LocationSelector,
  OfficeSelector
} from './selectors/index.js';
```

All props, role logic, and data flow remain unchanged - just with better organization and shared components! 