# V3 — Direct Table Rendering Sample (`tableSimple`)

This sample demonstrates direct single-pass table rendering using the V3 bundle of `json-renderers-from-instructions`.

## Structure

- `index.html` — Page markup with the visible mount container `#dom-render-container` and optional hidden staging `#v52-staging`.
- `index.js` — Imports data, columns, and calls `window.ks.jsonRenderers.fromInstructions.render`.
- `common/columns.json` — Column specifications (name, label, type, width, options).
- `common/data.json` — Sample row dataset.
- `instructions.json` — Declarative instruction tree for startup, search, and body lifecycle.
- `actions.js` — Action registry for table lifecycle actions (`clearBody`, `showBody`).

## How It Works

```javascript
import columns from "./common/columns.json" with { type: "json" };
import data from "./common/data.json" with { type: "json" };
import "../../../docs/dist/v3/min.js";

window.ks.jsonRenderers.fromInstructions.render({
  type: "table.simple",
  data,
  columns,
  options: { showSerial: true, showSearch: false, showOptions: false },
  targetHtmlId: "dom-render-container",
  classToApply: "",
  appendPosition: "replace"
});
```

## How to Test

1. Start your local HTTP server.
2. Open `http://localhost:3000/samples/v3/tableSimple/`.
3. The table renders immediately into `#dom-render-container` with serial numbers, column widths, and striped rows.
