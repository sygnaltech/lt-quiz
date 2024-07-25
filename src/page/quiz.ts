
/*
 * Page | Quiz
 */

// chart - https://codepen.io/memetican/pen/PorzKOW/38772a3ed4c8e3bd93e38a544c8ee0be


import { IRouteHandler } from "@sygnal/sse";
import { ElementGroupController } from "../sa5/layout";
import { QuizData } from "../models/quiz-data";
import { IPInfo } from "../ipinfo";



export class QuizPage implements IRouteHandler {

  elementGroupController: ElementGroupController;
  data: QuizData;  

  constructor() {
    this.elementGroupController = new ElementGroupController(); 

    // Create a reactive data object for page updates 
    this.data = new QuizData();
    this.data = this.createWatchedObject(this.data);
  }

  createWatchedObject(data: QuizData): QuizData {
    const handler: ProxyHandler<QuizData> = {
      set: (target, property: keyof QuizData, value: any) => {
        console.log(`Property ${String(property)} changed from ${target[property]} to ${value}`);
        (target[property] as any) = value;
        this.updateData();
        return true;
      }
    };

    return new Proxy(data, handler);
  }

  // Update all [data-item] tagged elements
  // supports text elements and form input elements 
  updateData() {
    console.log('Current data:', this.data);

    const dataElems: NodeListOf<HTMLElement> = document.querySelectorAll('[data-item]');
    dataElems.forEach(elem => {

      switch(elem.getAttribute("data-item")) {
        case "score":
          this.setElemData(elem, this.data.score.toString());
          break;
        case "percentage": case "probability":
          const probability: number | null = this.data.probability; // this.getProbability(totalScore); 
          if (probability) {
              this.setElemData(elem, probability.toString()); 
          }
          break;
        case "probability-display":
          const percentage: string | null = this.data["probability-display"];
          if (percentage) {
            this.setElemData(elem, `${percentage}%`); 
          }
          break;
        case "first-name":
          this.setElemData(elem, this.data["first-name"]); 
      }

    });

    this.elementGroupController.groups.get("result-chart")?.show(this.data.score.toString()); 

    this.elementGroupController.groups.get("result-text")?.show(this.getScoreCategory(this.data.score)); 

  }


  setup() {
        
  }

  exec() {

    (new IPInfo()).init();

    this.setupEventListeners();  
    
    this.elementGroupController.init(); 
    this.elementGroupController.groups.get("result-text")?.show("low"); 
    this.elementGroupController.groups.get("result-chart")?.show("1"); 

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

        /**
         * Install Quiz actions
         */

    // Select all elements with the custom attribute 'quiz-action'
    const elements = document.querySelectorAll('[quiz-action]');

    // Iterate over each element
    elements.forEach(element => {
        // Get the value of the 'quiz-action' attribute
        const actionValue = element.getAttribute('quiz-action');

        if (actionValue) {
            // Install a click handler on the element
            element.addEventListener('click', () => {
                // Call the action function with the value of the 'quiz-action' attribute
                this.actionFunction(actionValue);
            });
        }
    });


        /**
         * Install Quiz actions
         */

    // Select all elements with the custom attribute 'quiz-action'
    const dataItemSources = document.querySelectorAll('[data-item-source]');

    // Iterate over each element
    dataItemSources.forEach(element => {
        // Get the value of the 'quiz-action' attribute
        const actionValue = element.getAttribute('data-item-source');

        if (actionValue) {
            // Install a click handler on the element
            element.addEventListener('changed', () => {
                // Call the action function with the value of the 'quiz-action' attribute
                this.actionFunction(actionValue);
            });
        }
    });

  }


  actionFunction(actionValue: string) {
    console.log(`Action triggered with value: ${actionValue}`);
    // Add your custom action logic here

    switch(actionValue) {
      case "back":
        break;
      case "next":
        break;
      case "close":
        break;
      case "restart":
        break;
    }

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


    this.data.score = totalScore;
//    this.data.probability = this.getProbability(totalScore);

    // const dataElems: NodeListOf<HTMLElement> = document.querySelectorAll('[data-item]');
    // dataElems.forEach(elem => {

    //   switch(elem.getAttribute("data-item")) {
    //     case "score":
    //       this.setElemData(elem, totalScore.toString());
    //       break;
    //     case "percentage": case "probability":
    //       const probability: number | null = this.getProbability(totalScore); 
    //       if (probability) {
    //         this.setElemData(elem, probability.toString()); 
    //       }
    //       break;
    //     case "probability-display":
    //       const percentage: string | null = (this.getProbability(totalScore)! * 100).toFixed(2);
    //       if (percentage) {
    //         this.setElemData(elem, `${percentage}%`); 
    //       }
    //     }

    // });

    // this.elementGroupController.groups.get("result-chart")?.show(totalScore.toString()); 


    // this.elementGroupController.groups.get("result-text")?.show(this.getScoreCategory(totalScore)); 



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

  getScoreCategory(totalScore: number): string {
    if (totalScore >= 0 && totalScore <= 2) {
        return "low";
    } else if (totalScore >= 3 && totalScore <= 7) {
        return "moderate";
    } else if (totalScore >= 8) {
        return "high";
    }
    return "unknown";
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
