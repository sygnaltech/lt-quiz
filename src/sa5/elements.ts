



/*
 * SA5 | Elements
 */

// declare const sa5: {

//     WebflowSlider: {
//         new (element: HTMLElement): WebflowSlider;
//     }

// }

declare namespace sa5 {

    class WebflowSlider {

    constructor(element: HTMLElement);

        get name(): string;
        set name(string); 

        get currentIndex(): number;
        set currentIndex(number); 

        get currentNum(): number;
        set currentNum(number); 

        goToFirst(): void; 
        goToLast(): void; 
        goToPrev(): void; 
        goToNext(): void; 

    }

}