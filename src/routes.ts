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

import { HomePage } from "./page/home";
import { RouteDispatcher } from "@sygnal/sse";
import { Site } from "./site";
import { QuizPage } from "./page/quiz";

export const routeDispatcher = (): RouteDispatcher => {
    
    var routeDispatcher = new RouteDispatcher(Site);
    routeDispatcher.routes = {

        // Site paes
        '/': HomePage,
        '/quiz': QuizPage, 
        '/quiz-section': QuizPage, 

        // TEST Pages

    };

    return routeDispatcher;
}

