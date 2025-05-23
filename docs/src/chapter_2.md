# VEX Design System

<div style="background-color: #2a1b50; padding: 50px; text-align: center;">
  <svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M75 15L30 90H20L65 15H75Z" fill="#7e57c2"/>
    <path d="M20 35H40L50 15H30L20 35Z" fill="#7e57c2"/>
    <path d="M15 45H35L45 25H25L15 45Z" fill="#7e57c2"/>
    <path d="M10 55H30L40 35H20L10 55Z" fill="#7e57c2"/>
  </svg>
</div>

## Brand Identity

The VEX Ticket System uses a modern, clean design with a focus on usability and accessibility. The purple "V" logo represents speed and efficiency in ticket management.

### Color Palette

```css
--primary-color: #7e57c2;    /* Main purple */
--primary-light: #b085f5;    /* Light purple */
--primary-dark: #4d2c91;     /* Dark purple */
--secondary-color: #f5f5f5;  /* Light gray background */
--text-color: #333333;       /* Main text */
--text-light: #666666;       /* Secondary text */
--text-lighter: #999999;     /* Tertiary text */
--success-color: #4caf50;    /* Green for success states */
--warning-color: #ff9800;    /* Orange for warning states */
--danger-color: #f44336;     /* Red for error/danger states */
--info-color: #2196f3;       /* Blue for information states */
--border-color: #e0e0e0;     /* Light gray for borders */
--shadow-color: rgba(0, 0, 0, 0.1); /* Shadow color */
--white: #ffffff;            /* White */
--active-nav: #4a8dff;       /* Active navigation item */
```

### Typography

The application uses the Inter font family with system fonts as fallbacks. This provides excellent readability across different devices and screen sizes.

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
```

## UI Components

### Layout

The application uses a modern layout with a collapsible sidebar navigation and a main content area. The sidebar expands on hover to show menu labels, providing both space efficiency and usability.

- **Sidebar**: Fixed-width (60px collapsed, 200px expanded) with smooth transition
- **Logo**: Centered in the sidebar, using the VEX purple "V" logo
- **Navigation**: Icon-based with labels appearing on hover
- **Main Content**: Responsive width that adjusts based on sidebar state

### Buttons

Three primary button styles are implemented:

1. **Primary Button**: Purple background for main actions
   ```css
   .primary-button {
     background-color: var(--primary-color);
     color: var(--white);
     border-radius: var(--border-radius);
     padding: 10px 20px;
   }
   ```

2. **Delete Button**: Outlined in red for destructive actions
   ```css
   .delete-button {
     background-color: transparent;
     color: var(--danger-color);
     border: 1px solid var(--danger-color);
   }
   ```

3. **Filter/Pagination Buttons**: Subtle, light background for secondary actions
   ```css
   .pagination-btn {
     padding: 8px 12px;
     border: 1px solid var(--border-color);
     border-radius: 4px;
     background-color: var(--white);
   }
   ```

### Cards and Panels

Content is organized in card-like containers with subtle shadows and rounded corners:

```css
.ticket-card {
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 20px;
}
```

### Forms

Form elements are styled consistently with proper spacing and clear labels:

- Text inputs and selects have 10px/12px padding
- Labels are displayed with 500 font-weight
- Focus states use a subtle purple outline
- Form groups have consistent margin-bottom of 20px

### Status Indicators

Various visual indicators are used to convey status information:

- Colored dots (blue, green, orange, red) for different statuses
- Priority badges with colored backgrounds
- Active navigation items with blue background

## Responsive Design

The layout is designed to be responsive:

- Sidebar collapses to icons only on smaller screens
- Main content adjusts accordingly
- Form rows can stack on mobile
- Tables can scroll horizontally

## Accessibility Considerations

- Color contrast meets WCAG standards
- Interactive elements have hover/focus states
- SVG icons include appropriate sizing
- Form elements have proper labels

## Implementation

The design is implemented using:

- CSS variables for consistent theming
- SCSS for organization and maintainability
- React components for UI structure
- SVG for iconography and logo
