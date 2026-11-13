import runInstructions from "json-renderers-run-instructions";
import tableOptions from "json-renderers-build-table-options";
import { fromCollection } from "json-transformer-funcs";

/**
 * Builds the Virtual JSON DOM specification by dynamically consuming
 * component definitions from spec-repo and running declarative instructions.
 */
const buildSpec = ({
    definitions,
    type = "table.simple",
    data = [],
    columns = [],
    options = {},
    showLog = false
} = {}) => {
    const rawType = type || "table.simple";
    const [category, variant] = rawType.includes(".") ? rawType.split(".") : [rawType, "simple"];

    const categoryDef = definitions?.[category];
    if (!categoryDef) {
        throw new Error(`Unknown component type: "${category}". Available: ${Object.keys(definitions || {}).join(", ")}`);
    }

    // 1. SELECT COMPONENT: Pulls base from definitions.select, populates options via fromCollection
    if (category === "select") {
        const config = categoryDef.simple || categoryDef;
        const targetColumns = (options.allColumns || (columns.length > 1 && !options.columnName && !options.column))
            ? columns
            : (options.columnName || options.column)
                ? columns.filter(c => (c.columnName || c.name || c) === (options.columnName || options.column))
                : [columns.find(c => c.type === "select") || columns[0]];

        return targetColumns.map(col => {
            const colName = col.columnName || col.name || col;
            const select = structuredClone(config.base);
            select.attributes.id = colName;
            select.attributes["data-name"] = colName;

            const optionTemplate = {
                tagName: "option",
                textContent: `\${${colName}}`,
                attributes: { value: `\${${colName}}` }
            };

            select.children = fromCollection(data, optionTemplate);
            return select;
        });
    }

    // 2. TABLE & OTHER INSTRUCTION-DRIVEN SPECS
    const config = categoryDef[variant] || categoryDef.simple || categoryDef;
    const base = structuredClone(config.base);
    const registry = {
        data: { columns, data },
        base,
        ...options
    };

    runInstructions({
        single: config.single || [],
        double: config.double || [],
        registry,
        showLog
    });

    if (category === "table") {
        tableOptions({ options, base });
    }

    return base;
};

export default buildSpec;

