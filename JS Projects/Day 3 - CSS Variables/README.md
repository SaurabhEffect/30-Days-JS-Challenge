# CSS Variables Project

## Project Overview

This project demonstrates **real-time image manipulation** using CSS custom properties (variables) and JavaScript event listeners. Users can adjust image styling parameters through interactive input controls, showcasing the power of combining CSS variables with dynamic JavaScript updates for instant visual feedback.

---

## Learning Objectives

### What We Learned

#### 1. **CSS Custom Properties (CSS Variables)**

- Defining custom properties using the `:root` pseudo-class selector
- Using double hyphen syntax: `--variable-name`
- Accessing CSS variables with `var(--variable-name)` function
- Storing reusable values for colors, spacing, blur, rotation, and opacity
- Creating a centralized system for managing dynamic styles

#### 2. **CSS Filters & Transformations**

- Using `filter: blur()` to apply blur effects with pixel values
- Using `filter: opacity()` to control image transparency
- Applying `transform: rotate()` for rotational transformations
- Combining multiple CSS filters and transforms in one element
- Understanding how filters affect visual rendering

#### 3. **DOM Element Selection & Iteration**

- Using `document.querySelectorAll()` to select multiple elements
- Storing NodeList results for reuse
- Iterating through NodeList collections with `.forEach()` method
- Targeting input elements within a specific container (`.controls input`)

#### 4. **JavaScript Event Handling**

- Understanding `change` events triggered when input values are modified
- Understanding `mousemove` events for real-time tracking while dragging
- Attaching multiple event listeners to the same element
- Using `addEventListener()` for event binding
- Leveraging event context with `this` keyword

#### 5. **Data Attributes for Configuration**

- Using HTML data attributes (`data-sizing`) to store metadata
- Accessing data attributes via `this.dataset` in JavaScript
- Conditionally applying suffixes based on data attribute values
- Using logical OR (`||`) for default fallback values

#### 6. **JavaScript Template Literals & String Interpolation**

- Using backticks for template literal syntax
- Embedding variables within template strings using `${expression}`
- Dynamically constructing CSS variable names
- Creating flexible, reusable code patterns

#### 7. **Dynamic CSS Property Updates**

- Using `document.documentElement.style.setProperty()` to update CSS variables
- Understanding the two-parameter format: property name and value
- Updating multiple CSS variables with different suffixes
- Real-time DOM style manipulation without page refresh

---

## Key Concepts Breakdown

### CSS Variables System

The project uses five CSS custom properties:

| Variable    | Default | Purpose                                          |
| ----------- | ------- | ------------------------------------------------ |
| `--base`    | #ffc600 | Primary color for image border, background, glow |
| `--spacing` | 10px    | Image padding value                              |
| `--blur`    | 10px    | Blur filter intensity                            |
| `--rotate`  | 0deg    | Image rotation angle                             |
| `--opacity` | 1       | Image transparency (0-1 scale)                   |

### Event-Driven Updates

The project demonstrates two triggering events:

**Change Event:** Fires when input value is released after dragging

**Mousemove Event:** Fires continuously while dragging, providing real-time feedback

### The HandleUpdate Function Flow

1. Function executes when either `change` or `mousemove` event occurs
2. `this.dataset.sizing` retrieves the HTML5 data attribute
3. Logical OR (`||`) provides empty string as default if no data attribute exists
4. Input value is concatenated with suffix (e.g., "10" + "px" = "10px")
5. `setProperty()` updates the corresponding CSS variable on the document root
6. CSS automatically recalculates and re-renders the image with new styles

### CSS Filter Application

```css
filter: blur(var(--blur)) opacity(var(--opacity));
```

Multiple filters are applied in sequence, with variables allowing dynamic control.

---

## Technical Implementation

### HTML Structure

- Semantic markup with input controls for each parameter
- Data attributes to specify unit suffixes (px, deg)
- Image element to display the manipulated visual
- Text elements highlighting key values with `.hl` class

### CSS Features

- CSS Grid or Flexbox layout for control panel organization
- Root-level variable declarations using `:root` selector
- Chained filters combining blur and opacity effects
- Box-shadow effect tied to the `--base` color variable
- Color highlighting applied dynamically through `--base` variable
- Responsive styling with white text on dark background

### JavaScript Implementation

- Modern ES6 syntax with arrow functions and template literals
- Efficient event delegation with forEach iteration
- Two separate forEach loops for different events
- Direct access to input properties: `this.name` and `this.value`
- Clean, maintainable code structure

---

## Skills Demonstrated

- **Advanced CSS**: Custom properties, filters, transforms, multiple filter chaining
- **DOM Manipulation**: Element selection, dynamic style updates, property modification
- **JavaScript ES6+**: Template literals, arrow functions, data attributes
- **Event Handling**: Multiple event types, real-time updates, context binding
- **Interactive UI**: Real-time feedback, responsive controls, dynamic styling
- **Code Organization**: Modular function structure, reusable patterns
- **Problem Solving**: Connecting user input to visual output through CSS variables

---

## Files Included

| File         | Purpose                                                      |
| ------------ | ------------------------------------------------------------ |
| `index.html` | HTML structure with input controls and image element         |
| `style.css`  | CSS variables, filters, layout, and styling                  |
| `script.js`  | JavaScript logic for event handling and CSS variable updates |

---

## How It Works

1. Page loads with CSS variables defined at `:root` level
2. JavaScript selects all input elements within `.controls` container
3. Two event listeners are attached to each input: `change` and `mousemove`
4. When user interacts with an input (changes value or drags):
   - `handleUpdate()` function executes
   - Retrieves the data attribute suffix from the input element
   - Gets the input's current value
   - Constructs CSS variable name using input name: `--${this.name}`
   - Calls `setProperty()` to update the root CSS variable
5. CSS automatically recalculates the image styling based on new variable values
6. Image updates instantly with new blur, rotation, opacity, spacing, or base color

---

## Real-Time Interactivity

This project showcases the principle of **reactive programming**:

- **User Action** → Input change/mousemove event
- **Data Processing** → Extract value and suffix
- **State Update** → Modify CSS variable
- **Automatic Render** → CSS applies changes instantly
- **Visual Feedback** → User sees immediate results

This immediate feedback loop creates a responsive, interactive experience without page reloads or server communication.

---

## Key Advantages of This Approach

1. **Performance**: CSS variables update faster than DOM element manipulation
2. **Maintainability**: Centralized variable definitions at `:root` level
3. **Scalability**: Easy to add new controls by adding new variables and inputs
4. **Flexibility**: Same JavaScript code works with any data attribute suffix
5. **Elegance**: Minimal JavaScript code for powerful visual effects

---

## Summary

This image manipulation tool successfully demonstrates the synergy between **CSS custom properties and JavaScript interactivity**. By leveraging CSS variables, the project achieves a clean separation between styling logic and JavaScript behavior, resulting in maintainable, scalable code. The real-time feedback loop showcases modern web development best practices in creating responsive, interactive user interfaces that provide immediate visual feedback for user actions.
