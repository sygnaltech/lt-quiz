
/*
 * Page | Quiz
 */

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
  const elements = document.querySelectorAll('[ip-info]');

  // Iterate over each element
  elements.forEach((element: Element) => {
      // Get the property name from the 'ip-info' attribute
      const propertyName = element.getAttribute('ip-info');
      
      // Check if the property exists in the data object
      if (propertyName && data.hasOwnProperty(propertyName)) {
          // Set the inner text of the element to the value of the corresponding property in the data object
          element.textContent = data[propertyName];
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
}

}
