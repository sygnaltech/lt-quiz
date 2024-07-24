
/*
 * Page | Quiz
 */

// chart - https://codepen.io/memetican/pen/PorzKOW/38772a3ed4c8e3bd93e38a544c8ee0be


import { IRouteHandler } from "@sygnal/sse";



export class QuizPage implements IRouteHandler {

  constructor() {
  }

  setup() {
        
  }

  exec() {

    this.fetchIPInfo();
    this.setupEventListeners();  
    
    // const ipinfoWrapper = new IPinfoWrapper("37cce46c605631"); // Sygnal's HACK

    // ipinfoWrapper.lookupIp("1.1.1.1").then((response: IPinfo) => {
    //     console.log(response);
    // });
  
    const sa5: any = window['sa5' as any];
    sa5.push(['slideNextRequest', 
      (slider: any, index: any) => {
        console.log("SLIDE NEXT REQUEST", slider.name, slider, index); 

        // Example usage:
        // This will fetch the 3rd slide from the slider with the custom attribute 'wfu-slider="quiz"'
        const slide = this.getSlideByPosition(index + 1);
        if (slide) {
            console.log('Slide found:', slide);

          return this.checkRadioSelection(slide); 

        } else {
            console.log('Slide not found.');
        }

        return (index < 6); 
//        return false;
        }]); 
    sa5.push(['slidePrevRequest', 
      (slider: any, index: any) => {
        console.log("SLIDE PREV REQUEST", slider.name, slider, index); 
        return (index > 0); 
        }]); 


  }

  checkRadioSelection(container: HTMLElement): boolean {
    // Find all radio input elements within the given container
    const radios = container.querySelectorAll<HTMLInputElement>('input[type="radio"]');

    // Check if any radio button is selected
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return true; // Return true if any radio is selected
        }
    }

    return false; // Return false if no radios are selected
}



  getSlideByPosition(position: number): HTMLElement | null {
    // Locate the element with the custom attribute wfu-slider="quiz"
    const slider = document.querySelector(`[wfu-slider=quiz]`);

    if (!slider) {
        console.error("Slider not found.");
        return null;
    }

    // Locate all the elements with the class 'w-slide' within the slider
    const slides = slider.querySelectorAll(`.w-slide`);

    // Retrieve the slide by its position (1-based index)
    if (position < 1 || position > slides.length) {
        console.error("Slide position out of range.");
        return null;
    }

    // Return the specified slide, adjusting for zero-based index
    return slides[position - 1] as HTMLElement;
}


  async fetchIPInfo() {
    const url = `https://ipinfo.io?token=37cce46c605631`;

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


  private setupEventListeners(): void {
    // Get all radio input elements
    const radios: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="radio"]');
    
    // Add an event listener to each radio button
    radios.forEach(radio => {
        radio.addEventListener('change', () => this.calculateTotalScore());
    });
  }

  private calculateTotalScore(): void {
    // Get all checked radio input elements
    const checkedRadios: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="radio"]:checked');
    let totalScore: number = 0;
    console.log("clicked");

    // Sum the values of the checked radio inputs
    checkedRadios.forEach(radio => {
        // Ensure the value is a number before adding it to totalScore
        totalScore += Number(radio.value);
    });

    // Display the total score - Update or modify based on where you want to display
    const scoreDisplay: HTMLElement | null = document.getElementById('scoreDisplay');
    if (scoreDisplay) {
        scoreDisplay.textContent = `Total Score: ${totalScore}`;
    }

    const dataElems: NodeListOf<HTMLElement> = document.querySelectorAll('[data-item]');
    dataElems.forEach(elem => {

      switch(elem.getAttribute("data-item")) {
        case "score":
          this.setElemData(elem, totalScore.toString());
          break;
        case "percentage": 
          const percentage: number | null = this.getPercentage(totalScore); 
          if (percentage) {
            this.setElemData(elem, percentage.toString()); 
          }
          break;
      }

    });


    // const scoreElems: NodeListOf<HTMLElement> = document.querySelectorAll('[data-item="percentage"]');
    // scoreElems.forEach(elem => {
    //   elem.innerText = totalScore.toString(); 
    // });


      // // Set score hidden inputin quiz form
      // const formInputScore: HTMLInputElement = document.querySelectorAll<HTMLInputElement>('input[name="Score"]')[0];
      // if (formInputScore) {
      //     formInputScore.value = totalScore.toString();
      // }

  }

  private getPercentage(index: number): number | null {
    const dataPoints: number[] = [0, 4.12, 6.10, 8.95, 12.95, 18.39, 25.42, 33.99, 43.76, 54.21, 64.25, 73.20, 80.57, 86.26, 90.44, 93.39];

    // Check if the provided index is within the valid range
    if (index < 0 || index >= dataPoints.length) {
        console.error("Index out of range. Please provide an index between 0 and 15.");
        return null; // Return null or throw an error if the index is out of range
    }

    return dataPoints[index]; // Return the percentage value at the specified index
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
