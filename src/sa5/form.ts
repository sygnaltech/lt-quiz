



/*
 * SA5 | Forms
 */

// declare const sa5: {

//     WebflowSlider: {
//         new (element: HTMLElement): WebflowSlider;
//     }

// }

declare namespace sa5 {

    enum WebflowFormMode {
        Active,
        Success,
        Error,
    }

    class Sa5Form {

        constructor(element: HTMLElement);

        // get name(): string;
        // set name(string); 

        // get currentIndex(): number;
        // set currentIndex(number); 

        // get currentNum(): number;
        // set currentNum(number); 

        setMode(mode: WebflowFormMode): void; 

    }

}