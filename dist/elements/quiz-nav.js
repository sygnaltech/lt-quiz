"use strict";
(() => {
  // src/elements/quiz-nav.ts
  var QuizNavComponent = class {
    constructor() {
    }
    showControls(back, close, restart, next) {
      this.showControl("back", back);
      this.showControl("close", close);
      this.showControl("restart", restart);
      this.showControl("next", next);
    }
    showControl(name, visible) {
      const elements = document.querySelectorAll(`[quiz-nav] [quiz-action="${name}"]`);
      elements.forEach((element) => {
        element.hidden = !visible;
      });
    }
  };
})();
//# sourceMappingURL=quiz-nav.js.map
