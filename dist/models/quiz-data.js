"use strict";
(() => {
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
})();
//# sourceMappingURL=quiz-data.js.map
