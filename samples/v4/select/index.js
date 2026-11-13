import render from "../../../node_modules/json-renderers-specs/docs/dist/v4/min.js";
import { buildSpecElement } from "https://keshavsoft.github.io/json-to-tag/dist/v9/min.js";
import columns from "./common/columns.json" with { type: "json" };
import data from "./common/data.json" with { type: "json" };

const container = document.getElementById("dom-render-container");

const start = () => {
    try {
        // Pure consumption: Zero custom data loops, zero option mappers.
        // The ecosystem renderer builds N <select> controls (one per column)
        // with options populated directly from data.json.
        const spec = render({
            type: "select",
            data,
            columns,
            options: { allColumns: true }
        });

        const dom = buildSpecElement(spec);
        const elements = Array.isArray(dom) ? dom : [dom];

        elements.forEach(selectEl => {
            selectEl.className = "form-select shadow-sm mb-3";
        });

        container.replaceChildren(...elements);

    } catch (error) {
        console.error("Selects rendering failed:", error);
        container.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
    }
};

start();
