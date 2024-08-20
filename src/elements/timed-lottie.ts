

import lottie, { AnimationConfigWithPath } from 'lottie-web';



/** 
 * 
 * DEPRECATED, use lottie instead 
 * It also does timing triggers & events 
 * 
 * Component | Timed Lottie 
 * Plays a Lottie at a specific time duration ( in sec )
 */

// 'https://uploads-ssl.webflow.com/66beb9a99c2f7e199cfaf719/66c19f8652127360d3a68a8d_Arrow_style02.json'

export class TimedLottieComponent {
  animation: any; // Replace `any` with the correct Lottie type if available
  durationSec: number = 4;
  onLoopComplete?: () => void;

  constructor(config: AnimationConfigWithPath<"svg">, onLoopComplete?: () => void) { 

    this.animation = lottie.loadAnimation(config);

    this.onLoopComplete = onLoopComplete;

    this.animation.addEventListener('data_ready', () => {
      // Calculate the animation duration in seconds
      var totalFrames = this.animation.totalFrames;
      var frameRate = this.animation.frameRate;
      var animationDuration = totalFrames / frameRate; // Total duration in seconds

      // Calculate the required speed to make the animation duration 4 seconds
      var requiredSpeed = animationDuration / this.durationSec;

      // Set the calculated speed
      this.animation.setSpeed(requiredSpeed);

      console.log('Animation Total Frames:', totalFrames);
      console.log('Frame Rate:', frameRate, 'fps');
      console.log('Animation Duration:', animationDuration, 'seconds');
      console.log('Setting Speed to:', requiredSpeed);
    });

    this.animation.addEventListener('loopComplete', () => {

      if (this.onLoopComplete) {
        this.onLoopComplete(); // Call the provided callback function
      }

    });

  }

}