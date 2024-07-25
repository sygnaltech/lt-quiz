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

  // src/sa5/layout.ts
  var ElementGroupController = class {
    constructor() {
      this.groups = /* @__PURE__ */ new Map();
    }
    init() {
      const elements = document.querySelectorAll("[wfu-element-group]");
      elements.forEach((element) => {
        var _a;
        const groupName = element.getAttribute("wfu-element-group");
        if (groupName) {
          if (!this.groups.has(groupName)) {
            const group = new ElementGroup(groupName);
            this.groups.set(groupName, group);
          }
          (_a = this.groups.get(groupName)) == null ? void 0 : _a.addElement(element);
        }
      });
    }
  };
  var ElementGroup = class {
    constructor(name) {
      this.name = name;
      this.elements = [];
    }
    addElement(element) {
      const elementGroupElement = new ElementGroupElement(element);
      this.elements.push(elementGroupElement);
    }
    init() {
    }
    hideAll() {
      this.elements.forEach((element) => element.hide());
    }
    showAll() {
      this.elements.forEach((element) => element.show());
    }
    show(name) {
      this.elements.forEach((element) => {
        if (element.element.getAttribute("wfu-element-name") === name) {
          element.show();
        } else {
          element.hide();
        }
      });
    }
  };
  var ElementGroupElement = class {
    constructor(element) {
      this.element = element;
    }
    hide() {
      this.element.style.display = "none";
    }
    show() {
      this.element.style.display = "block";
    }
    init() {
    }
  };

  // src/models/quiz-data.ts
  var QuizData = class {
    constructor() {
      this.score = 0;
      this["first-name"] = "";
    }
    get probability() {
      const dataPoints = [0, 4.12, 6.1, 8.95, 12.95, 18.39, 25.42, 33.99, 43.76, 54.21, 64.25, 73.2, 80.57, 86.26, 90.44, 93.39];
      if (this.score < 0 || this.score >= dataPoints.length) {
        console.error("Index out of range. Please provide an index between 0 and 15.");
        return null;
      }
      return dataPoints[this.score] / 100;
    }
    get "probability-display"() {
      if (!this.probability)
        return "";
      return `${(this.probability * 100).toFixed(2)}%`;
    }
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

  // src/page/quiz.ts
  var QuizPage = class {
    constructor() {
      this.elementGroupController = new ElementGroupController();
      this.data = new QuizData();
      this.data = this.createWatchedObject(this.data);
    }
    createWatchedObject(data) {
      const handler = {
        set: (target, property, value) => {
          console.log(`Property ${String(property)} changed from ${target[property]} to ${value}`);
          target[property] = value;
          this.updateData();
          return true;
        }
      };
      return new Proxy(data, handler);
    }
    updateData() {
      var _a, _b;
      console.log("Current data:", this.data);
      const dataElems = document.querySelectorAll("[data-item]");
      dataElems.forEach((elem) => {
        switch (elem.getAttribute("data-item")) {
          case "score":
            this.setElemData(elem, this.data.score.toString());
            break;
          case "percentage":
          case "probability":
            const probability = this.data.probability;
            if (probability) {
              this.setElemData(elem, probability.toString());
            }
            break;
          case "probability-display":
            const percentage = this.data["probability-display"];
            if (percentage) {
              this.setElemData(elem, `${percentage}%`);
            }
            break;
          case "first-name":
            this.setElemData(elem, this.data["first-name"]);
        }
      });
      (_a = this.elementGroupController.groups.get("result-chart")) == null ? void 0 : _a.show(this.data.score.toString());
      (_b = this.elementGroupController.groups.get("result-text")) == null ? void 0 : _b.show(this.getScoreCategory(this.data.score));
    }
    setup() {
    }
    exec() {
      var _a, _b;
      new IPInfo().init();
      this.setupEventListeners();
      this.elementGroupController.init();
      (_a = this.elementGroupController.groups.get("result-text")) == null ? void 0 : _a.show("low");
      (_b = this.elementGroupController.groups.get("result-chart")) == null ? void 0 : _b.show("1");
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
      const elements = document.querySelectorAll("[quiz-action]");
      elements.forEach((element) => {
        const actionValue = element.getAttribute("quiz-action");
        if (actionValue) {
          element.addEventListener("click", () => {
            this.actionFunction(actionValue);
          });
        }
      });
      const dataItemSources = document.querySelectorAll("[data-item-source]");
      dataItemSources.forEach((element) => {
        const actionValue = element.getAttribute("data-item-source");
        if (actionValue) {
          element.addEventListener("changed", () => {
            this.actionFunction(actionValue);
          });
        }
      });
    }
    actionFunction(actionValue) {
      console.log(`Action triggered with value: ${actionValue}`);
      switch (actionValue) {
        case "back":
          break;
        case "next":
          break;
        case "close":
          break;
        case "restart":
          break;
      }
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
      this.data.score = totalScore;
    }
    getScoreCategory(totalScore) {
      if (totalScore >= 0 && totalScore <= 2) {
        return "low";
      } else if (totalScore >= 3 && totalScore <= 7) {
        return "moderate";
      } else if (totalScore >= 8) {
        return "high";
      }
      return "unknown";
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
