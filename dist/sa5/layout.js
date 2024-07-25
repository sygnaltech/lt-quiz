"use strict";
(() => {
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
})();
//# sourceMappingURL=layout.js.map
