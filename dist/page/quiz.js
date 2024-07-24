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

  // src/page/quiz.ts
  var QuizPage = class {
    constructor() {
    }
    setup() {
    }
    exec() {
      this.fetchIPInfo();
      this.setupEventListeners();
    }
    fetchIPInfo() {
      return __async(this, null, function* () {
        const url = `https://ipinfo.io?token=37cce46c605631`;
        try {
          const response = yield fetch(url);
          const data = yield response.json();
          console.log(data);
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
          element.textContent = data[propertyName];
        } else {
          console.log(`Property '${propertyName}' not found in data`);
        }
      });
    }
    setupEventListeners() {
      const radios = document.querySelectorAll('input[type="radio"]');
      radios.forEach((radio) => {
        radio.addEventListener("change", () => this.calculateTotalScore());
      });
    }
    calculateTotalScore() {
      const checkedRadios = document.querySelectorAll('input[type="radio"]:checked');
      let totalScore = 0;
      console.log("clicked");
      checkedRadios.forEach((radio) => {
        totalScore += Number(radio.value);
      });
      const scoreDisplay = document.getElementById("scoreDisplay");
      if (scoreDisplay) {
        scoreDisplay.textContent = `Total Score: ${totalScore}`;
      }
    }
  };
})();
//# sourceMappingURL=quiz.js.map
