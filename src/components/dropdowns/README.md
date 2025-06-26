# Dropdowns Directory Structure

This directory contains all dropdown-related components organized for scalability and maintainability.

## Directory Structure

```
dropdowns/
├── components/          # Shared dropdown components
│   ├── DropdownBase.jsx    # Base dropdown container with animations
│   └── DropdownItem.jsx    # Reusable dropdown menu items
├── types/              # Specific dropdown implementations
│   ├── NotificationsDropdown.jsx
│   ├── ProfileDropdown.jsx
│   ├── FeedbackDropdown.jsx
│   ├── AIAssistantDropdown.jsx
│   ├── HelpDropdown.jsx
│   └── CalendarDropdown.jsx
├── hooks/              # Shared dropdown logic
│   └── useDropdown.js      # Common dropdown behavior
├── config/             # Dropdown configurations
│   └── dropdownConfig.js   # Dropdown settings and types
├── index.js           # Main exports file
└── README.md          # This file
```

## Usage

### Basic Import
```javascript
import { 
  ProfileDropdown, 
  NotificationsDropdown,
  useDropdown 
} from './dropdowns/index.js';
```

### Existing Dropdowns (All Logic Preserved)

#### 1. **ProfileDropdown**
- ✅ User authentication logic intact
- ✅ Supabase profile fetching
- ✅ Theme switching functionality
- ✅ Logout handling
- ✅ User initials and display name logic

#### 2. **NotificationsDropdown**
- ✅ Notification state management
- ✅ Mark as read functionality
- ✅ Unread count badge
- ✅ Notification icons and styling

#### 3. **AIAssistantDropdown**
- ✅ Chat functionality
- ✅ Quick actions
- ✅ Message history
- ✅ Typing indicators

#### 4. **FeedbackDropdown**
- ✅ Feedback form logic
- ✅ Rating system
- ✅ Submission handling

#### 5. **HelpDropdown**
- ✅ Help documentation
- ✅ Search functionality
- ✅ Category navigation

#### 6. **CalendarDropdown**
- ✅ Calendar integration
- ✅ Event management
- ✅ Date selection

## Shared Components

### DropdownBase
Provides common dropdown functionality:
- Click outside to close
- Escape key to close
- Consistent animations
- Positioning options

### DropdownItem
Reusable menu item component:
- Consistent styling
- Icon support
- Hover effects
- Variant support (default, danger, success)

### useDropdown Hook
Shared dropdown logic:
- Open/close state management
- Click outside detection
- Escape key handling

## Key Benefits

### ✅ **All Original Logic Preserved**
- Authentication flows unchanged
- Role-based functionality intact
- Data fetching logic preserved
- User interactions maintained

### ✅ **Enhanced Architecture**
- Shared logic extracted to reusable components
- Consistent behavior across all dropdowns
- Easy to add new dropdown types
- Better code organization

### ✅ **Maintained Functionality**
- Profile management and logout
- Notification handling
- AI assistant interactions
- Theme switching
- All existing features work exactly as before

## Integration with GlobalNavbar

The GlobalNavbar imports all dropdowns from the centralized location:
```javascript
import { 
  ProfileDropdown,
  NotificationsDropdown,
  // ... other dropdowns
} from './dropdowns/index.js';
```

All props, authentication, and role-based logic flow through unchanged. 