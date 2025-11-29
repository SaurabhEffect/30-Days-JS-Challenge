# Custom Video Player - HTML5 Media API Project

## Project Overview

This project demonstrates a **fully-featured custom video player** built with HTML5 Video API and vanilla JavaScript. The player includes play/pause controls, skip buttons, progress scrubbing with hover tooltips, volume and playback speed controls, fullscreen support, time display, and dynamic mute icon states. This project showcases the HTML5 Media API, event handling, data attributes, and interactive UI controls.

---

## Learning Objectives

### What We Learned

#### 1. **HTML5 Video API Fundamentals**

- Selecting video elements with `querySelector()`
- Understanding video element properties: `.paused`, `.duration`, `.currentTime`, `.volume`, `.muted`, `.playbackRate`
- Accessing video methods: `.play()` and `.pause()`
- Using dynamic property access: `video[method]()` for conditional method calling
- Managing video metadata: duration, current time, loaded state

#### 2. **Video Event Handling & Lifecycle**

- `play` event: fires when video starts playing
- `pause` event: fires when video is paused
- `timeupdate` event: fires frequently as video plays (for progress updates)
- `volumechange` event: fires when volume or mute state changes
- `loadedmetadata` event: fires when video duration and dimensions load
- `click` event: fires on video element for play/pause toggle
- Understanding event timing and frequency

#### 3. **Progress Tracking & UI Updates**

- Calculating progress percentage: \( \text{percent} = \frac{\text{currentTime}}{\text{duration}} \times 100 \)
- Using `flexBasis` CSS property for progress bar fill animation
- Updating displayed time in MM:SS format
- Real-time text updates during playback
- Coordinating progress bar with actual playback position

#### 4. **Time Formatting & String Padding**

- Converting seconds to minutes and seconds: \( \text{minutes} = \lfloor \frac{\text{seconds}}{60} \rfloor \)
- Using `Math.floor()` for rounding down
- Using modulo operator: \( \text{secs} = \text{seconds} \bmod 60 \)
- Using `.padStart()` for zero-padding numbers
- Creating readable time display: "MM:SS" format
- Handling edge cases (0 duration, non-existent metadata)

#### 5. **Data Attributes for Configuration**

- Accessing HTML data attributes: `this.dataset.skip`
- Using data attributes to store metadata in HTML
- `parseFloat()` to convert string data to numbers
- Flexible, declarative configuration in markup
- Reusable elements with different configurations

#### 6. **Dynamic Property Assignment with Square Bracket Notation**

- Accessing object properties dynamically: `video[this.name] = this.value`
- Using input element `name` attribute to identify property
- Supporting multiple properties with single function: `volume`, `playbackRate`
- Understanding bracket vs dot notation in JavaScript

#### 7. **Range Input Handling & Slider Events**

- Using `input` and `change` events for range inputs
- `input` event: fires continuously while dragging
- `change` event: fires only when slider is released
- Attaching same handler to multiple event types
- Real-time feedback while manipulating sliders

#### 8. **Mouse Event Tracking & Progress Scrubbing**

- `mousedown`, `mouseup` events for tracking drag state
- `mousemove` event for continuous position updates
- Using boolean flag `mousedown` to track active dragging
- Scrubbing calculation: \( \text{scrubTime} = \frac{\text{offsetX}}{\text{progressWidth}} \times \text{duration} \)
- Coordinating multiple events for drag-like behavior
- Cursor position to video time conversion

#### 9. **Fullscreen API & Browser Compatibility**

- Using `document.fullscreenElement` to detect fullscreen state
- Calling `.requestFullscreen()` to enter fullscreen
- Calling `document.exitFullscreen()` to exit fullscreen
- Error handling with `.catch()` for fullscreen errors
- Supporting webkit prefix for older browsers: `.requestFullscreen()` and `-webkit-full-screen`
- Updating UI icons based on fullscreen state

#### 10. **Tooltip Positioning & Hover Effects**

- Using `position: absolute` for tooltip positioning
- Calculating hover position: tooltip position = mouse X coordinate
- Using `transform: translateX(-50%)` for centering tooltip above cursor
- Conditional tooltip display: show on hover, hide otherwise
- Time calculation at hover position: \( \text{hoverTime} = \frac{\text{offsetX}}{\text{progressWidth}} \times \text{duration} \)
- Using `isNaN()` to validate numeric values

#### 11. **Volume Icon State Management**

- Three-state mute icon system: 🔇 (muted), 🔉 (low), 🔊 (full)
- Conditional icon selection based on volume and mute state
- Using ternary operators for quick state checks
- Dynamic icon updates matching user actions
- Accessible emoji-based UI (no images required)

#### 12. **CSS Custom Styling of Native Controls**

- Using `-webkit-appearance: none` to customize range input appearance
- Styling slider track: `::-webkit-slider-runnable-track` and `::-moz-range-track`
- Styling slider thumb: `::-webkit-slider-thumb` and `::-moz-range-thumb`
- Cross-browser compatibility for input styling
- Focus states with `:focus` pseudo-selector
- Custom colors and sizing for form elements

#### 13. **Hover Effects & Control Display**

- Using `:hover` pseudo-selector for conditional display
- `transform: translateY()` for sliding controls in/out
- `transition` for smooth animation between states
- Player controls hidden until hover
- Progress bar expands on hover for easier clicking

#### 14. **Flexbox Layout for Player Controls**

- Using `display: flex` for control panel layout
- `flex-wrap: wrap` to allow controls on multiple rows
- `flex: 1` for flexible sizing of controls
- `flex-basis: 100%` for progress bar to span full width
- Responsive button sizing and arrangement

---

## Key Concepts Breakdown

### Video Player Architecture

```
HTML5 Video Element
         ↓
JavaScript Event Listeners
         ↓
Event Handlers (play, pause, progress, etc.)
         ↓
DOM Updates (progress bar, time display, icons)
         ↓
CSS Styling & Animations
         ↓
User-Controlled Video Player
```

### Time Format Conversion

Converting seconds (e.g., 125 seconds) to MM:SS format:

| Step    | Calculation                                               | Result |
| ------- | --------------------------------------------------------- | ------ |
| Minutes | \( \lfloor 125 \div 60 \rfloor = \lfloor 2.083 \rfloor \) | 2      |
| Seconds | \( 125 \bmod 60 = 5 \)                                    | 5      |
| Padded  | `"02"` and `"05"`                                         | 02:05  |

### Progress Scrubbing Algorithm

When user clicks or drags on progress bar:

1. Get click position: `e.offsetX` (pixels from left)
2. Get progress bar width: `progress.offsetWidth` (total pixels)
3. Calculate ratio: \( \text{ratio} = \frac{\text{offsetX}}{\text{width}} \)
4. Calculate time: \( \text{scrubTime} = \text{ratio} \times \text{duration} \)
5. Update video: `video.currentTime = scrubTime`

### Event Listener Structure

| Event                | Trigger             | Handler               | Purpose                |
| -------------------- | ------------------- | --------------------- | ---------------------- |
| click (video)        | Click on video      | togglePlay()          | Play/pause             |
| click (toggle)       | Click button        | togglePlay()          | Play/pause             |
| play                 | Video starts        | updateButton()        | Update icon            |
| pause                | Video stops         | updateButton()        | Update icon            |
| timeupdate           | Playback progresses | handleProgress()      | Update progress bar    |
| change (range)       | Slider released     | handleRangeUpdate()   | Update volume/playback |
| input (range)        | Slider dragged      | handleRangeUpdate()   | Real-time update       |
| click (progress)     | Click progress bar  | scrub()               | Seek to position       |
| mousemove (progress) | Drag on progress    | scrub()               | Scrub through video    |
| mousemove (progress) | Hover on progress   | handleProgressHover() | Show tooltip           |
| volumechange         | Volume changes      | updateMuteIcon()      | Update icon            |
| click (fullscreen)   | Click fullscreen    | toggleFullscreen()    | Enter/exit fullscreen  |

### Volume Icon Logic

```
if (muted || volume === 0) → "🔇" (silent)
else if (volume < 0.5) → "🔉" (low)
else → "🔊" (full)
```

### Range Input Modification

Using `input[type="range"]`:

- `-webkit-appearance: none` removes default browser styling
- Custom track styling with `::-webkit-slider-runnable-track`
- Custom thumb styling with `::-webkit-slider-thumb`
- Firefox uses `::-moz-range-track` and `::-moz-range-thumb`
- Cross-browser support requires both webkit and moz prefixes

---

## Technical Implementation

### HTML Structure

- Video element with class `.viewer`
- Play/pause toggle button
- Skip buttons (data-skip attribute)
- Progress bar with filled indicator and tooltip
- Range sliders for volume and playback rate
- Mute button with dynamic icon
- Fullscreen button
- Time and playback rate displays
- Flexbox-based control layout

### CSS Features

- Gradient background for player container
- Custom range input styling (webkit and Mozilla)
- Hover effects for controls (slide in/out with transform)
- Progress bar expansion on hover
- Tooltip positioning with absolute positioning
- Flexbox layout for responsive controls
- Full-screen styles for expanded player
- Smooth transitions on all interactive elements
- Emoji-based UI (no image dependencies)

### JavaScript Implementation

- 13 event listener functions for different interactions
- Global state tracking: `mousedown` boolean for drag detection
- Time formatting utility function
- Property name-based property assignment for scalability
- Error handling for fullscreen API
- Multiple event listeners per element (click, change, input, mousemove, etc.)
- Array methods: `forEach()` for attaching listeners to multiple elements
- Conditional logic for state-dependent behavior

---

## Skills Demonstrated

- **HTML5 Media API**: Video element properties and methods, event lifecycle
- **Event Handling**: Multiple events per element, event coordination, modifier detection
- **Mathematical Calculations**: Time conversion, progress percentage, position mapping
- **DOM Manipulation**: Dynamic text updates, class modifications, element positioning
- **State Management**: Tracking drag state, fullscreen state, volume state
- **Data Attributes**: Using HTML attributes for configuration and metadata
- **CSS Styling**: Custom form elements, hover effects, transitions, transforms
- **Browser Compatibility**: Webkit and Mozilla vendor prefixes
- **User Interface**: Responsive controls, visual feedback, accessible icons
- **Error Handling**: Try-catch patterns, validation with isNaN()

---

## Files Included

| File         | Purpose                                              |
| ------------ | ---------------------------------------------------- |
| `index.html` | Video player markup with controls and displays       |
| `style.css`  | Player styling, custom range inputs, hover effects   |
| `scripts.js` | Video control logic, event handlers, time formatting |

---

## Advanced Features

### Drag-Based Scrubbing

Uses `mousedown`/`mouseup` events to enable smooth dragging:

- Set flag on mousedown
- Update position on mousemove only if flag is true
- Clear flag on mouseup
- Allows seamless scrubbing without needing to hold mouse button

### Intelligent Mute Icon

Three-state icon based on both muted status and volume level:

- Completely muted: 🔇
- Low volume (< 50%): 🔉
- Full volume: 🔊

### Hover Tooltip

Shows exact time at cursor position without scrubbing:

- Displays on progress bar hover only
- Updates position as mouse moves
- Uses calculated time based on cursor position
- Helpful for quick navigation preview

---

## Future Enhancement Ideas

- Add keyboard shortcuts (spacebar for play/pause, arrow keys for skip)
- Implement video quality selection
- Add subtitles/caption support
- Create playlist management
- Add playback history tracking
- Implement watch-later functionality
- Add picture-in-picture mode
- Create custom branding/themes
- Add playback analytics
- Implement streaming quality adaptation
- Add video recommendations
- Create mobile-optimized touch controls
- Add video recording capability
- Implement frame-by-frame navigation

---

## Summary

This custom video player project successfully demonstrates **comprehensive HTML5 Media API usage combined with sophisticated event handling** to create a professional, fully-featured video player. By implementing play/pause controls, progress scrubbing with hover tooltips, volume and playback speed control, fullscreen support, and dynamic state-based iconography, the project showcases advanced JavaScript interactivity and real-world UI patterns.
