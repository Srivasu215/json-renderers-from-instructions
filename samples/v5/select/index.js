import columns from "./common/columns.json" with { type: "json" };
import data from "./common/data.json" with { type: "json" };

const targetHtmlId = "dom-render-container";

const start = () => {
    try {
        // Pure 1-statement consumption via V5 engine
        window.ks.jsonRenderers.fromInstructions.render({
            type: "select",
            data,
            columns,
            options: { allColumns: true },
            targetHtmlId,
            appendPosition: "replace"
        });

        const selects = document.querySelectorAll(`#${targetHtmlId} select`);
        selects.forEach(s => s.classList.add("form-select", "shadow-sm", "mb-3"));

    } catch (error) {
        console.error("V5 Select initialization failed:", error);
        const container = document.getElementById(targetHtmlId);
        if (container) {
            container.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
        }
    }
};

start();

