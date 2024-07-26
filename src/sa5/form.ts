

/*
 * SA5 | Forms
 */

declare namespace sa5 {

    enum WebflowFormMode {
        Active,
        Success,
        Error,
    }

    class Sa5Form {

        constructor(element: HTMLElement);

        setMode(mode: WebflowFormMode): void; 

    }

}