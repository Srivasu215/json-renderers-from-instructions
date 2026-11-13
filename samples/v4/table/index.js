import columns from "./common/columns.json" with { type: "json" };
import data from "./common/data.json" with { type: "json" };

const targetHtmlId = "dom-render-container";

const start = () => {
    try {
        // Pure consumption: 1 call builds table and mounts directly to the DOM!
        window.ks.jsonRenderers.fromInstructions.render({
            type: "table.simple",
            data,
            columns,
            options: { showSerial: true, showSearch: false, showOptions: false },
            targetHtmlId,
            classToApply: "",
            appendPosition: "replace"
        });
    } catch (error) {
        console.error("V4 Table initialization failed:", error);
        const container = document.getElementById(targetHtmlId);
        if (container) {
            container.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
        }
    }
};

start();

