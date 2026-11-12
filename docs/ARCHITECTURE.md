# Architecture & Internal Pipeline: json-renderers-from-instructions

This document details the internal transformation mechanics of `json-renderers-from-instructions` (V3).

---

## 1. High-Level Flow

When `render(config)` is called:

```
config { type, data, columns, options, targetHtmlId, appendPosition, classToApply }
   │
   ├─► 1. Guard Validation (json-renderers-guard)
   │      Checks compulsory keys: type, data, columns, targetHtmlId, appendPosition, classToApply
   │
   ├─► 2. Spec Assembly (buildTableSpec.js)
   │      a. Extracts localType (e.g. "table.simple" -> "simple")
   │      b. Resolves blueprint from spec-repo definitions (table.simple)
   │      c. Clones config.base (the empty HTML table skeleton)
   │      d. Creates shared registry: { data: { columns, data }, base, ...options }
   │      e. Calls json-renderers-run-instructions(single, double, registry)
   │      f. Calls json-renderers-build-table-options(options, base)
   │
   └─► 3. DOM Mount (@keshavsoft/json-to-dom)
          Mounts the generated Virtual DOM specification into targetHtmlId.
```

---

## 2. The Blueprint Structure (`spec-repo`)

A table definition in `spec-repo` (e.g. `definitions.table.simple`) contains three parts:

```json
{
  "base": {
    "tagName": "div",
    "attributes": { "data-role": "table-parent" },
    "children": [
      {
        "tagName": "table",
        "attributes": { "class": "table table-hover table-striped align-middle border mb-0" },
        "children": [
          { "tagName": "colgroup", "attributes": { "data-role": "table-colgroup" }, "children": [] },
          { "tagName": "thead", "attributes": { "class": "table-dark", "data-role": "table-header" }, "children": [
            { "tagName": "tr", "attributes": { "data-role": "table-header-row" }, "children": [] }
          ]},
          { "tagName": "tbody", "attributes": { "data-role": "table-body" }, "children": [] }
        ]
      }
    ]
  },
  "single": [ ... ],
  "double": [ ... ]
}
```

---

## 3. Instruction Execution Mechanics

### A. Single Instructions (1D Transformations)
Used for single collections like `<colgroup>` and `<thead>`:
1. Reads `columns` from `registry.data.columns`.
2. Applies the `buildColGroup` template to each column, generating `<col width="...">` tags.
3. Writes the resulting array into `registry.base` at the element with `data-role="table-colgroup"`.
4. Reads `columns` again, applies `buildHeader` template, generating `<th textContent="...">` tags, and writes into `data-role="table-header-row"`.

### B. Double Instructions (2D Matrix Transformations)
Used for `<tbody>` rows:
1. Iterates over rows in `registry.data.data`.
2. For each row, iterates over columns in `registry.data.columns`.
3. Stamps out a `<tr>` containing `<td>` elements mapped to the corresponding property in that row record.
4. Appends each completed `<tr>` to `data-role="table-body"`.

### C. Options Injection (`json-renderers-build-table-options`)
Once the base table is assembled:
- If `options.showSerial === true`:
  - Prepends `<col width="50px">` to `colgroup`.
  - Prepends `<th textContent="#">` to header row.
  - Prepends `<td textContent="{index + 1}">` to every body row.
- If `options.showSearch === true`:
  - Mounts a search input card above the table.

---

## 4. Headless & Testability Guarantee

Because step 2 (`buildTableSpec`) is completely isolated from step 3 (`jsonToDom`), the entire specification building phase has **zero browser DOM dependencies**:
- It can run in Node.js scripts.
- It can run in unit tests.
- It produces 100% deterministic, serializable JSON output.

