"use strict";
(() => {
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/ipinfo.ts
  var IPInfo = class {
    constructor() {
    }
    init() {
      return __async(this, null, function* () {
        const url = `https://ipinfo.io?token=44b4a5206a1bb2`;
        try {
          const response = yield fetch(url);
          const data = yield response.json();
          this.applyIPInfoData(data);
        } catch (error) {
          console.error("Failed to fetch IP info:", error);
        }
      });
    }
    applyIPInfoData(data) {
      const elements = document.querySelectorAll("[ip-info]");
      elements.forEach((element) => {
        const propertyName = element.getAttribute("ip-info");
        if (propertyName && data.hasOwnProperty(propertyName)) {
          this.setElemData(element, data[propertyName]);
        } else {
          console.log(`Property '${propertyName}' not found in data`);
        }
      });
    }
    setElemData(elem, value) {
      switch (elem.tagName.toLowerCase()) {
        case "input":
          const inputElem = elem;
          inputElem.value = value;
          break;
        default:
          elem.innerText = value;
          break;
      }
    }
  };
})();
//# sourceMappingURL=ipinfo.js.map
