"use strict";
(() => {
  // src/page/home.ts
  var HomePage = class {
    constructor() {
    }
    setup() {
    }
    exec() {
      const sa5 = window["sa5"];
      const tabsElem = document.querySelector("[wfu-tabs='clinic']");
      if (tabsElem)
        this.clinicTabs = new sa5.WebflowTabs(tabsElem);
      console.log(tabsElem);
      console.log(this.clinicTabs);
      sa5.push([
        "tabChanged",
        (tab, index) => {
          console.log("tabchanged", tab, index);
          const swiper2x = window.componentManager.getComponentsByType("AutoSwiper2x");
          swiper2x.forEach((component) => {
            component.reinit();
            console.log("swiper", component.name);
          });
        }
      ]);
    }
  };
})();
//# sourceMappingURL=home.js.map
