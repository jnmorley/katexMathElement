import katex from '/external/katex.min.js';
import * as cssText from "bundle-text:/external/katex.min.css";

const katexCSS = new CSSStyleSheet();
katexCSS.replaceSync(cssText);

export class katexMath extends HTMLElement {
    static get observedAttributes() {
        return ["expression", "display-mode", "throw-on-error", "output", 
                "leqno", "fleqn", "error-color", "macros", "min-rule-thickness",
                "color-is-text-color", "max-size", "max-expand", "strict",
                "loading"];

 }
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: "open"});
        this.shadow.adoptedStyleSheets = [katexCSS];
        this.displayMode = false;
        this.throwOnError = true;

    }

    connectedCallback() {
        let settingObj = {displayMode: this.displayMode, throwOnError: this.throwOnError}
        katex.render(this.expression, this.shadow, settingObj);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "expression":
                this.expression = newValue;
                break;
            case "display-mode":
                this.displayMode = (newValue === "true");
                break;
            case "throw-on-error":
                this.throwOnError = (newValue === "true");
                break;
        }
    }
}


