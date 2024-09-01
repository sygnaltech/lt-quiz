
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
import 'swiper/swiper-bundle.css';
import { TimedLottieComponent } from '../elements/timed-lottie';
import { LottieComponentController } from '../elements/lottie';


const SWIPER2X = "sse-swiper2x";
const SWIPER2X_FEATUREDIMAGE = "sse-swiper2x-image";
const SWIPER2X_SWIPER = "sse-swiper2x-swiper";
const SWIPER2X_AUTONEXTBUTTON = "sse-swiper2x-autobutton";
const SWIPER2X_LABEL = "sse-swiper2x-label";



export class AutoSwiper2xComponent {
  swiperInstance: Swiper | undefined;
  autoNextButton!: TimedLottieComponent; 
  elem: HTMLElement; 

  featuredImage!: HTMLImageElement;
  swiperElement!: HTMLElement;
  featuredImageLabel!: HTMLElement;

  constructor(elem: HTMLElement) {
    this.elem = elem; 
  }


  init() { 

    // Get the parts of the component 
    this.featuredImage = this.elem.querySelector(`[${SWIPER2X_FEATUREDIMAGE}]`) as HTMLImageElement;
    this.swiperElement = this.elem.querySelector(`[${SWIPER2X_SWIPER}]`) as HTMLElement;
    this.featuredImageLabel = this.elem.querySelector(`[${SWIPER2X_LABEL}]`) as HTMLElement;
    const autoNextButtonElement = this.elem.querySelector(`[${SWIPER2X_AUTONEXTBUTTON}]`) as HTMLElement;
    const nextButton = this.elem.querySelector(`.swiper-right-2`) as HTMLElement;
    const prevButton = this.elem.querySelector(`.swiper-left-2`) as HTMLElement;

    // console.log("prev button", prevButton)
    // console.log("next button", nextButton)

    // Create swiper 
    this.swiperInstance = new Swiper(this.swiperElement,   // '.swiper', 
      {
      slidesPerView: 6, // 10
      slidesPerGroup: 1, 
      spaceBetween: 10,
      direction: 'horizontal',
      loop: true,
      loopAdditionalSlides: 2,

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

      console.log("loop completed:", lottieInstance.name);

      switch(lottieInstance.name) {
        case "mexico-city":

          this.swiperInstance?.slideNext(); 
          this.swiperInstance?.update();
          this.updateFeaturedSlide(); 
          setTimeout(() => {
            this.swiperInstance?.update();
        }, 100); // Delay update to ensure the tab is fully visible

          break;
        case "tijuana":

          this.swiperInstance?.slideNext(); 
          this.swiperInstance?.update();
          this.updateFeaturedSlide(); 
          setTimeout(() => {
            this.swiperInstance?.update();
        }, 100); // Delay update to ensure the tab is fully visible
          break;
      }

    }
    lc.init(); 

  }

  private updateFeaturedSlide() {
    if (!this.swiperInstance) return;

    const prevIndex =
      this.swiperInstance.realIndex >= 1
        ? this.swiperInstance.realIndex - 1
        : this.swiperInstance.slides.length - 1;

//    console.log('slide changed', this.swiperInstance.realIndex, prevIndex);

    const el = this.swiperInstance.slides[prevIndex] as HTMLElement;
    const imgElement = el.querySelector('img'); // Find the image element within the slide
    const imgSrc = imgElement ? imgElement.src : null; // Get the src attribute of the image, if the image element exists

    // Find the clinic-gallery-badge div
    const badgeElement = el.querySelector('.clinic-gallery-badge > div');
    const badgeText = badgeElement ? badgeElement.textContent : null; // Get the text content inside the badge, if it exists

    if (imgSrc) { 
      this.featuredImage.src = imgSrc; 
    } 

    this.featuredImageLabel.textContent = badgeText; 

  }

} 

