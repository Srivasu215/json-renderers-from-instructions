# samples/v3/select

> **Demonstration of Instruction-Driven Multi-Select Rendering.**  
> Takes `columns.json` and `data.json` and builds **$N$ HTML `<select>` controls** (one per column) with `<option>` elements extracted and populated from the data records.

---

## 💡 The Core Purpose

Traditionally, people assume `json-renderers-from-instructions` only generates tables. This sample proves that the architecture is **component-agnostic**:

1. **Columns Input (`columns.json`)**:
   - $N$ column definitions.
   - For each column, the engine forms an individual `<select>` container card with label and ID.
2. **Data Source (`data.json`)**:
   - Array of data records.
   - For each column, unique values from `data.json` are extracted and populated as `<option>` items.
3. **Renderer (`@keshavsoft/json-to-dom`)**:
   - Stamps the complete Virtual DOM specification tree into the DOM in a single pass.

---

## 🚀 Running the Sample

Open `index.html` in your browser through any local web server:

```bash
# Example using npx serve or any static server
npx serve .
```

Navigate to: `http://localhost:3000/samples/v3/select/`

