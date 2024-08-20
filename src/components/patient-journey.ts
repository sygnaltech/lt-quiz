
/** 
 * Component | Patient Journey
 * Accordion with timed lottie animations
 * Uses a lottie as a countdown trigger 
 * 
 * - Component
 * - Accordion
 * - Accordion Items (3)
 * - Lotties (3)
 */


import { initSSE } from '@sygnal/sse';
import { LottieComponentController } from "../elements/lottie";




export class PatientsJourneyComponent {
  elem: HTMLElement; 
  accordion: any;

  featuredImage!: HTMLImageElement;
  swiperElement!: HTMLElement;

  constructor(elem: HTMLElement) {
    this.elem = elem; 
  }


  init() { 

    // Create the SA5 Accordion element
    // this is the same element as the patient's journey component
    this.accordion = new window.sa5.Sa5Accordion(
      this.elem  
    ); 

    // Setup the Accordion-changed event
    window.sa5 = window.sa5 || [];
    window.sa5.push(['accordionChanged', 
      (accordion: any, index: number) => {
    
        switch(accordion.items[index].name) {
          case "item1": 
            lc.lotties.get("1")?.play(); 
            lc.lotties.get("2")?.stop(); 
            lc.lotties.get("3")?.stop(); 
            break;
          case "item2": 
            lc.lotties.get("1")?.stop(); 
            lc.lotties.get("2")?.play(); 
            lc.lotties.get("3")?.stop(); 
            break;
          case "item3": 
            lc.lotties.get("1")?.stop(); 
            lc.lotties.get("2")?.stop(); 
            lc.lotties.get("3")?.play(); 
            break;
        }
    
      }]); 
    
    // Setup the Lottie controller
    // register a loopComplete event 
    const lc: LottieComponentController = new LottieComponentController();
    lc.onLoopComplete = (lottieInstance) => { 

      console.log("loop completed:", lottieInstance.name);

      switch(lottieInstance.name) {
        case "1":
          this.accordion.currentNum = 2; 
          break;
        case "2":
          this.accordion.currentNum = 3; 
          break;
        case "3":
          // do nothing
          break;
      }

    }
    lc.init(); 

  }

} 

