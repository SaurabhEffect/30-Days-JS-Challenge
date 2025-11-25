# Flex Panel Gallery

## Project Overview

This project showcases an **interactive expanding panels interface** built with Flexbox, CSS animations, and JavaScript event handling. When users click on a panel, it smoothly expands to occupy more space while other panels shrink, accompanied by text animations that create a dynamic, engaging user experience. This project demonstrates advanced CSS transitions, Flexbox responsiveness, and event-driven DOM manipulation.

---

## Learning Objectives

### What We Learned

#### 1. **Flexbox Layout & Flex Properties**

- Understanding the `display: flex` property for creating flexible layouts
- Using `flex: 1` to create equal-width panels
- Dynamic flex value changes: `flex: 5` to expand clicked panels
- Flex shorthand vs individual properties (flex-grow, flex-shrink, flex-basis)
- Creating responsive, fluid layouts that adapt to container size
- Using `flex-direction: column` for nested flex containers
- Full viewport height management with `min-height: 100vh` and `overflow: hidden`

#### 2. **CSS Transitions & Easing Functions**

- Multi-property transitions: `transition: font-size, flex, background, transform, box-shadow`
- Understanding cubic-bezier easing functions: `cubic-bezier(0.61, -0.19, 0.7, -0.11)`
- Bezier curves beyond linear transitions for smooth, natural animations
- Individual timing for each property (0.7s, 0.5s, 0.2s)
- Transition delays for orchestrating sequential animations: `transition-delay: 0s, 1s`
- Controlling animation timing on enter and exit states

#### 3. **Transform Animations & Positioning**

- Using `transform: translateY(-100%)` to move elements vertically
- Using `transform: scale()` to resize elements proportionally
- Using `transform: scale(1.02)` for subtle magnification effects
- Combining transforms with opacity for reveal animations
- Stacking transforms: `scale(0.5)` then animating to `scale(1)`
- Understanding `transform-origin` for controlling transformation reference points

#### 4. **CSS Class Toggling & State Management**

- Using `.toggle()` method to add/remove classes dynamically
- Managing two-state classes: `.open` and `.open-active`
- Understanding why two separate states are needed (immediate vs transition-end)
- Sequential state transitions for synchronized animations
- Applying different styles based on class presence

#### 5. **Event Handling & Event Properties**

- Using `click` events to trigger panel expansion
- Using `transitionend` events to detect animation completion
- Accessing event properties: `e.propertyName` to identify which CSS property transitioned
- Conditional logic with `.includes()` to detect "flex" property changes
- Understanding event firing order and timing
- Coordinating multiple event listeners for complex animations

#### 6. **Text Animation & Typography Effects**

- Using `transform: translateY()` with text elements
- Animating `opacity` for fade-in/fade-out effects
- Combining scale and opacity for reveal animations
- Text-shadow for depth and readability
- Font size scaling on expansion: `font-size: 20px` → `font-size: 40px`
- Font family integration: cursive fonts for decorative text

#### 7. **Pseudo-Selectors & Complex CSS Selectors**

- Using `:first-child` and `:last-child` to target specific children
- Using `:nth-child(2)` to select specific elements by position
- Parent-child relationships: `.panel.open > *:first-child`
- Combining multiple selectors for precise element targeting
- Understanding CSS specificity and selector precedence

#### 8. **Responsive Design & Media Queries**

- Using `@media only screen and (max-width: 600px)` for mobile optimization
- Adjusting font sizes for smaller screens
- Maintaining functionality across different viewport sizes
- Mobile-first or desktop-first considerations

---

## Key Concepts Breakdown

### Two-State Animation System

The project uses two classes working together for smooth animations:

**`.open` Class:**

- Applied immediately on click via `toggleOpen()`
- Expands the panel: `flex: 5` (expands 5x)
- Increases font size: `font-size: 40px`
- Adds shadow: `box-shadow: 0 0 25px rgba(0, 0, 0, 0.4)`
- Slight magnification: `scale(1.02)`

**`.open-active` Class:**

- Applied after flex transition completes via `toggleActive()`
- Triggered by detecting `transitionend` event on "flex" property
- Animates text elements: reveals first and last child text
- Fades in middle text: scales from 0.5 to 1, opacity 0 to 1

### Animation Timing Sequence

The project creates a layered animation sequence:

| Step        | Timing               | Animation                         |
| ----------- | -------------------- | --------------------------------- |
| 0ms         | Click                | Add `.open` class                 |
| 0-700ms     | 0.7s                 | Panel expands (flex) + font grows |
| 700ms       | transitionend        | Detect "flex" change              |
| 700ms       | Click                | Add `.open-active` class          |
| 700-1200ms  | 0.5s                 | First child text animates up      |
| 700-1200ms  | 0.5s delay then 0.5s | Middle text scales and fades in   |
| 1200-1700ms | 0.5s delay 1s        | Last child text animates up       |

### Content Structure

Each panel contains three text elements:

1. **First child** - Top text (animates from top, `-100%`)
2. **Middle child** - Main title (scales and fades)
3. **Last child** - Bottom text (animates from bottom, `100%`)

### Event Flow

```
User clicks panel
    ↓
click event fires
    ↓
toggleOpen() adds/removes .open class
    ↓
Flex property transitions for 0.7s
    ↓
transitionend event fires when flex completes
    ↓
toggleActive() checks propertyName for "flex"
    ↓
.open-active class added
    ↓
Text animations begin (0.5s delays synchronized)
```

---

## Technical Implementation

### HTML Structure

- Container with `.panels` class for main flex wrapper
- Five `.panel` elements with unique classes (`.panel1` through `.panel5`)
- Each panel contains multiple `<p>` elements for text content
- Background images set via CSS class selectors

### CSS Features

- Universal flex container setup for full-page layout
- Complex CSS transitions with multiple properties and delays
- Cubic-bezier easing for natural motion
- Transform-based animations for performance
- Responsive media queries for mobile devices
- Pseudo-element and pseudo-class selectors for fine-grained control
- Box-shadow effects for visual depth

### JavaScript Implementation

- DOM selection with `querySelectorAll()` for all panels
- Two event listeners per panel: `click` and `transitionend`
- Class toggle methods for state management
- Event object inspection (`e.propertyName`) for conditional logic
- Console logging for debugging (visible in browser dev tools)

---

## Skills Demonstrated

- **Advanced Flexbox**: Dynamic flex properties, responsive layouts, flex-based animations
- **CSS Animations**: Transitions, transforms, easing functions, animation sequencing
- **Event Handling**: Multiple event types, event object properties, conditional listeners
- **State Management**: Class-based state, coordinated class toggling, multi-step animations
- **Responsive Design**: Media queries, mobile optimization, flexible sizing
- **DOM Manipulation**: querySelector, classList methods, dynamic styling
- **Performance Optimization**: Transform-based animations, efficient transitions
- **Interactive UI**: Real-time feedback, smooth visual transitions, engaging UX

---

## Files Included

| File         | Purpose                                                                       |
| ------------ | ----------------------------------------------------------------------------- |
| `index.html` | HTML structure with five panel elements and text content                      |
| `style.css`  | Flexbox layout, transitions, animations, background images, responsive design |
| `script.js`  | Event listeners, class toggling, animation coordination                       |

---

## Responsive Behavior

On mobile devices (max-width: 600px):

- Font sizes reduce to `1em` for readability
- Layout adapts to smaller screens
- Panels still expand but with smaller text
- Touch-friendly clickable areas

---

## Future Enhancement Ideas

- Add keyboard navigation (arrow keys to switch panels)
- Implement swipe gestures for mobile navigation
- Add panel indicators or dots showing current panel
- Include more detailed content that reveals on expansion
- Add color themes or dark mode toggle
- Implement automatic rotation through panels
- Add sound effects on panel expansion
- Create smooth transitions between panels (carousel-style)
- Add scroll indicators showing more content available
- Implement favorites or bookmark functionality

---

## Summary

This expanding panels project masterfully demonstrates **advanced CSS animations combined with event-driven JavaScript** to create a sophisticated, interactive user interface.
