



/*
 * SA5 | Layout
 */


export class ElementGroupController {

    groups: Map<string, ElementGroup>;

    constructor() {
        this.groups = new Map<string, ElementGroup>();
    }
  
    init() {
        const elements = document.querySelectorAll<HTMLElement>('[wfu-element-group]');
        elements.forEach(element => {
            const groupName = element.getAttribute('wfu-element-group');
            if (groupName) {
                if (!this.groups.has(groupName)) {
                    const group = new ElementGroup(groupName);
                    this.groups.set(groupName, group);
                }
                this.groups.get(groupName)?.addElement(element);
            }
        });
    }
   
  
  }
  

export class ElementGroup {
    name: string;
    elements: ElementGroupElement[];

    constructor(name: string) {
        this.name = name;
        this.elements = [];
    }

    addElement(element: HTMLElement) {
        const elementGroupElement = new ElementGroupElement(element);
        this.elements.push(elementGroupElement);
    }

    init() {
        // Initialize the elements in the group
    }


    hideAll() {
        this.elements.forEach(element => element.hide());
    }

    showAll() {
        this.elements.forEach(element => element.show());
    }

    show(name: string) {
        this.elements.forEach(element => {
            if (element.element.getAttribute('wfu-element-name') === name) {
                element.show();
            } else {
                element.hide();
            }
        });
    }

}


export class ElementGroupElement {

    element: HTMLElement;
    constructor(element: HTMLElement) {
        this.element = element;
    } 

    hide() {
        this.element.style.display = 'none';
    }

    show() {
        this.element.style.display = 'block'; // HACK: 
    }

    init() {
        // Initialize the element if needed
    }

}
