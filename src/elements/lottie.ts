

import { initSSE } from '@sygnal/sse';
import lottie, { AnimationConfigWithPath, AnimationItem, AnimationDirection } from 'lottie-web';



/** 
 * Component | Lottie 
 * Plays a Lottie at a specific time duration ( in sec )
 * 
 * IMPORTANT
 * - Must uncheck Use built-in duration and set a value
 * - Looping is recommended for events 
 */

// 'https://uploads-ssl.webflow.com/66beb9a99c2f7e199cfaf719/66c19f8652127360d3a68a8d_Arrow_style02.json'

const LOTTIE = "wfu-lottie";
const LOTTIE_AUTOPLAY = "wfu-lottie-autoplay";



export class LottieComponent {
  // animation: any; // Replace `any` with the correct Lottie type if available
  // durationSec: number = 4;
  // onLoopComplete?: () => void;
  name?: string;
  elem: HTMLElement;
  src: string;
  loop: boolean;
  direction: AnimationDirection;
  _wfAutoplay: boolean;
  renderer: string;
  defaultDuration: number;
  duration: number;
  animation?: AnimationItem;
  autoplay: boolean; // New custom autoplay attribute
  onLoopComplete?: (lottieInstance: LottieComponent) => void;

  constructor(elem: HTMLElement) { 

    this.elem = elem; 

    // Remove Webflow's data attribute to prevent it from taking over the Lottie initialization
    this.elem.removeAttribute('data-animation-type');
    this.elem.removeAttribute('data-autoplay');

    // Recreate the element
    const newElem: HTMLElement = this.elem.cloneNode(false) as HTMLElement; // do not clone child nodes

    // Insert the new element before the original element
    this.elem.parentNode?.insertBefore(newElem, this.elem);

    // Remove the original element from the DOM
    this.elem.remove();

    this.elem = newElem; 


    this.name = elem.getAttribute(LOTTIE) || undefined; 

    // Capture relevant data attributes
    this.src = this.elem.getAttribute('data-src') || '';
    this.loop = this.elem.getAttribute('data-loop') === '1';
    this.direction = parseInt(this.elem.getAttribute('data-direction') || '1', 10) as AnimationDirection; 
    // This is not configuragle in Webflow settings, so we capture it but otherwise it's meaningless 
    this._wfAutoplay = this.elem.getAttribute('data-autoplay') === '1';
    this.renderer = this.elem.getAttribute('data-renderer') || 'svg';
    this.defaultDuration = parseFloat(this.elem.getAttribute('data-default-duration') || '0');
    this.duration = parseFloat(this.elem.getAttribute('data-duration') || '0'); 
    this.autoplay = this.elem.getAttribute(LOTTIE_AUTOPLAY) !== 'false'; // Capture custom autoplay attribute



    // this.animation = lottie.loadAnimation(config);
    // this.onLoopComplete = onLoopComplete;


    // this.animation.addEventListener('loopComplete', () => {

    //   if (this.onLoopComplete) {
    //     this.onLoopComplete(); // Call the provided callback function
    //   }

    // });

  }

  init() { 

        // Remove all child nodes from the element to ensure no existing Lottie content remains
        while (this.elem.firstChild) {
          this.elem.removeChild(this.elem.firstChild);
        }

        // Initialize the Lottie animation manually using the captured attributes
        // This will re-load the lottie beneath my DIV 
        this.animation = lottie.loadAnimation({
          container: this.elem,
          renderer: this.renderer as 'svg' | 'canvas' | 'html',
          loop: this.loop,
          autoplay: this.autoplay, // this.autoplay,
          path: this.src,
        });

        this.animation.addEventListener('data_ready', () => {
          // Calculate the animation duration in seconds
          var totalFrames = this.animation!.totalFrames;
          var frameRate = this.animation!.frameRate;
          var animationDuration = totalFrames / frameRate; // Total duration in seconds
    
          // Calculate the required speed to make the animation duration 4 seconds
          var requiredSpeed = animationDuration / this.duration; // sec
    
          // Set the calculated speed
          this.animation?.setSpeed(requiredSpeed);
    
          // console.log('Animation Total Frames:', totalFrames);
          // console.log('Frame Rate:', frameRate, 'fps');
          // console.log('Animation Duration:', animationDuration, 'seconds');
          // console.log('Setting Speed to:', requiredSpeed);
        });

        this.animation.addEventListener('loopComplete', () => {

          if (this.onLoopComplete) {
            this.onLoopComplete(this); // Call the provided callback function
          }
      
        });

        this.animation.addEventListener('complete', () => {
          if (this.onLoopComplete) {
            this.onLoopComplete(this); // Call the callback even if the animation doesn't loop
          }
        });

  }

  play(restart: boolean = false) {
    if(restart) {
      this.playFromFrame(1); 
    } else {
      this.animation?.play();
    }
  }

  playFromFrame(frame: number) {
    this.animation?.goToAndPlay(frame, false); 
  }

  playFromTime(ms: number) {
    this.animation?.goToAndPlay(ms, false); 
  }

  playFromMarker(marker: string) {
    this.animation?.goToAndPlay(marker); 
  }

  pause() {
    if(this.animation) {
      this.animation.pause();
    }
  }

  stop() {
    if(this.animation) {
      this.animation.stop();
    }
  }

}

export class LottieComponentController {
  lotties: Map<string, LottieComponent> = new Map(); // Lookup dictionary to store Lottie instances
  onLoopComplete?: (lottieInstance: LottieComponent) => void; 

  constructor() {
  }

  init() {
    const elements = document.querySelectorAll(`[${LOTTIE}]`);

    elements.forEach((element, onLoopComplete) => {
      const lottieId = element.getAttribute(LOTTIE);
      if (lottieId) {
        const lottie = new LottieComponent(element as HTMLElement);
        
        // Set the onLoopComplete handler
        lottie.onLoopComplete = (lottieInstance) => {
          if (this.onLoopComplete) {
            this.onLoopComplete(lottieInstance); // Trigger the controller's callback
          }
        };

        lottie.init();
        this.lotties.set(lottieId, lottie); // Store the Lottie instance in the dictionary

//console.log("found lottie", lottieId); 

      }
    });

    // window.Webflow.require("lottie").destroy();
    // window.Webflow.require("lottie").init();

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
