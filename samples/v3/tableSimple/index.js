import instructions from "./instructions.json" with { type: "json" };
import columns from "./common/columns.json" with { type: "json" };
import data from "./common/data.json" with { type: "json" };

import "../../../docs/dist/v3/min.js";
const targetHtmlId = "dom-render-container";

const start = () => {
    try {
        window.ks.jsonRenderers.fromInstructions.render({
            type: "table.simple",
            data,
            columns,
            options: { showSerial: true, showSearch: false, showOptions: false },
            targetHtmlId,
            classToApply: "",
            appendPosition: "replace"
        });

        const status = document.getElementById("v52-status");
        if (status) status.textContent = "Table rendered successfully.";
    } catch (error) {
        console.error("V52 initialization failed:", error);
        const container = document.getElementById("dom-render-container");
        if (container) {
            const alert = document.createElement("div");
            alert.className = "alert alert-danger";
            alert.textContent = error.message;
            container.replaceChildren(alert);
        }
        const status = document.getElementById("v52-status");
        if (status) status.textContent = `Error: ${error.message}`;
    }
};

start();
