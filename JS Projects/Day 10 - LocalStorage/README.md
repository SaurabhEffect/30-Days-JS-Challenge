# Plate Smasher Todo List - localStorage Persistence Project

## Project Overview

This project demonstrates a **persistent todo list application** that combines HTML5 local storage with interactive checkboxes and dynamic list rendering. Users can add items to a plate list, check them off with emoji toggles (⬜️ to 🌮), and all data persists across browser sessions using the localStorage API. The application features form submission, JSON serialization, and a clear-completed functionality. This project showcases data persistence, event handling, and dynamic DOM manipulation.

---

## Learning Objectives

### What We Learned

#### 1. **HTML5 localStorage API Fundamentals**

- Understanding `localStorage` as client-side key-value storage
- Storing data: `localStorage.setItem(key, value)`
- Retrieving data: `localStorage.getItem(key)`
- Data persists even after browser closes and reopens
- Limited to ~5-10MB per domain (browser-dependent)
- Data stored as strings (must serialize/deserialize)

#### 2. **JSON Serialization & Deserialization**

- Converting objects to JSON strings: `JSON.stringify(object)`
- Converting JSON strings to objects: `JSON.parse(jsonString)`
- Storing complex data structures in localStorage
- Understanding JSON format: key-value pairs with specific syntax
- Handling parse errors with try-catch or fallback values
- Using logical OR for default values: `JSON.parse(...) || []`

#### 3. **Data Persistence on Page Load**

- Loading data from localStorage on application startup
- Using conditional logic: `const items = JSON.parse(localStorage.getItem("items")) || []`
- Initializing empty array if no data exists
- Automatic list population with persisted data
- Understanding stateful applications vs stateless pages

#### 4. **Form Handling & Event Prevention**

- Using `<form>` elements with submit functionality
- `submit` event: fires when form is submitted (Enter key or button click)
- Using `e.preventDefault()` to stop default form behavior
- Understanding form context: `this` refers to the form element
- Accessing form inputs via `this.querySelector()`
- Resetting form: `this.reset()` clears all input fields

#### 5. **Object Creation & Array Management**

- Creating item objects: `{ text, done: false }`
- Using shorthand property syntax: `{ text }` equals `{ text: text }`
- Adding items to array: `.push(item)`
- Understanding item structure and properties
- Maintaining array state throughout application lifetime

#### 6. **Template Literals & Dynamic HTML Generation**

- Using backticks for multi-line template strings
- Embedding variables with `${variable}` syntax
- Creating HTML strings from array data
- Conditional logic within templates: ternary operators
- Building complex HTML without DOM manipulation methods

#### 7. **Map & Array Transformation**

- Using `.map()` to transform array items to HTML strings
- Arrow function syntax: `(item, index) => { }`
- Accessing both item data and index in map callback
- Chaining `.join()` to convert array of strings to single string
- Creating reusable transformation functions

#### 8. **Dynamic CSS Classes Based on State**

- Adding classes conditionally: `${plate.done ? 'item-done' : ''}`
- Using classes to style elements based on data state
- Strike-through and opacity through CSS classes
- Separating styling logic from JavaScript logic
- Reactive styling: automatically update when state changes

#### 9. **Hidden Checkboxes with Custom Labels**

- Setting `display: none` on checkbox inputs
- Using `<label>` elements styled to replace checkboxes
- Creating adjacent selectors: `input + label`
- CSS `:before` pseudo-element for checkbox representation
- Using emoji as visual indicators: ⬜️ and 🌮
- Changing appearance based on checked state: `input:checked + label:before`

#### 10. **Event Delegation & Click Handling**

- Attaching click listeners to parent container
- Using data attributes to identify which item to toggle
- Delegating events from parent (list) to children (items)
- Using `e.target` to identify clicked element
- Event bubbling: child clicks propagate to parent

#### 11. **Toggle & State Management**

- Using `checked` property on checkbox elements
- Finding items by index: `items[index]`
- Toggling boolean state: `plate.done = !plate.done`
- Updating UI after state changes
- Persisting state changes to localStorage

#### 12. **Clear/Filter Operations**

- Filtering array: `.filter(item => condition)`
- Removing completed items: filter where `done` is false
- Updating both state and UI
- Persisting changes immediately
- User feedback: visual confirmation of action

#### 13. **CSS Pseudo-Classes & Selectors**

- Using `:before` pseudo-element for emoji display
- Using `:checked` selector for checkbox state styling
- Adjacent sibling combinator: `input + label`
- Combining pseudo-selectors with class selectors
- Understanding CSS specificity and selector precedence

#### 14. **Data Attributes in HTML**

- Using `data-*` attributes to store metadata
- Using `data-index` to identify which item to interact with
- Accessing data attributes: `e.target.dataset.index`
- Parsing string values: `parseInt()` for numbers
- Flexible, declarative way to associate data with elements

---

## Key Concepts Breakdown

### Data Flow Architecture

```
Page Load
   ↓
Load from localStorage (or empty array)
   ↓
Populate list with existing items
   ↓
User adds item
   ↓
Create item object
   ↓
Add to items array
   ↓
Save to localStorage (JSON.stringify)
   ↓
Re-render list (HTML generation)
   ↓
Display updated list
   ↓
User checks item
   ↓
Update item.done property
   ↓
Save to localStorage
   ↓
Re-render list with strikethrough
```

### localStorage Persistence Cycle

| Step          | Code                                                   | Result                       |
| ------------- | ------------------------------------------------------ | ---------------------------- |
| Save          | `localStorage.setItem("items", JSON.stringify(items))` | Data stored in browser       |
| Close browser | Page unloads                                           | Data remains in localStorage |
| Reopen page   | `localStorage.getItem("items")`                        | Data retrieved               |
| Parse         | `JSON.parse(data)`                                     | Objects reconstructed        |
| Display       | Populate list                                          | User sees previous items     |

### Checkbox Toggle Mechanism

**CSS-based visual change:**

```css
/* Unchecked state */
input + label:before {
  content: "⬜️";
}

/* Checked state */
input:checked + label:before {
  content: "🌮";
}
```

**JavaScript toggle:**

```javascript
checkbox.checked = !checkbox.checked; // Toggle true/false
const itemIndex = parseInt(e.target.dataset.index);
items[itemIndex].done = !items[itemIndex].done; // Toggle done property
```

### HTML Generation from Array

Converting array of items to HTML list:

```javascript
items
  .map(
    (plate, i) => `
  <li class="${plate.done ? "item-done" : ""}">
    <input type="checkbox" ${plate.done ? "checked" : ""} data-index="${i}">
    <label>${plate.text}</label>
  </li>
`
  )
  .join("");
```

Each item generates an `<li>` with:

- Conditional class if done
- Checkbox input with data-index
- Label with item text

### Clear Completed Operation

Removes all items where `done === true`:

```javascript
items = items.filter((item) => !item.done); // Keep only incomplete
localStorage.setItem("items", JSON.stringify(items));
populateList(items, itemsList);
```

---

## Technical Implementation

### HTML Structure

- `.wrapper` container for the app
- SVG logo or icon at top
- `<h2>` title
- `.plates` unordered list for items
- `.add-items` form for input
- `.clear-completed` button for bulk clearing

### CSS Features

- Full viewport background image
- Semi-transparent white card design with shadow
- Flexbox for centering and layout
- Hidden checkboxes with emoji-based custom styling
- Strikethrough and opacity for completed items
- Responsive form input styling
- Button styling with cursor pointer

### JavaScript Implementation

- Initial data loading from localStorage on page load
- Form submission handler with event prevention
- Dynamic HTML generation with `.map()` and template literals
- localStorage save operations after every change
- Event delegation for click handling on list items
- Filter-based clearing of completed items
- No framework dependencies (vanilla JavaScript)

---

## Skills Demonstrated

- **Data Persistence**: localStorage API, JSON serialization, data retrieval
- **Form Handling**: Submit events, form reset, input retrieval
- **Array Methods**: map, filter, push operations
- **DOM Manipulation**: Dynamic HTML generation, innerHTML updates, class manipulation
- **Event Handling**: Form submission, click delegation, target identification
- **State Management**: Object state, array state, persistence
- **CSS Techniques**: Pseudo-selectors, pseudo-elements, conditional styling
- **Data Attributes**: HTML5 data attributes for metadata storage
- **JavaScript ES6+**: Template literals, arrow functions, shorthand syntax

---

## Files Included

| File         | Purpose                                                       |
| ------------ | ------------------------------------------------------------- |
| `index.html` | HTML structure with form, list, and buttons                   |
| `style.css`  | Styling with emoji toggles, background image, card design     |
| `script.js`  | localStorage, form handling, list rendering, state management |

---

## Interactive Features

| Interaction             | Action                                |
| ----------------------- | ------------------------------------- |
| **Type & Enter**        | Add new item to list                  |
| **Click item checkbox** | Toggle between ⬜️ and 🌮             |
| **Checked item**        | Text gets strikethrough and faded     |
| **Clear completed**     | Remove all checked items              |
| **Close & reopen**      | Items persist (saved in localStorage) |

---

## localStorage Data Structure

Stored as JSON string in localStorage key `"items"`:

```json
[
  { "text": "Buy groceries", "done": false },
  { "text": "Complete project", "done": true },
  { "text": "Call mom", "done": false }
]
```

This JSON structure allows perfect reconstruction when parsing.

---

## Emoji-Based UI Innovation

Instead of traditional checkboxes, the project uses:

- **⬜️ (White Square)**: Unchecked/incomplete
- **🌮 (Taco)**: Checked/complete

This theme creates a fun "plating" metaphor:

- Start with empty plate (⬜️)
- Serve taco (🌮) when done
- Relates to food/dining theme of background image

---

## Summary

This plate smasher todo list project successfully demonstrates **practical data persistence combined with interactive state management**. By leveraging the localStorage API for cross-session data survival, JSON for data serialization, and dynamic DOM manipulation for responsive UI updates, the project showcases essential skills for building real world web applications.
