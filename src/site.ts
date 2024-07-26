
/*
 * Site
 */

import { IRouteHandler, Page } from "@sygnal/sse";

// import gsap from 'gsap'; 
 

export class Site implements IRouteHandler {

  constructor() {
  }

  setup() {

    Page.loadEngineCSS("site.css"); 
   
  }

  exec() {

    // Put your site-level custom code here
    // it will have full access to the DOM 

    this.removeWebflowBadge(); 

  }

  removeWebflowBadge(delayMs: number = 1000) {

    // Select the element with the class "W-webflow-badge"
    const removeElements = () => {
      // Select all elements with the class "w-webflow-badge"
      const elements = document.querySelectorAll('.w-webflow-badge');
      
      // Check if there are any elements
      if (elements.length > 0) {
          elements.forEach(element => {
              element.parentElement?.removeChild(element);
          });
          console.log('Elements with class "w-webflow-badge" have been removed.');
      } else {
          console.log('No elements with class "w-webflow-badge" found.');
      }
    };

    // Delay execution by one second (1000 milliseconds)
    setTimeout(removeElements, delayMs); 

  }

}
