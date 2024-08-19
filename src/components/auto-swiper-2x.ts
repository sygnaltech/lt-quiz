
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
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import { TimedLottieComponent } from './timed-lottie';


const SWIPER2X = "sse-swiper2x";
const SWIPER2X_FEATUREDIMAGE = "sse-swiper2x-image";
const SWIPER2X_SWIPER = "sse-swiper2x-swiper";
const SWIPER2X_AUTONEXTBUTTON = "sse-swiper2x-autobutton";
const SWIPER2X_AUTONEXTBUTTON_SRC = "sse-swiper2x-autobutton-src";


export class AutoSwiper2xComponent {
  swiperInstance: Swiper | undefined;
  autoNextButton!: TimedLottieComponent; 
  elem: HTMLElement; 

  featuredImage!: HTMLImageElement;
  swiperElement!: HTMLElement;

  constructor(elem: HTMLElement) {
    this.elem = elem; 
  }


  init() { 

    this.featuredImage = this.elem.querySelector(`[${SWIPER2X_FEATUREDIMAGE}]`) as HTMLImageElement;
    this.swiperElement = this.elem.querySelector(`[${SWIPER2X_SWIPER}]`) as HTMLElement;
    const autoNextButtonElement = this.elem.querySelector(`[${SWIPER2X_AUTONEXTBUTTON}]`) as HTMLElement;

    // Create swiper 
    this.swiperInstance = new Swiper(this.swiperElement,   // '.swiper', 
      {
      slidesPerView: 10,
      spaceBetween: 10,
      direction: 'horizontal',
      loop: true,
      loopAdditionalSlides: 2,

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-right-2',
        prevEl: '.swiper-left-2',
      },
    });

    // Attach event listener for slide change
    this.swiperInstance.on('slideChange', () => {
      this.updateFeaturedSlide();
    });

    // Pull URL from element
    this.autoNextButton = new TimedLottieComponent(      {
      container: autoNextButtonElement, // the DOM element
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: autoNextButtonElement.getAttribute(SWIPER2X_AUTONEXTBUTTON_SRC) || undefined // the path to the Lottie file
    },
    () => {
//      console.log('The Lottie animation loop is complete!'); 
      this.swiperInstance?.slideNext(); 
      this.updateFeaturedSlide(); 
      // Perform any action needed when the loop is complete
    }
  
  );
  this.autoNextButton.durationSec = 4; // sec 



  }

  private updateFeaturedSlide() {
    if (!this.swiperInstance) return;

    const prevIndex =
      this.swiperInstance.realIndex >= 1
        ? this.swiperInstance.realIndex - 1
        : this.swiperInstance.slides.length - 1;

    console.log('slide changed', this.swiperInstance.realIndex, prevIndex);

    const el = this.swiperInstance.slides[prevIndex] as HTMLElement;
    const imgElement = el.querySelector('img'); // Find the image element within the slide
    const imgSrc = imgElement ? imgElement.src : null; // Get the src attribute of the image, if the image element exists

    if (imgSrc) { 

this.featuredImage.src = imgSrc; 

console.log(`set img - ${imgSrc}`)

      // Select all images with the class 'clinic-featured-slide-index'
//      const targetImages = document.querySelectorAll<HTMLImageElement>('img.clinic-featured-slide-index');

      // Set the src attribute of each selected image to the retrieved imgSrc
//      targetImages.forEach((targetImg) => {
        // const newImg = new Image();
        // newImg.src = imgSrc;

        // this.featuredImage.style.opacity = '0';

        // // Once the image is loaded, set it as the src and trigger the fade-in
        // newImg.onload = () => {
        //   this.featuredImage.src = imgSrc;

        //   // Use a short timeout to ensure the image is set before the fade-in begins
        //   setTimeout(() => {
        //     this.featuredImage.style.opacity = '1'; // Trigger the CSS transition
        //     this.featuredImage.removeAttribute('style');
        //   }, 50); // Slight delay to allow the reflow to occur
        // };
//      });
    } 

  }

  static initializeAll() {
    const elements = document.querySelectorAll(`[${SWIPER2X}]`);

    elements.forEach((element) => {
      const swiperComponent = new AutoSwiper2xComponent(element as HTMLElement);
      swiperComponent.init();
    });
  }

} 

