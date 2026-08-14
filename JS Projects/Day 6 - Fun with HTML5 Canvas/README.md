# Drawing Canvas App - HTML5 Canvas Project

## Project Overview

This project demonstrates a **full-featured drawing application** built with HTML5 Canvas API and vanilla JavaScript. Users can draw freehand on a full-screen canvas with a dynamic rainbow color brush that continuously shifts hue, adjustable brush sizes, a clear functionality, and a decorative "HEY" animation on load. This project showcases canvas manipulation, mouse event handling, HSL color cycling, and advanced path drawing techniques.

---

## Learning Objectives

### What We Learned

#### 1. **HTML5 Canvas API Fundamentals**

- Selecting canvas elements using `document.querySelector()`
- Getting the 2D drawing context: `canvas.getContext("2d")`
- Setting canvas dimensions: `canvas.width` and `canvas.height`
- Understanding the canvas coordinate system (0,0 at top-left)
- Full viewport sizing: matching window dimensions for full-screen drawing

#### 2. **Canvas Path Drawing & Strokes**

- Using `ctx.beginPath()` to start a new drawing path
- Using `ctx.moveTo(x, y)` to position the starting point
- Using `ctx.lineTo(x, y)` to draw straight lines
- Using `ctx.stroke()` to render the path
- Understanding the difference between path creation and rendering

#### 3. **Canvas Line Styling Properties**

- Setting line color: `ctx.strokeStyle` (hex, RGB, HSL values)
- Setting line width: `ctx.lineWidth` (numeric values in pixels)
- Setting line join style: `ctx.lineJoin = "round"` for smooth corners
- Setting line cap style: `ctx.lineCap = "round"` for rounded endpoints
- These properties affect all subsequent drawing operations

#### 4. **Advanced Canvas Path Methods**

- Using `ctx.quadraticCurveTo(cpx, cpy, x, y)` for curved lines
  - Control point (cpx, cpy) determines curve shape
  - End point (x, y) is the destination
- Using `ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise)` for circular arcs
  - Radius in pixels
  - Angles in radians (0 = right, Math.PI/2 = bottom, Math.PI = left, etc.)
  - `counterclockwise` parameter as boolean
- Combining multiple path methods to create complex shapes

#### 5. **Mouse Event Handling for Drawing**

- `mousedown` event to begin drawing (set `isDrawing = true`)
- `mousemove` event to draw continuously while mouse moves
- `mouseup` event to stop drawing when mouse button releases
- `mouseout` event to stop drawing when mouse leaves canvas
- Accessing mouse coordinates: `e.offsetX` and `e.offsetY` (relative to canvas)
- Using `isDrawing` flag to track drawing state

#### 6. **Dynamic Color Generation with HSL**

- Understanding HSL color model: Hue (0-360°), Saturation (%), Lightness (%)
- Using template literals to create HSL color strings: `` `hsl(${hue}, 100%, 50%)` ``
- Cycling hue value from 0-360 to create rainbow effect
- Resetting hue to 0 after reaching 360 degrees
- Incrementing hue on each draw call for smooth color transitions
- Fixed saturation (100%) and lightness (50%) for vibrant colors

#### 7. **State Management & Variable Tracking**

- Using `isDrawing` boolean to track active drawing state
- Using `lastX` and `lastY` to store previous mouse coordinates
- Using `hue` variable to track current color position in rainbow
- Updating coordinates on each mouse movement
- Array destructuring for updating multiple variables: `[lastX, lastY] = [e.offsetX, e.offsetY]`

#### 8. **Canvas Clearing & Reset Operations**

- Using `ctx.clearRect(x, y, width, height)` to clear portions of canvas
- Clearing entire canvas: `clearRect(0, 0, canvas.width, canvas.height)`
- Resetting canvas state for fresh drawing
- Button event listeners for user-triggered clearing

#### 9. **Keyboard Event Handling**

- Using `keydown` event to detect keyboard presses
- Accessing pressed key: `e.key` (e.g., `" "` for spacebar)
- `preventDefault()` to stop default key behavior
- Random color generation: `Math.floor(Math.random() * 360)` for random hue
- Spacebar to randomize current color for variety

#### 10. **Range Input Controls & Dynamic Brush Size**

- HTML5 range inputs: `<input type="range">` element
- Accessing current value: `e.target.value`
- Updating canvas properties from input value
- Real-time feedback: brush size changes immediately
- Visual feedback through dynamic line width

#### 11. **Programmatic Drawing & Shape Creation**

- Drawing predefined shapes without user input
- Creating multi-part compositions with relative positioning
- Using multiple curve and arc calls to build complex letters/shapes
- Calculating positions based on canvas dimensions for centering
- Creating reusable drawing functions

#### 12. **Canvas Rendering Performance**

- Understanding that each `stroke()` call renders immediately
- Path optimization: combine related paths before stroking
- Efficient state management to reduce unnecessary redraws
- Canvas as immediate-mode graphics (no DOM overhead)

---

## Key Concepts Breakdown

### Drawing Pipeline

The drawing process follows this sequence:

1. **User presses mouse button** → `mousedown` event fires
2. **Store starting coordinates** → `lastX, lastY = offsetX, offsetY`
3. **Set `isDrawing = true`** → Enable drawing mode
4. **User moves mouse** → `mousemove` event fires for each pixel
5. **Check `isDrawing` flag** → Skip if false, continue if true
6. **Set stroke color** → Create HSL string with current hue
7. **Begin path** → `ctx.beginPath()`
8. **Move to previous position** → `ctx.moveTo(lastX, lastY)`
9. **Draw line to current position** → `ctx.lineTo(offsetX, offsetY)`
10. **Render path** → `ctx.stroke()`
11. **Update coordinates** → `lastX, lastY = offsetX, offsetY`
12. **Increment hue** → `hue++` for next color
13. **Repeat until mouse release** → `mouseup` event sets `isDrawing = false`

### HSL Color Cycling System

The application uses a continuous hue rotation for rainbow effects:

```
Initial hue: 220 (blue)
As user draws: hue increments (220, 221, 222, ..., 359, 0, 1, ...)
Colors cycle through full spectrum (red, orange, yellow, green, cyan, blue, magenta, red...)
Saturation fixed at 100% (fully saturated)
Lightness fixed at 50% (optimal brightness)
```

### Default "HEY" Drawing

The `drawDefaultHey()` function creates decorative text:

- **H**: Multiple quadratic curves for curved letter shape
- **E**: Arc and quadratic curves for letter form
- **Y**: Two curved strokes forming Y shape
- Colors: Orange (H), Yellow-green (E), Blue (Y) using specific HSL values
- Centered on canvas using relative positioning
- Designed to welcome users and demonstrate drawing capabilities

### Coordinate System

Canvas uses a pixel-based coordinate system:

- **(0, 0)** = Top-left corner
- **(canvas.width, 0)** = Top-right corner
- **(0, canvas.height)** = Bottom-left corner
- **(canvas.width, canvas.height)** = Bottom-right corner

Mouse coordinates are relative to canvas: `e.offsetX` and `e.offsetY`

### Line Joining & Capping

| Property    | Value   | Effect                                        |
| ----------- | ------- | --------------------------------------------- |
| `lineJoin`  | "round" | Smooth corners where line segments meet       |
| `lineCap`   | "round" | Rounded endpoints on individual line segments |
| `lineWidth` | 1-50+   | Stroke thickness in pixels                    |

These create smooth, natural-looking brush strokes.

---

## Technical Implementation

### HTML Structure

- Full-screen canvas element with id `draw`
- Control panel with fixed positioning (bottom-right)
- Clear button for resetting canvas
- Range slider for brush size adjustment

### CSS Features

- Full viewport coverage: `margin: 0` and canvas fills window
- Fixed positioning for control panel overlay
- Semi-transparent background with `rgba()`
- Rounded corners and shadow for depth
- Flexbox layout for control elements
- High z-index to ensure visibility above canvas

### JavaScript Implementation

- Canvas context selection and initialization
- Global state variables for drawing mode and coordinates
- Complex drawing functions with multiple path operations
- Comprehensive event listener system:
  - Mouse events: mousedown, mousemove, mouseup, mouseout
  - Keyboard events: keydown for spacebar
  - Input events: input for range slider
- HSL color generation with template literals
- Array destructuring for coordinate updates

---

## Skills Demonstrated

- **HTML5 Canvas API**: Path drawing, strokes, curves, arcs, clearing
- **Advanced Drawing Techniques**: Quadratic curves, arcs, complex shape composition
- **Event Handling**: Multiple event types, coordinate tracking, state management
- **Color Theory**: HSL color model, hue cycling, dynamic color generation
- **Mathematical Concepts**: Angles in radians, coordinate math, shape positioning
- **State Management**: Boolean flags, variable tracking, coordinate updates
- **User Interaction**: Real-time response, brush customization, keyboard shortcuts
- **Performance**: Efficient canvas rendering, immediate-mode graphics
- **Creative Programming**: Procedural drawing, decorative text generation

---

## Files Included

| File         | Purpose                                             |
| ------------ | --------------------------------------------------- |
| `index.html` | HTML structure with canvas and control elements     |
| `style.css`  | Styling, layout, control panel positioning          |
| `script.js`  | Canvas drawing logic, event handling, color cycling |

---

## How It Works

1. Page loads and JavaScript initializes
2. Canvas is set to full window dimensions
3. 2D context is created with initial styling properties
4. `drawDefaultHey()` draws decorative text on canvas
5. Hue is set to blue (220°) for initial drawing color
6. User clicks and drags on canvas:
   - `mousedown` event stores starting coordinates
   - `mousemove` events trigger drawing
   - Each pixel movement creates a line segment
   - Hue increments with each stroke for rainbow effect
7. User releases mouse: `mouseup` stops drawing
8. User can adjust brush size with slider: updates `ctx.lineWidth` in real-time
9. User clicks clear button: entire canvas is cleared with `clearRect()`
10. User presses spacebar: hue randomizes to new color

---

## Drawing Techniques

### Quadratic Curves

\( \text{quadraticCurveTo}(cp_x, cp_y, x, y) \)

Creates smooth curves defined by:

- **Starting point**: Current path position
- **Control point**: \( (cp_x, cp_y) \) - pulls curve shape
- **End point**: \( (x, y) \) - destination

Changing control point changes curve shape dramatically.

### Arc Paths

\( \text{arc}(x, y, r, \theta_1, \theta_2, \text{ccw}) \)

Draws circular arc with:

- **Center**: \( (x, y) \)
- **Radius**: \( r \) pixels
- **Start angle**: \( \theta_1 \) in radians
- **End angle**: \( \theta_2 \) in radians
- **Counter-clockwise**: Boolean flag

Angles: 0 = right, π/2 = bottom, π = left, 3π/2 = top

---

## User Controls

| Control               | Action                                |
| --------------------- | ------------------------------------- |
| **Mouse drag**        | Draw with rainbow-cycling color brush |
| **Brush size slider** | Adjust line width (1-50+ pixels)      |
| **Clear button**      | Erase entire canvas                   |
| **Spacebar**          | Randomize current drawing color       |

---

## Future Enhancement Ideas

- Add color picker for custom starting color
- Implement eraser tool to erase)
- Add multiple brush styles (spray, chalk, marker effect)
- Implement undo/redo functionality with canvas stack
- Add save functionality to download canvas as image
- Create preset shapes (circle, rectangle, triangle tools)
- Add text drawing tool
- Implement shape smoothing for cleaner lines
- Add layers/transparency support
- Create animation playback of drawing sequences
- Mobile touch support for tablets and phones

---

## Summary

This drawing canvas application successfully demonstrates **core and advanced Canvas API techniques** combined with **robust event handling and state management**. By implementing real-time color cycling, responsive brush controls, and decorative programmatic drawing, the project showcases professional-level interactive graphics programming.
