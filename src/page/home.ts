
/*
 * Page | Home
 */

import { IRouteHandler } from "@sygnal/sse";
// import { AutoSwiper2xComponent } from "../components/auto-swiper-2x";
 

export class HomePage implements IRouteHandler {

  clinicTabs: any;


  constructor() {
  }

  setup() {
        
  }

  exec() {

    // Initialize sa5 window var
    const sa5: any = window['sa5' as any];

    // Load the tabs 
    const tabsElem: HTMLElement | null = document.querySelector<HTMLElement>("[wfu-tabs='clinic']"); 
    if(tabsElem)
      this.clinicTabs = new sa5.WebflowTabs(tabsElem);


console.log(tabsElem)

console.log(this.clinicTabs)


    // When the slide changes, reconfigure the nav 
    sa5.push(['tabChanged', 
      (tab: any, index: number) => {
        
console.log("tabchanged", tab, index)

// 0 Mexico City
// 1 Tijuana




        // switch(index + 1) {
        //   case QuizSlide.WELCOME:
        //     this.nav.showControls(false, false, false, false);
        //     break;
        //   case QuizSlide.FORM: 
        //     this.nav.showControls(true, true, true, false);
        //     break;
        //   case QuizSlide.RESULTS:
        //     this.nav.showControls(false, true, true, false);
        //     break;
        //   default:
        //     this.nav.showControls(true, true, true, true);
        //     break;
        // }
    
      }]); 

    // Create / init all AutoSwiper2x instances 
//    AutoSwiper2xComponent.initializeAll();

  }

}
