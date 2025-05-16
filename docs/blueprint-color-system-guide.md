# Blueprint Theme Color System Guide

## Using Theme Colors in CSS

Our project uses a combination of Tailwind CSS theme colors and CSS variables to maintain a consistent design system. This guide explains how to properly reference these colors in your CSS and avoid common errors.

## Common Error

The following error occurs when using `theme()` functions with incorrectly structured color references:

```
Could not resolve value for theme function: `theme(colors.blueprint.DEFAULT)`. 
Consider checking if the path is correct or provide a fallback value to silence this error.
```

## Current Color System Structure

### CSS Variables

We define our colors as CSS variables in `src/index.css`:

```css
:root {
  /* Blueprint blue (accent color) */
  --blueprint: oklch(0.58 0.17 230);
  --color-blueprint: var(--blueprint);
  --blueprint-600: oklch(0.48 0.17 230); /* Darker shade for blueprint */
  --color-blueprint-600: var(--blueprint-600);
  
  /* Other blueprint-related colors */
  --blueprint-grid: oklch(0.68 0.12 230 / 0.6);
  --color-blueprint-grid: var(--blueprint-grid);
  --blueprint-annotation: oklch(0.92 0.03 220);
  --color-blueprint-annotation: var(--blueprint-annotation);
}
```

### Tailwind Configuration

These CSS variables are mapped in `tailwind.config.js`:

```javascript
colors: {
  // Other colors...
  
  // Workshop/Blueprint specific colors
  blueprint: {
    DEFAULT: "var(--color-blueprint)",
    600: "var(--color-blueprint-600)"
  },
  "blueprint-grid": "var(--color-blueprint-grid)",
  "blueprint-annotation": "var(--color-blueprint-annotation)",
}
```

## How to Use Colors in CSS

### Option 1: Using the Theme Function (Recommended)

If you need to access colors in CSS, use the theme function with the proper path:

```css
.element {
  background-color: theme('colors.blueprint.DEFAULT');
  border-color: theme('colors.blueprint.600');
}
```

**Important**: This only works for colors defined as objects with properties in Tailwind config.

### Option 2: Using CSS Variables Directly

For direct access or when theme functions cause errors:

```css
.element {
  background-color: var(--color-blueprint);
  border-color: var(--color-blueprint-600);
}
```

## Examples from Our Codebase

### ✅ Correct Usage in Animations

```css
@keyframes pulse-gradient {
  0% { background-color: var(--color-blueprint); }
  50% { background-color: var(--color-blueprint-600); }
  100% { background-color: var(--color-blueprint); }
}
```

### ❌ Incorrect Usage That Causes Errors

```css
@keyframes pulse-gradient {
  0% { background-color: theme('colors.blueprint.DEFAULT'); }
  50% { background-color: theme('colors.blueprint.600'); }
  100% { background-color: theme('colors.blueprint.DEFAULT'); }
}
```

This causes errors if `blueprint` isn't properly defined as an object with a `DEFAULT` property.

## Adding New Color Shades

When you need to add a new shade of an existing color:

1. Add the CSS variable in `src/index.css`:
   ```css
   --blueprint-800: oklch(0.38 0.17 230); /* Darker blueprint shade */
   --color-blueprint-800: var(--blueprint-800);
   ```

2. Update the color object in `tailwind.config.js`:
   ```javascript
   blueprint: {
     DEFAULT: "var(--color-blueprint)",
     600: "var(--color-blueprint-600)",
     800: "var(--color-blueprint-800)" // Add new shade
   },
   ```

## Troubleshooting

If you encounter the theme function error:

1. Check if the color is correctly defined as an object in `tailwind.config.js`
2. Ensure all referenced shade properties exist (e.g., `DEFAULT`, `600`, etc.)
3. Consider using CSS variables directly as a quick fix
4. Run `npm run dev` after changes to verify the error is resolved

## Best Practices

1. Define all multi-shade colors as objects with at least a `DEFAULT` property
2. Keep CSS variables and Tailwind config in sync
3. Use consistent naming conventions for all color shades
4. Comment your color values for better maintainability
