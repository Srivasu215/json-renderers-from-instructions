import columns from "./common/columns.json" with { type: "json" };
import data from "./common/data.json" with { type: "json" };

const targetHtmlId = "dom-render-container";

const start = () => {
    try {
        // Pure consumption: 1 call builds N selects and mounts directly to the DOM!
        window.ks.jsonRenderers.fromInstructions.render({
            type: "select",
            data,
            columns,
            options: { allColumns: true },
            targetHtmlId,
            appendPosition: "replace",
            classToApply: ""
        });

        const selects = document.querySelectorAll(`#${targetHtmlId} select`);
        selects.forEach(s => s.classList.add("form-select", "shadow-sm", "mb-3"));

    } catch (error) {
        console.error("V4 Select initialization failed:", error);
        const container = document.getElementById(targetHtmlId);
        if (container) {
            container.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
        }
    }
};

start();
