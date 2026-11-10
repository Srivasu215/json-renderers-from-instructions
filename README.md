# json-renderers-from-instructions

Focused table specification builder with configurable rows and cells using instruction-driven architecture.

## Installation

```bash
npm install json-renderers-from-instructions
```

## Usage

```javascript
import { render, buildTableSpec } from "json-renderers-from-instructions";

const dom = render({
    type: "table.simple",
    data: [
        { name: "Item 1", value: 100 }
    ],
    columns: [
        { columnName: "name" },
        { columnName: "value" }
    ],
    targetHtmlId: "container"
});
```

