"use strict";
(() => {
  // src/models/quiz-data.ts
  var QuizData = class {
    constructor() {
      this.score = 0;
      this["first-name"] = "";
    }
    get probability() {
      const dataPoints = [2.76, 4.12, 6.1, 8.95, 12.95, 18.39, 25.42, 33.99, 43.76, 54.21, 64.25, 73.2, 80.57, 86.26, 90.44, 93.39, 95.43];
      if (this.score < 0 || this.score >= dataPoints.length) {
        console.error("Index out of range. Please provide an index between 0 and 16.");
        return null;
      }
      return dataPoints[this.score] / 100;
    }
    get "probability-display"() {
      if (!this.probability)
        return "";
      return `${(this.probability * 100).toFixed(2)}%`;
    }
    get "score-category"() {
      if (this.score >= 0 && this.score <= 3) {
        return "low";
      } else if (this.score >= 4 && this.score <= 9) {
        return "moderate";
      } else if (this.score >= 10) {
        return "high";
      }
      return "unknown";
    }
    setProperty(property, value) {
      this[property] = value;
    }
    static createWatchedObject(callback) {
      const data = new QuizData();
      const handler = {
        set: (target, property, value) => {
          target[property] = value;
          callback(target, property, value);
          return true;
        }
      };
      return new Proxy(data, handler);
    }
  };
})();
//# sourceMappingURL=quiz-data.js.map
