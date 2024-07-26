"use strict";
(() => {
  // src/sa5/radioButton.ts
  var WebflowRadioButton = class {
    get checked() {
      return this.inputElement.checked;
    }
    set checked(value) {
      this.inputElement.checked = value;
      if (this.radioInputDiv) {
        if (value) {
          this.radioInputDiv.classList.add("w--redirected-checked");
        } else {
          this.radioInputDiv.classList.remove("w--redirected-checked");
        }
      }
    }
    constructor(element) {
      if (!(element instanceof HTMLLabelElement)) {
        throw new Error("Element must be a label.");
      }
      this.outerLabel = element;
      const inputElement = this.outerLabel.querySelector('input[type="radio"]');
      if (!inputElement) {
        throw new Error("Radio input element not found.");
      }
      this.inputElement = inputElement;
      const labelSpan = this.outerLabel.querySelector("span");
      if (!labelSpan) {
        throw new Error("Label span element not found.");
      }
      this.labelSpan = labelSpan;
      const radioInputDiv = this.outerLabel.querySelector(".w-radio-input");
      if (!radioInputDiv) {
        throw new Error("Radio input div element not found.");
      }
      this.radioInputDiv = radioInputDiv;
    }
    toggleCheck() {
      this.inputElement.checked = !this.inputElement.checked;
    }
    isChecked() {
      return this.inputElement.checked;
    }
    getLabelText() {
      return this.labelSpan.textContent || "";
    }
  };
})();
//# sourceMappingURL=radioButton.js.map
