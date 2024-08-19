
/** 
 * Component | Swiper Auto 2x
 * First slide is large, swiper is automatic
 * Uses a lottie as a countdown trigger 
 * 
 * - Component - [sse-swiper2x]
 * - FeaturedSlide - 2x Image contains slide 1 [sse-swiper2x-image] 
 * - Swiper [sse-swiper2x-swiper]
 * - AutoNextButton [sse-swiper2x-autobutton]
 */


import { initSSE } from '@sygnal/sse';
import { LottieComponentController } from "../elements/lottie";
//import Swiper from 'swiper';
//import 'swiper/swiper-bundle.css';
//import { TimedLottieComponent } from './timed-lottie';


const PATIENT_JOURNEY = "sse-journey";


export class PatientsJourneyComponent {
  // swiperInstance: Swiper | undefined;
  // autoNextButton!: TimedLottieComponent; 
  elem: HTMLElement; 
  accordion: any;

  featuredImage!: HTMLImageElement;
  swiperElement!: HTMLElement;

  constructor(elem: HTMLElement) {
    this.elem = elem; 
  }


  init() { 

// console.log("creaing accordion", )

    this.accordion = new window.sa5.Sa5Accordion(
      this.elem  // same element as patient's journey component is 
    ); 

    window.sa5 = window.sa5 || [];
    window.sa5.push(['accordionChanged', 
      (accordion: any, index: number) => {
        
        console.log("ACCORDION CHANGED", accordion.items[index].name, accordion, index); 
    
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
          // Slide to 2
          //
//          lc.lotties.get("2")?.play(); 
          console.log("changing accordion to 2", this.accordion.name);
          this.accordion.currentNum = 2; 
          break;
        case "2":
//          lc.lotties.get("3")?.play(); 
          this.accordion.currentNum = 3; 
          break;
        case "3":
          // do nothing
          break;
      }

    }
    lc.init(); 

  }

  
  // static initializeAll() {
  //   const elements = document.querySelectorAll(`[${SWIPER2X}]`);

  //   elements.forEach((element) => {
  //     const swiperComponent = new AutoSwiper2xComponent(element as HTMLElement);
  //     swiperComponent.init();
  //   });
  // }

} 

