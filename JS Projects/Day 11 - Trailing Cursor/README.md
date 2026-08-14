# Trailing Cursor - Easing & Animation Project

## Project Overview

This project demonstrates a **custom cursor system that replaces the default browser cursor** with two animated elements: a fast-moving inner dot and a smooth trailing circle. As the mouse moves, the dot tracks precisely while the circle follows with easing, creating an elegant trailing effect. The dot expands on click for visual feedback. This project showcases DOM manipulation, mouse event handling, requestAnimationFrame for smooth animations, and easing functions.

---

## Learning Objectives

### What We Learned

#### 1. **DOM Element Creation & Manipulation**

- Creating elements dynamically: `document.createElement()`
- Adding classes: `.classList.add()`
- Appending to document: `.appendChild()`
- Creating reusable, scriptable DOM elements
- Building UI components entirely in JavaScript
- No HTML markup required for these elements

#### 2. **Fixed Positioning & Centering**

- Using `position: fixed` to follow viewport, not scroll
- Using `transform: translate(-50%, -50%)` to center elements on coordinates
- Understanding positioning relative to coordinate point (not top-left corner)
- `pointer-events: none` to prevent interfering with page interactions
- `z-index: 9999` to ensure visibility above all content

#### 3. **Mouse Event Handling**

- `mousemove` event: fires as mouse moves across page
- Accessing mouse coordinates: `e.clientX` and `e.clientY`
- `mousedown` event: fires when mouse button pressed
- `mouseup` event: fires when mouse button released
- Event-driven cursor customization
- Continuous position tracking

#### 4. **State Variables for Animation**

- Tracking target position: `targetX` and `targetY` (where mouse is)
- Tracking current position: `currentCircleX` and `currentCircleY` (where circle is)
- Easing factor: constant controlling animation smoothness
- Separate tracking for dot (instant) vs circle (eased)
- State management across animation frames

#### 5. **requestAnimationFrame for Smooth Animation**

- Using `requestAnimationFrame(callback)` for animation loop
- Browser synchronizes with monitor refresh rate (60fps)
- More efficient than `setInterval()` or `setTimeout()`
- GPU acceleration available for smooth performance
- Automatic pause when tab is not visible
- Cleaner, more professional animations

#### 6. **Linear Easing & Smooth Following**

- Easing calculation: \( \text{new position} = \text{current} + (\text{target} - \text{current}) \times \text{easing} \)
- Easing factor of 0.15 = 15% of remaining distance per frame
- Small easing factor = slower, smoother following
- Large easing factor = faster, less noticeable lag
- Creates trailing, bouncy effect without springs

#### 7. **Transform-Based Positioning**

- Using `transform: translate()` instead of `left`/`top` properties
- GPU-accelerated transform operations
- Smooth, performant positioning updates
- `transform: translate(-50%, -50%) scale()` combines positioning and scaling
- Better performance than layout-triggering properties

#### 8. **Dynamic Class Manipulation for Feedback**

- Adding classes conditionally: `classList.add()` on mousedown
- Removing classes conditionally: `classList.remove()` on mouseup
- CSS animations triggered by class changes
- Visual feedback without inline styles
- Clean separation of logic and styling

#### 9. **Cursor Replacement & Hiding**

- Setting `cursor: none` on body to hide default cursor
- Custom cursor elements fill the void
- Creating more visually interesting cursor alternatives
- Enhanced user experience with custom interactions
- Full control over cursor appearance

#### 10. **CSS Transitions on Dynamic Elements**

- `transition: transform 0.2s ease-out` on styled elements
- Smooth scaling animations triggered by class changes
- Easing functions for natural motion: `ease-out`
- Transitions applied to dynamically created elements
- Coordination between JavaScript and CSS animations

#### 11. **Z-Index Layering**

- Setting very high `z-index` (9999) for cursor elements
- Ensuring cursor always visible above all content
- Understanding stacking context
- Fixed positioning doesn't guarantee top-most layer
- Z-index required for visual priority

#### 12. **Coordinate Math for Animation**

- Calculating distance: \( \text{distance} = \text{target} - \text{current} \)
- Applying easing factor: \( \text{delta} = \text{distance} \times \text{easing} \)
- Incrementally moving: \( \text{new position} = \text{current} + \text{delta} \)
- Distance never reaches zero (exponential decay)
- Results in infinite approach but practical convergence

#### 13. **pointer-events Property**

- Using `pointer-events: none` to make elements non-interactive
- Allows clicking through cursor elements to page content
- Critical for custom cursors to not interfere with page
- Preserves normal click/hover functionality
- Essential for overlay elements

#### 14. **Viewport Coordinates vs Document Coordinates**

- `clientX`/`clientY` = position in viewport (not affected by scroll)
- Fixed positioning uses viewport coordinates
- Correct pairing of event coordinates with fixed positioning
- Understanding coordinate systems in web development

---

## Key Concepts Breakdown

### Cursor System Architecture

```
Mouse moves on page
         ↓
mousemove event fires
         ↓
Update targetX, targetY from event
         ↓
Set dot position immediately to target
         ↓
Animation frame called (60fps)
         ↓
Calculate distance: target - current
         ↓
Apply easing: distance * 0.15
         ↓
Update circle position: current + (distance * easing)
         ↓
Repeat animation frame
```

### Easing Function Calculation

The easing formula creates smooth following motion:

\[ \text{position}\_{t+1} = \text{position}\_t + (\text{target} - \text{position}\_t) \times \text{easing} \]

With easing = 0.15:

- Frame 1: Move 15% of remaining distance
- Frame 2: Move 15% of NEW remaining distance
- Frame 3: Move 15% of even newer remaining distance
- Never reaches target but comes very close

This creates exponential decay toward target position.

### Click Feedback System

**Mouse pressed:**

```
mousedown event → add "cursor-click" class → CSS scales dot 3x larger
```

**Mouse released:**

```
mouseup event → remove "cursor-click" class → CSS scales dot back to normal
```

**CSS rule:**

```css
.cursor-click.cursor-dot {
  transform: translate(-50%, -50%) scale(3);
}
```

### Two-Cursor Model

| Cursor     | Behavior         | Purpose                          |
| ---------- | ---------------- | -------------------------------- |
| **Dot**    | Instant tracking | Responsive, precise cursor point |
| **Circle** | Eased tracking   | Visual trail, elegant follow     |

Dot follows exactly where mouse is (fast feedback).
Circle follows slowly behind (creates trail effect).

### Animation Loop Structure

```javascript
function animate() {
  // Calculate eased position
  let dx = targetX - currentCircleX;
  let dy = targetY - currentCircleY;
  currentCircleX += dx * easing;
  currentCircleY += dy * easing;

  // Apply to DOM
  circle.style.left = `${currentCircleX}px`;
  circle.style.top = `${currentCircleY}px`;

  // Schedule next frame
  requestAnimationFrame(animate);
}
```

This loop runs ~60 times per second.

---

## Technical Implementation

### HTML Structure

- Minimal HTML (just a `<h1>` for demo content)
- All cursor elements created via JavaScript
- No cursor markup in HTML markup

### CSS Features

- `cursor: none` to hide default cursor
- `.cursor-dot` styling: small filled circle
- `.cursor-circle` styling: larger hollow circle
- Fixed positioning with transform centering
- Transitions for click feedback
- High z-index to stay visible

### JavaScript Implementation

- DOM element creation with `createElement()`
- State variables for positions and easing
- `mousemove` listener for position tracking
- `requestAnimationFrame` for smooth animation loop
- Easing calculation for trailing effect
- `mousedown`/`mouseup` listeners for click feedback
- Class manipulation for visual states

---

## Skills Demonstrated

- **DOM Manipulation**: Dynamic element creation, class management, appendChild
- **Mouse Events**: mousemove, mousedown, mouseup coordination
- **Animation**: requestAnimationFrame, easing functions, smooth motion
- **Mathematical Concepts**: Easing calculations, exponential decay, coordinate math
- **CSS Techniques**: Fixed positioning, transforms, transitions, z-index
- **State Management**: Tracking multiple position states, coordinate systems
- **Performance**: GPU-accelerated transforms, efficient animation loop
- **User Experience**: Custom interactions, responsive feedback

---

## Files Included

| File         | Purpose                                          |
| ------------ | ------------------------------------------------ |
| `index.html` | Minimal HTML with heading content                |
| `style.css`  | Cursor element styling, transitions, positioning |
| `script.js`  | Cursor creation, mouse tracking, animation loop  |

---

## Summary

This custom animated cursor project successfully demonstrates **sophisticated animation techniques combined with precise event handling** to create a professional, engaging user interface enhancement. By implementing smooth easing functions, coordinate-based positioning, and responsive click feedback, the project showcases advanced JavaScript animation patterns. The separation between the fast-responding dot and the smoothly-trailing circle creates a visual effect that feels polished and intentional.
