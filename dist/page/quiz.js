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
      const sa5 = window["sa5"];
      sa5.push([
        "slideNextRequest",
        (slider, index) => {
          console.log("SLIDE NEXT REQUEST", slider.name, slider, index);
          const slide = this.getSlideByPosition(index + 1);
          if (slide) {
            console.log("Slide found:", slide);
            return this.checkRadioSelection(slide);
          } else {
            console.log("Slide not found.");
          }
          return index < 6;
        }
      ]);
      sa5.push([
        "slidePrevRequest",
        (slider, index) => {
          console.log("SLIDE PREV REQUEST", slider.name, slider, index);
          return index > 0;
        }
      ]);
    }
    checkRadioSelection(container) {
      const radios = container.querySelectorAll('input[type="radio"]');
      for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
          return true;
        }
      }
      return false;
    }
    getSlideByPosition(position) {
      const slider = document.querySelector(`[wfu-slider=quiz]`);
      if (!slider) {
        console.error("Slider not found.");
        return null;
      }
      const slides = slider.querySelectorAll(`.w-slide`);
      if (position < 1 || position > slides.length) {
        console.error("Slide position out of range.");
        return null;
      }
      return slides[position - 1];
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
          this.setElemData(element, data[propertyName]);
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
      const dataElems = document.querySelectorAll("[data-item]");
      dataElems.forEach((elem) => {
        switch (elem.getAttribute("data-item")) {
          case "score":
            this.setElemData(elem, totalScore.toString());
            break;
          case "percentage":
            const percentage = this.getPercentage(totalScore);
            if (percentage) {
              this.setElemData(elem, percentage.toString());
            }
            break;
        }
      });
    }
    getPercentage(index) {
      const dataPoints = [0, 4.12, 6.1, 8.95, 12.95, 18.39, 25.42, 33.99, 43.76, 54.21, 64.25, 73.2, 80.57, 86.26, 90.44, 93.39];
      if (index < 0 || index >= dataPoints.length) {
        console.error("Index out of range. Please provide an index between 0 and 15.");
        return null;
      }
      return dataPoints[index];
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
//# sourceMappingURL=quiz.js.map
