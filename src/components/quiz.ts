
/*
 * Component | Quiz
 */

// chart - https://codepen.io/memetican/pen/PorzKOW/38772a3ed4c8e3bd93e38a544c8ee0be
// download chart image - https://codepen.io/memetican/pen/PorzKOW/38772a3ed4c8e3bd93e38a544c8ee0be

import { IRouteHandler } from "@sygnal/sse";
import { ElementGroupController } from "../sa5/layout";
import { QuizData } from "../models/quiz-data";
import { IPInfo } from "../ipinfo";
import html2canvas from 'html2canvas';
import { WebflowRadioButton } from "../sa5/radioButton";

// [wfu-element] results      

// data-item = name
// will be set
// works on text elements or input elements 

// [quiz-action]
// download-result 

enum QuizSlide {
  WELCOME = 1,
  QUIZ = 2,
  FORM = 9,
  RESULTS = 10, 
}

export class QuizComponent implements IRouteHandler {

  elementGroupController: ElementGroupController;
  data: QuizData;  
  slider: any;

  constructor() {
    this.elementGroupController = new ElementGroupController(); 

    // Create a reactive data object for page updates 
    this.data = QuizData.createWatchedObject((data, property, value) => {
      console.log(`Property ${String(property)} changed to ${value}`);
      this.updateDisplayData();
    });

  }


  // Update all [data-item] tagged elements
  // supports text elements and form input elements 
  updateDisplayData() {
    console.log('Current data:', this.data);

    const dataElems: NodeListOf<HTMLElement> = document.querySelectorAll('[data-item]');
    dataElems.forEach(elem => {

      switch(elem.getAttribute("data-item")) {
        case "score":
          this.setElemData(elem, this.data.score.toString());
          break;
        case "percentage": case "probability":
          const probability: number | null = this.data.probability;
          if (probability) {
              this.setElemData(elem, probability.toString()); 
          }
          break;
        case "probability-display":
          const percentage: string | null = this.data["probability-display"];
          if (percentage) {
            this.setElemData(elem, percentage); 
          }
          break;
        case "first-name":
          this.setElemData(elem, this.data["first-name"]); 
      }

    });

    this.elementGroupController.groups.get("result-chart")?.show(this.data.score.toString()); 
    this.elementGroupController.groups.get("result-text")?.show(this.data["score-category"]); 

  }

  setup() {
        
  }

  exec() {

    // Initialize sa5 window var
    const sa5: any = window['sa5' as any];

    // Fetch and load IPInfo 
    (new IPInfo()).init();

    // Load the slider 
    const sliderElem: HTMLElement | null = document.querySelector<HTMLElement>("[wfu-slider='quiz']"); 
    console.log("slider", sliderElem)
    if(sliderElem)
      this.slider = new sa5.WebflowSlider(sliderElem);

      this.setupEventListeners();  
      
      this.elementGroupController.init(); 
      this.elementGroupController.groups.get("result-text")?.show("low"); 
      this.elementGroupController.groups.get("result-chart")?.show("1"); 

      // sa5.push(['slideNextRequest', 
      //   (slider: any, index: any) => {
      //     console.log("SLIDE NEXT REQUEST", slider.name, slider, index); 

      //     // Example usage:
      //     // This will fetch the 3rd slide from the slider with the custom attribute 'wfu-slider="quiz"'
      //     const slide = this.getSlideByPosition(index + 1);
      //     if (slide) {
      //         console.log('Slide found:', slide);

      //       return this.checkRadioSelection(slide); 

      //     } else {
      //         console.log('Slide not found.');
      //     }

      //     return (index < 6); 
      //   }]); 
      // sa5.push(['slidePrevRequest', 
      //   (slider: any, index: any) => {
      //     console.log("SLIDE PREV REQUEST", slider.name, slider, index); 
      //     return (index > 0); 
      //   }]); 

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
       * Install Data item source monitors
       */

      // Select all elements with the custom attribute 'quiz-action'
      const dataItemSources = document.querySelectorAll('[data-item-source]');

      // Iterate over each element
      dataItemSources.forEach(elem => {
        // Get the value of the 'quiz-action' attribute
        const actionValue = elem.getAttribute('data-item-source');
        if (actionValue) {

          switch(elem.tagName.toLowerCase()) {
            case "input":
      
              const inputElem: HTMLInputElement = elem as HTMLInputElement; 

              // Install an input-changed handler on the element
              elem.addEventListener('input', () => {

                // Update our reactive quiz data object if a matching property exists
                const av: keyof QuizData = actionValue as keyof QuizData; 
                if(av in this.data)
                  this.updateProperty(av, inputElem.value); 

              });            
      
              break;
            default: 
 
              console.error ("data-item-source is only supported on input elements.")
      
              break;
          }


        }
    });

  }

  // For updating quiz data properties
  // using a string name 
  // [quiz-action]
  updateProperty<K extends keyof QuizData>(property: K, value: QuizData[K]) {
    this.data.setProperty(property, value);
  }

  actionFunction(actionValue: string) {
    console.log(`Action triggered with value: ${actionValue}`);
    // Add your custom action logic here

    switch(actionValue) {
      case "back":
        if (this.slider.currentIndex > 0) 
          this.slider.goToPrev();
        break;
      case "next":

//      this.slider.currentIndex

          const slide = this.getSlideByPosition(this.slider.currentIndex + 1);
          if (slide) {
              console.log('Slide found:', slide);

            if (this.isRadioButtonSelectedInContainer(slide)) 
              this.slider.goToNext();

          } else {
              console.log('Slide not found.');
          }

        break;
      case "close":
        this.resetQuiz();
        this.slider.currentNum = QuizSlide.WELCOME;
         
        break;
      case "restart":
        this.resetQuiz();
        this.slider.currentNum = QuizSlide.QUIZ;

        break;
      case "download-result": 
        this.downloadResult(); 

        break; 
      case "submit-form":
        // wfu-form = quiz 
        this.formSubmitClicked(); 
    }

  }

  formSubmitClicked() {
    const form = document.querySelector<HTMLFormElement>('[wfu-form=quiz] > form');
    
    if (form) {

            // Check if the form is valid
            if (form.checkValidity()) {
                console.log('Form is valid');
                // Optionally, you can submit the form or handle form data here
                this.slider.currentNum = QuizSlide.RESULTS; 
  //              form.submit();  // or handle the form data manually
            } else {
                console.log('Form is not valid');
                // Optionally, display validation feedback
//                form.reportValidity();  // This will trigger the browser's built-in validation feedback
            }
    } else {
        console.error('Form not found');
    }
  }

  downloadResult() {
    // Locate the element with the custom attribute wfu-element="results"
    const element = document.querySelector<HTMLElement>('[wfu-element="results"]');
    
    if (!element) {
        console.error('Element with wfu-element="results" not found');
        return;
    }

    // Use html2canvas to capture the element and download as PNG
    html2canvas(element, {
      useCORS: true,
    }).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'results.png';
        link.click();
    }).catch(error => {
        console.error('Failed to capture element as PNG:', error);
    });

  }

  resetQuiz() {
//    const radios = document.querySelectorAll<HTMLInputElement>('input[type="radio"]');
    const labels = document.querySelectorAll<HTMLLabelElement>('label.w-radio');

    console.log("this.resetQuiz", labels.length);

    // Clear all radio buttons
    for (let i = 0; i < labels.length; i++) {


    const radioButton = new WebflowRadioButton(labels[i]);
//    radioButton.toggleCheck();

      radioButton.checked = false;
    }

    // Change slide to position 1
    this.slider.currentNum = QuizSlide.QUIZ;

  }

  isRadioButtonSelectedInContainer(container: HTMLElement): boolean {
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

  }

  // getScoreCategory(totalScore: number): string {
  //   if (totalScore >= 0 && totalScore <= 2) {
  //       return "low";
  //   } else if (totalScore >= 3 && totalScore <= 7) {
  //       return "moderate";
  //   } else if (totalScore >= 8) {
  //       return "high";
  //   }
  //   return "unknown";
  // }



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
