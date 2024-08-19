
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


const PATIENT_JOURNEY = "sse-journey";


export class PatientsJourneyComponent {
  elem: HTMLElement; 
  accordion: any;

  featuredImage!: HTMLImageElement;
  swiperElement!: HTMLElement;

  constructor(elem: HTMLElement) {
    this.elem = elem; 
  }


  init() { 

    this.accordion = new window.sa5.Sa5Accordion(
      this.elem  // same element as patient's journey component is 
    ); 

    window.sa5 = window.sa5 || [];
    window.sa5.push(['accordionChanged', 
      (accordion: any, index: number) => {
        
//        console.log("ACCORDION CHANGED", accordion.items[index].name, accordion, index); 
    
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

    

    const lc: LottieComponentController = new LottieComponentController();
    lc.onLoopComplete = (lottieInstance) => { 

      console.log("loop completed:", lottieInstance.name);

      switch(lottieInstance.name) {
        case "1":
//          console.log("changing accordion to 2", this.accordion.name);
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

