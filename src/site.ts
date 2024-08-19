
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

  fixEmailInputs(): void {

        // Define the email pattern
        // tested - https://codepen.io/memetican/pen/MWMmwMB/f0559d10aaebffb55ac0e1ae568d66d2 

        // pattern = ^[A-Z0-9a-z._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,64}$
        const emailPattern = "^[A-Z0-9a-z._%+\\-]+@[A-Za-z0-9.\\-]+\\.[A-Za-z]{2,64}$";

        // Get all input elements
        const inputs = document.querySelectorAll('input');
    
        // Iterate through each input element
        inputs.forEach(input => {
            // Check if the input type is 'email' or the name is 'email'
            if (input.type === 'email' || input.name.toLowerCase() === 'email') {
                // Set the pattern attribute
                input.setAttribute('pattern', emailPattern); 
                input.setAttribute('type', 'email'); 
                input.setAttribute('title', 'Please enter a valid email'); 
            }
        });
  }

  exec() {

//    this.fixEmailInputs();

    // Put your site-level custom code here
    // it will have full access to the DOM 


    this.removeWebflowBadge(); 

    this.setupLocaleSwitch();
    this.updateLocaleIndicator();
  }

  updateLocaleIndicator() {
    // Select all elements with the class `lang-toggle-box`
    const elements = document.querySelectorAll<HTMLElement>('.lang-toggle-box');
    
    if (elements.length === 0) {
        console.error('No elements with class lang-toggle-box found');
        return;
    }
    
    elements.forEach(element => {
        switch(document.documentElement.lang) {
            case "en": // default 
                console.log("indicator", document.documentElement.lang);
                element.removeAttribute('style');
                break;
            case "es":
                console.log("indicator", document.documentElement.lang, element);
                element.style.display = 'flex'; // Ensure the element is a flex container
                element.style.justifyContent = 'flex-end';
                break;
        }
    });

  }

  setupLocaleSwitch() {

    const handleClick = (locale: string) => {
      console.log(`Locale switch to: ${locale}`);
//      const currentPath = window.location.pathname;

//      console.log("trigger locale switch", locale, window.location); 

      const element = document.querySelector<HTMLElement>(`[sse-locale-switch-to="${locale}"]`);
    
      if (element) {
          // Log the element to the console
          console.log('Element found:', element);
          
          // Click the element
          element.click();
      } else {
          console.error('Element with custom attribute sse-locale-switch-to="en" not found');
      }

      // switch(locale) {
      //   case "en": // default
      //     // Check if the current path starts with '/es'
      //     if (currentPath.startsWith('/es')) {
      //         const newPath = currentPath.replace('/es', '');
      //         window.location.href = newPath;
      //     }
      //     break;
      //   case "es": // default 
      //     const newPath = `/es${currentPath}`;
      //     console.log("navigating to ", newPath)
      //     window.location.href = newPath;
      //     break;
      // }

    };

    // Select all elements with the custom attribute `SSE-Locale-switch`
    const elements = document.querySelectorAll<HTMLElement>('[sse-locale-switch]');

// console.log("sse-locale", elements)

    elements.forEach(element => {
        // Get the value of the `SSE-Locale-switch` attribute
        const locale = element.getAttribute('sse-locale-switch');
        console.log("installing locale switch", locale); 
        if (locale) {
            // Install the click event handler
            element.addEventListener('click', () => handleClick(locale));
        } else {
            console.error('Element missing `sse-Locale-switch` attribute value');
        }
    });

  }

  removeWebflowBadge(delayMs: number = 1000) {

    // Select the element with the class "w-webflow-badge"
    const removeElements = () => {
      
      const elements = document.querySelectorAll('.w-webflow-badge');
      
      // Check if there are any elements
      if (elements.length > 0) {
          elements.forEach(element => {
              element.parentElement?.removeChild(element);
          });
      } else {
      }
    };

    // Delay execution by one second (1000 milliseconds)
    setTimeout(removeElements, delayMs); 

  }

}
