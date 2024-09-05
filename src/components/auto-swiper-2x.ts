
/** 
 * Component | Swiper Auto 2x
 * First slide is large, swiper is automatic
 * Uses a lottie as a countdown trigger 
 * 
 * - Component - [sse-swiper2x]
 * - FeaturedSlide - 2x Image contains slide 1 [sse-swiper2x-image] 
 * - FeaturedSlideLabel [sse-swiper2x-label]  
 * - Swiper [sse-swiper2x-swiper]  
 * - AutoNextButton [sse-swiper2x-autobutton]
 */


import { initSSE } from '@sygnal/sse';
import Swiper from 'swiper';
//import { Autoplay } from 'swiper';
// import Autoplay from 'swiper/modules/autoplay';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import 'swiper/modules/autoplay';
// import 'swiper/swiper-bundle.css';
import { TimedLottieComponent } from '../elements/timed-lottie';
import { LottieComponentController } from '../elements/lottie';


const COMPONENT_NAME = "sse-component-name"; 

const SWIPER2X = "sse-swiper2x";
const SWIPER2X_FEATUREDIMAGE = "sse-swiper2x-featured-image";
const SWIPER2X_FEATUREDIMAGE_LABEL = "sse-swiper2x-featured-label";
const SWIPER2X_SWIPER = "sse-swiper2x-swiper";
// const SWIPER2X_AUTONEXTBUTTON = "sse-swiper2x-autobutton";
const SWIPER2X_LABEL = "sse-swiper2x-label";



export class AutoSwiper2xComponent {
  swiperInstance: Swiper | undefined;
  autoNextButton!: TimedLottieComponent; 
  elem: HTMLElement; 
  name: string = "";

  featuredImage!: HTMLImageElement;
  swiperElement!: HTMLElement;
  featuredImageLabel!: HTMLElement;

  constructor(elem: HTMLElement) {
    this.elem = elem; 

    if(this.elem.hasAttribute(COMPONENT_NAME))
      this.name = this.elem.getAttribute(COMPONENT_NAME) || "";
  }


  init() { 
// sse-component-name
    // Get the parts of the component 
    this.featuredImage = this.elem.querySelector(`[${SWIPER2X_FEATUREDIMAGE}]`) as HTMLImageElement;
    if(!this.featuredImage) {
      console.error("Unable to locate featured image")
    }
    this.featuredImageLabel = this.elem.querySelector(`[${SWIPER2X_FEATUREDIMAGE_LABEL}]`) as HTMLElement;
    if(!this.featuredImage) {
      console.error("Unable to locate featured image label")
    }
    this.swiperElement = this.elem.querySelector(`[${SWIPER2X_SWIPER}]`) as HTMLElement;
    if(!this.featuredImage) {
      console.error("Unable to locate 2x swiper")
    }
    // const autoNextButtonElement = this.elem.querySelector(`[${SWIPER2X_AUTONEXTBUTTON}]`) as HTMLElement;
    const nextButton = this.elem.querySelector(`.swiper-right-2`) as HTMLElement;
    const prevButton = this.elem.querySelector(`.swiper-left-2`) as HTMLElement;

    // console.log("prev button", prevButton)
    // console.log("next button", nextButton)


// sse-swiper2x-mobile=mexico-city
// sse-swiper2x-mobile=tijuana


// // Find all elements with the custom attribute `ssc-swiper2x-mobile`
// const mobileSwiperElements = document.querySelectorAll<HTMLElement>(`[sse-swiper2x-mobile]`);

//  console.log(mobileSwiperElements);

// // Iterate through each element and initialize Swiper
// mobileSwiperElements.forEach((elem) => {

// console.log(elem);

//   new Swiper(elem, { 
// //    modules: [ Autoplay ], 
//     spaceBetween: 10,
//     direction: 'horizontal',
//     loop: true,
//     loopAdditionalSlides: 2,
//     width: 120,
//     autoplay: {
//       delay: 4000, // 4000ms = 4 seconds
// //      disableOnInteraction: false, // Optional: keeps autoplay running even after user interaction
//     },
//   }).init();
// });


    // Create swiper 
    this.swiperInstance = new Swiper(this.swiperElement,   // '.swiper', 
      {
//      slidesPerView: 'auto', // 10
//      slidesPerGroup: 1, 
      spaceBetween: 10,
      direction: 'horizontal',
      loop: true,
      loopAdditionalSlides: 2,
      width: 200, 

      breakpoints: {
        // when window width is >= 480px (Webflow medium screens)
        480: {
          width: 220, 
        },
        // when window width is >= 768px (Webflow tablet screens)
        768: {
          width: 240, 
        },
        // when window width is >= 992px (Webflow desktop screens)
        992: {
          width: 260, 
        },
      }
      // Navigation arrows
      // navigation: {
      //   nextEl: nextButton, // '.swiper-right-2',
      //   prevEl: prevButton, // '.swiper-left-2',
      // },
    });

    // Attach event listener for slide change
    this.swiperInstance.on('slideChange', () => {
      this.updateFeaturedSlide();
    });

    if (nextButton) {
      nextButton.addEventListener('click', () => {
          this.swiperInstance?.slideNext(); // Move to the next slide
      });
  }
  
  if (prevButton) {
      prevButton.addEventListener('click', () => {
          this.swiperInstance?.slidePrev(); // Move to the previous slide
      });
  }
    // Setup the Lottie controller
    // register a loopComplete event 
    const lc: LottieComponentController = new LottieComponentController();
    lc.onLoopComplete = (lottieInstance) => { 

//      console.log("loop completed:", lottieInstance.name);

      // can be mexico-city or tijuana

      if(lottieInstance.name == this.name) { 

          this.swiperInstance?.slideNext(); 
          this.swiperInstance?.update();
          this.updateFeaturedSlide(); 
          setTimeout(() => {
            this.swiperInstance?.update();
          }, 100); // Delay update to ensure the tab is fully visible

      }

//       switch(lottieInstance.name) {
//         case "mexico-city":

// //          this.swiperInstance?.slideNext(); 
// //          this.swiperInstance?.update();
//           this.updateFeaturedSlide(); 
//           setTimeout(() => {
//             this.swiperInstance?.update();
//         }, 100); // Delay update to ensure the tab is fully visible

//           break;
//         case "tijuana":


//           this.swiperInstance?.slideNext(); 
//           this.swiperInstance?.update();
//           this.updateFeaturedSlide(); 
//           setTimeout(() => {
//             this.swiperInstance?.update();
//         }, 100); // Delay update to ensure the tab is fully visible
//           break;
//       }

    }
    lc.init(); 

  }

  private updateFeaturedSlide() {
    if (!this.swiperInstance) return;

    const prevIndex = this.swiperInstance.realIndex >= 1
        ? this.swiperInstance.realIndex - 1
        : this.swiperInstance.slides.length - 1;

    // Get the previous image from the slider
    // Important, the slides change position, however they have the logical index
    // stored in an attribute
    const wrapperEl = this.swiperInstance.wrapperEl;
    const el = wrapperEl.querySelector(`[data-swiper-slide-index="${prevIndex}"]`) as HTMLElement;
    const imgElement = el.querySelector('img'); // Find the image element within the slide
    const imgSrc = imgElement ? imgElement.src : null; // Get the src attribute of the image, if the image element exists

    // Get the clinic-gallery-badge text
    const badgeElement = el.querySelector(`[${SWIPER2X_LABEL}]`);
    const badgeText = badgeElement ? badgeElement.textContent : null; // Get the text content inside the badge, if it exists

    // Set the image + text on the featured item 
    if (imgSrc) { 
      this.featuredImage.src = imgSrc; 
      this.featuredImageLabel.textContent = badgeText; 
    } 

  }

} 

