

import { initSSE } from '@sygnal/sse';
import lottie, { AnimationConfigWithPath, AnimationItem, AnimationDirection } from 'lottie-web';



/** 
 * Component | Lottie 
 * Plays a Lottie at a specific time duration ( in sec )
 */

// 'https://uploads-ssl.webflow.com/66beb9a99c2f7e199cfaf719/66c19f8652127360d3a68a8d_Arrow_style02.json'

const LOTTIE = "wfu-lottie";



export class LottieComponent {
  // animation: any; // Replace `any` with the correct Lottie type if available
  // durationSec: number = 4;
  // onLoopComplete?: () => void;
  elem: HTMLElement;
  src: string;
  loop: boolean;
  direction: AnimationDirection;
  autoplay: boolean;
  renderer: string;
  defaultDuration: number;
  duration: number;
  animation?: AnimationItem;
  constructor(elem: HTMLElement) { 

    this.elem = elem; 

    // Capture relevant data attributes
    this.src = this.elem.getAttribute('data-src') || '';
    this.loop = this.elem.getAttribute('data-loop') === '1';
    this.direction = parseInt(this.elem.getAttribute('data-direction') || '1', 10) as AnimationDirection;
    this.autoplay = this.elem.getAttribute('data-autoplay') === '1';
    this.renderer = this.elem.getAttribute('data-renderer') || 'svg';
    this.defaultDuration = parseFloat(this.elem.getAttribute('data-default-duration') || '0');
    this.duration = parseFloat(this.elem.getAttribute('data-duration') || '0'); 

    // Remove Webflow's data attribute to prevent it from taking over the Lottie initialization
    this.elem.removeAttribute('data-animation-type');
    this.elem.removeAttribute('data-autoplay');

    // this.animation = lottie.loadAnimation(config);
    // this.onLoopComplete = onLoopComplete;

    // this.animation.addEventListener('data_ready', () => {
    //   // Calculate the animation duration in seconds
    //   var totalFrames = this.animation.totalFrames;
    //   var frameRate = this.animation.frameRate;
    //   var animationDuration = totalFrames / frameRate; // Total duration in seconds

    //   // Calculate the required speed to make the animation duration 4 seconds
    //   var requiredSpeed = animationDuration / this.durationSec;

    //   // Set the calculated speed
    //   this.animation.setSpeed(requiredSpeed);

    //   console.log('Animation Total Frames:', totalFrames);
    //   console.log('Frame Rate:', frameRate, 'fps');
    //   console.log('Animation Duration:', animationDuration, 'seconds');
    //   console.log('Setting Speed to:', requiredSpeed);
    // });

    // this.animation.addEventListener('loopComplete', () => {

    //   if (this.onLoopComplete) {
    //     this.onLoopComplete(); // Call the provided callback function
    //   }

    // });

  }

  init() {
        // Initialize the Lottie animation manually using the captured attributes
        this.animation = lottie.loadAnimation({
          container: this.elem,
          renderer: this.renderer as 'svg' | 'canvas' | 'html',
          loop: this.loop,
          autoplay: false, // this.autoplay,
          path: this.src,
        });

    // Set the direction if specified
    this.animation.setDirection(this.direction);

    // Set duration if necessary
    if (this.duration) {
      const frameRate = this.animation.getDuration(true);
      const totalFrames = this.animation.totalFrames;
      const calculatedSpeed = (totalFrames / frameRate) / this.duration;
      this.animation.setSpeed(calculatedSpeed);
    }
this.animation.stop(); 
  }

}

export class LottieComponentController {
  lotties: Map<string, LottieComponent> = new Map(); // Lookup dictionary to store Lottie instances

  constructor() {
  }

  init() {
    const elements = document.querySelectorAll(`[${LOTTIE}]`);

    elements.forEach((element) => {
      const lottieId = element.getAttribute(LOTTIE);
      if (lottieId) {
        const lottie = new LottieComponent(element as HTMLElement);
        lottie.init();
        this.lotties.set(lottieId, lottie); // Store the Lottie instance in the dictionary

console.log("found lottie", lottieId); 

      }
    });

    window.Webflow.require("lottie").destroy();
    window.Webflow.require("lottie").init();

  }

  /**
   * Retrieve a Lottie instance by its unique identifier.
   * @param id The unique identifier of the Lottie.
   * @returns The LottieComponent instance or undefined if not found.
   */
  getLottieById(id: string): LottieComponent | undefined {
    return this.lotties.get(id);
  }

}
