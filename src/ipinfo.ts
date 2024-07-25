


export class IPInfo {

    constructor() {
    } 
    
    async init() {
        const url = `https://ipinfo.io?token=44b4a5206a1bb2`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            this.applyIPInfoData(data);

        } catch (error) {
            console.error('Failed to fetch IP info:', error);
        }
    }

    applyIPInfoData(data: any) {
        // Find all elements with the 'ip-info' attribute
        const elements = document.querySelectorAll<HTMLElement>('[ip-info]');

        // Iterate over each element
        elements.forEach((element: HTMLElement) => {
            // Get the property name from the 'ip-info' attribute
            const propertyName = element.getAttribute('ip-info');
            
            // Check if the property exists in the data object
            if (propertyName && data.hasOwnProperty(propertyName)) {
                // Set the inner text of the element to the value of the corresponding property in the data object
        //          element.textContent = data[propertyName];

                this.setElemData(element, data[propertyName]); 

            } else {
                console.log(`Property '${propertyName}' not found in data`);
            }
        });
    }

    setElemData(elem: HTMLElement, value: string): void {

        switch(elem.tagName.toLowerCase()) {
            case "input":

                const inputElem: HTMLInputElement = elem as HTMLInputElement; 
                inputElem.value = value;

                break;
            default: 

                elem.innerText = value; 

                break;
        }

    }

}