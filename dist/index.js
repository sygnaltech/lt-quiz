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

  // src/version.ts
  var VERSION = "0.1.3";

  // src/page/home.ts
  var HomePage = class {
    constructor() {
    }
    setup() {
    }
    exec() {
    }
  };

  // node_modules/@sygnal/sse/dist/page.js
  var __awaiter = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var Page = class {
    static getQueryParam(name) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name);
    }
    static loadScript(url) {
      const script = document.createElement("script");
      script.src = url;
      document.body.appendChild(script);
    }
    static loadCSS(url) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      document.head.appendChild(link);
    }
    static loadEngineCSS(cssFileName) {
      let libPath = window.SSE.baseUrl;
      const cssURL = `${libPath}/css/${cssFileName}`;
      this.loadCSS(cssURL);
    }
    static loadStyle(css) {
      const style = document.createElement("style");
      style.innerText = css;
      document.head.appendChild(style);
    }
    static replaceScriptSource(element, newSrc) {
      element.src = newSrc;
    }
    static replaceCSSLink(element, newHref) {
      element.href = newHref;
    }
    static prependToTitle(text) {
      document.title = `${text}${document.title}`;
    }
    static getCurrentScriptUrl() {
      if (document.currentScript) {
        const currentScript = document.currentScript;
        return currentScript.src;
      }
      console.error("document.currentScript is not supported in this browser.");
      return null;
    }
    static getCurrentScriptBaseUrl() {
      const currentScript = document.currentScript;
      if (currentScript) {
        const scriptURL = new URL(currentScript.src);
        const origin = scriptURL.origin;
        const path = scriptURL.pathname.substring(0, scriptURL.pathname.lastIndexOf("/"));
        const baseURL = `${origin}${path}`;
        return baseURL;
      } else {
        console.error("Unable to determine the currently executing script.");
      }
      return void 0;
    }
    static findAncestorWithAttribute(element, attributeName) {
      let currentElement = element;
      while (currentElement) {
        if (currentElement.hasAttribute(attributeName)) {
          return currentElement;
        }
        currentElement = currentElement.parentElement;
      }
      return null;
    }
    static getAncestorAttributeValue(element, attributeName) {
      let currentElement = element;
      while (currentElement) {
        if (currentElement.hasAttribute(attributeName)) {
          return currentElement.getAttribute(attributeName);
        }
        currentElement = currentElement.parentElement;
      }
      return null;
    }
    static hasAncestorWithAttribute(element, attributeName) {
      return this.findAncestorWithAttribute(element, attributeName) !== null;
    }
    static convertToPixels(value, contextElement = document.documentElement) {
      const match = value.match(/^(-?\d+\.?\d*)(rem|em|px|vh|vw|%)$/);
      if (!match)
        throw new Error("Invalid value format");
      const [, amountStr, unit] = match;
      const amount = parseFloat(amountStr);
      switch (unit) {
        case "px":
          return amount;
        case "rem":
          return amount * parseFloat(getComputedStyle(document.documentElement).fontSize);
        case "em":
          return amount * parseFloat(getComputedStyle(contextElement).fontSize);
        case "vh":
          return amount * window.innerHeight / 100;
        case "vw":
          return amount * window.innerWidth / 100;
        case "%":
          return amount * contextElement.clientWidth / 100;
        default:
          throw new Error("Unsupported unit");
      }
    }
    static getResponseHeader(headerName_1) {
      return __awaiter(this, arguments, void 0, function* (headerName, url = void 0) {
        const headers = yield this.getResponseHeaders(url);
        if (!headers)
          return void 0;
        if (!headers.has(headerName))
          return void 0;
        return headers.get(headerName) || void 0;
      });
    }
    static getResponseHeaders() {
      return __awaiter(this, arguments, void 0, function* (url = void 0) {
        try {
          if (!url) {
            url = window.location.href;
          }
          const response = yield fetch(url, {
            method: "HEAD"
          });
          return response.headers;
        } catch (error) {
          console.error("Error checking reverse proxy header:", error);
        }
        return void 0;
      });
    }
  };

  // node_modules/js-cookie/dist/js.cookie.mjs
  function assign(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        target[key] = source[key];
      }
    }
    return target;
  }
  var defaultConverter = {
    read: function(value) {
      if (value[0] === '"') {
        value = value.slice(1, -1);
      }
      return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
    },
    write: function(value) {
      return encodeURIComponent(value).replace(
        /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
        decodeURIComponent
      );
    }
  };
  function init(converter, defaultAttributes) {
    function set(name, value, attributes) {
      if (typeof document === "undefined") {
        return;
      }
      attributes = assign({}, defaultAttributes, attributes);
      if (typeof attributes.expires === "number") {
        attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
      }
      if (attributes.expires) {
        attributes.expires = attributes.expires.toUTCString();
      }
      name = encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
      var stringifiedAttributes = "";
      for (var attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue;
        }
        stringifiedAttributes += "; " + attributeName;
        if (attributes[attributeName] === true) {
          continue;
        }
        stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
      }
      return document.cookie = name + "=" + converter.write(value, name) + stringifiedAttributes;
    }
    function get(name) {
      if (typeof document === "undefined" || arguments.length && !name) {
        return;
      }
      var cookies = document.cookie ? document.cookie.split("; ") : [];
      var jar = {};
      for (var i = 0; i < cookies.length; i++) {
        var parts = cookies[i].split("=");
        var value = parts.slice(1).join("=");
        try {
          var found = decodeURIComponent(parts[0]);
          jar[found] = converter.read(value, found);
          if (name === found) {
            break;
          }
        } catch (e) {
        }
      }
      return name ? jar[name] : jar;
    }
    return Object.create(
      {
        set,
        get,
        remove: function(name, attributes) {
          set(
            name,
            "",
            assign({}, attributes, {
              expires: -1
            })
          );
        },
        withAttributes: function(attributes) {
          return init(this.converter, assign({}, this.attributes, attributes));
        },
        withConverter: function(converter2) {
          return init(assign({}, this.converter, converter2), this.attributes);
        }
      },
      {
        attributes: { value: Object.freeze(defaultAttributes) },
        converter: { value: Object.freeze(converter) }
      }
    );
  }
  var api = init(defaultConverter, { path: "/" });

  // node_modules/@sygnal/sse/dist/routeDispatcher.js
  var RouteDispatcher = class {
    constructor(SiteClass) {
      this._SiteClass = SiteClass;
    }
    matchRoute(path) {
      for (const route in this.routes) {
        if (route.endsWith("*")) {
          const baseRoute = route.slice(0, -1);
          if (path.startsWith(baseRoute)) {
            return this.routes[route];
          }
        } else if (route === path) {
          return this.routes[route];
        }
      }
      return null;
    }
    setupRoute() {
      const site = new this._SiteClass();
      site.setup();
      const path = window.location.pathname;
      const HandlerClass = this.matchRoute(path);
      if (HandlerClass) {
        const handlerInstance = new HandlerClass();
        handlerInstance.setup();
      } else {
      }
    }
    execRoute() {
      const site = new this._SiteClass();
      site.exec();
      const path = window.location.pathname;
      const HandlerClass = this.matchRoute(path);
      if (HandlerClass) {
        const handlerInstance = new HandlerClass();
        handlerInstance.exec();
      } else {
      }
    }
  };

  // node_modules/@sygnal/sse/dist/index.js
  function initSSE() {
    if (!window.SSE) {
      window.SSE = {};
    }
    window.SSE.baseUrl = Page.getCurrentScriptBaseUrl();
  }

  // src/site.ts
  var Site = class {
    constructor() {
    }
    setup() {
      Page.loadEngineCSS("site.css");
    }
    exec() {
    }
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

  // src/routes.ts
  var routeDispatcher = () => {
    var routeDispatcher2 = new RouteDispatcher(Site);
    routeDispatcher2.routes = {
      "/": HomePage,
      "/quiz": QuizPage,
      "/quiz-section": QuizPage
    };
    return routeDispatcher2;
  };

  // src/index.ts
  var SITE_NAME = "Site";
  initSSE();
  var setup = () => {
    console.log(`${SITE_NAME} package init v${VERSION}`);
    routeDispatcher().setupRoute();
  };
  var exec = () => {
    routeDispatcher().execRoute();
  };
  setup();
  if (document.readyState !== "loading") {
    exec();
  } else {
    document.addEventListener("DOMContentLoaded", exec);
  }
})();
/*! js-cookie v3.0.5 | MIT */
//# sourceMappingURL=index.js.map
