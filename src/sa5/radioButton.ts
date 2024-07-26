export class WebflowRadioButton {
    private outerLabel: HTMLLabelElement;
    private inputElement: HTMLInputElement;
    private labelSpan: HTMLSpanElement;
    private radioInputDiv: HTMLDivElement;

    get checked(): boolean {
        return this.inputElement.checked;
    }
    set checked(value: boolean) {
        this.inputElement.checked = value;
        if(this.radioInputDiv) {
            if (value) {
                this.radioInputDiv.classList.add("w--redirected-checked");
            } else {
                this.radioInputDiv.classList.remove("w--redirected-checked");
            }
        }            
    }

    constructor(element: HTMLElement) {
        // Ensure the element is a label
        if (!(element instanceof HTMLLabelElement)) {
            throw new Error('Element must be a label.');
        }

        this.outerLabel = element;

        // Find the input element inside the label
        const inputElement = this.outerLabel.querySelector<HTMLInputElement>('input[type="radio"]');
        if (!inputElement) {
            throw new Error('Radio input element not found.');
        }
        this.inputElement = inputElement;

        // Find the span element inside the label
        const labelSpan = this.outerLabel.querySelector<HTMLSpanElement>('span');
        if (!labelSpan) {
            throw new Error('Label span element not found.');
        }
        this.labelSpan = labelSpan;

        // Find the div with class "w-radio-input"
        const radioInputDiv = this.outerLabel.querySelector<HTMLDivElement>('.w-radio-input');
        if (!radioInputDiv) {
            throw new Error('Radio input div element not found.');
        }
        this.radioInputDiv = radioInputDiv;
    }

    // Add any methods you need to manipulate these elements
    public toggleCheck() {
        this.inputElement.checked = !this.inputElement.checked;
    }

    public isChecked(): boolean {
        return this.inputElement.checked;
    }

    public getLabelText(): string {
        return this.labelSpan.textContent || '';
    }
}

