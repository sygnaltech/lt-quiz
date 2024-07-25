/*
 * SITE  
 * Main entry point
 * 
 * https://engine.sygnal.com/
 * 
 * ENGINE MODE
 * ?engine.mode=dev
 * ?engine.mode=prod
 * 
 */

import { VERSION } from "./version";
import { routeDispatcher } from "./routes";
import { initSSE } from "@sygnal/sse"; 
import { QuizComponent } from "./components/quiz";

interface SiteGlobalDataType {
    // Define properties and their types for SiteDataType
    // For example:
    // someProperty?: string;
    // anotherProperty?: number;
    // Add other properties as needed
}

// Global vars
const SITE_NAME = 'Site';

// // Global object
// window[SITE_NAME] = window[SITE_NAME] || {}; 
// var SiteData = window[SITE_NAME];

// Extend the Window interface to include globals
// as a Typescript accessibility convenience
declare global {
    interface Window {

        // fsAttributes
        fsAttributes: [string, (filterInstances: any[]) => void][];

        // Site global data
        Site: SiteGlobalDataType;

    }
}

// Init SSE Engine
initSSE();

// Perform setup, sync
const setup = () => {
    
    console.log(`${SITE_NAME} package init v${VERSION}`);
    
    routeDispatcher().setupRoute(); 

}

// Perform exec, async
// After DOM content loaded 
const exec = () => {
    
    routeDispatcher().execRoute(); 

    // Components
    const components = document.querySelectorAll('[sse-component]');
    components.forEach(element => {
        // Get the value of the SSE-component attribute
        const componentValue = element.getAttribute('sse-component');
        
        if (componentValue) {
            // Run a switch statement based on the attribute value
            switch (componentValue) {
                case 'quiz':

                    (new QuizComponent()).exec();

                    break;
                default:
                    console.log('Unknown component:', componentValue);
                    break;
            }
        }
    });    

}

/**
 * Initialize
 */

// Perform setup, sync
setup();

// Perform exec, async
if (document.readyState !== 'loading') {
    exec();
} else {
    document.addEventListener("DOMContentLoaded", exec);
}