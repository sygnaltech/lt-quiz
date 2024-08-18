
/*
 * Page | Home
 */

import { IRouteHandler } from "@sygnal/sse";
import { AutoSwiper2xComponent } from "../components/auto-swiper-2x";
 

export class HomePage implements IRouteHandler {

  constructor() {
  }

  setup() {
        
  }

  exec() {

    // Create / init all AutoSwiper2x instances 
    AutoSwiper2xComponent.initializeAll();

  }

}
