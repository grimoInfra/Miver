/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 766:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 552:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 752:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 606:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 30:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 960:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 315:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 256:
/***/ ((module, exports, __webpack_require__) => {

var __webpack_unused_export__;
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(126)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    __webpack_unused_export__ = ({ value: true });
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 317:
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(535), __webpack_require__(394), __webpack_require__(253), __webpack_require__(678), __webpack_require__(415), __webpack_require__(146), __webpack_require__(615), __webpack_require__(695), __webpack_require__(73), __webpack_require__(538), __webpack_require__(762), __webpack_require__(745), __webpack_require__(421), __webpack_require__(766)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Dom, injector_1, serviceCollectionManager_1, product_1, topBar_1, themeProvider_1, themeService_1, station_1, ad_1, ad_data_1, adService_1, dragDropService_1, windowResizer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.MvAppMain = void 0;
    /**
     * Only add this file for development purposes and keep
     * at prodution we use the google-fonts-link for
     * Montseratt font-family
     * material-icons
     */
    // import "./media/symbols.css"
    class MvAppMain {
        constructor() {
            this.container = undefined;
            this.containerWrapper = undefined;
            this.serviceInjector = undefined;
            this.adControl = undefined;
            this.windowResizer = undefined;
        }
        initialize() {
            this.createInjectorFoundation();
            this.provideElementsToHost();
        }
        createInjectorFoundation() {
            this.serviceInjector = this.createServiceInjector();
        }
        provideElementsToHost() {
            this.container = Dom.createElement("div", ['mv-application']);
            this.container.role = 'application';
            this.containerWrapper = Dom.createElement("div", ['mv-application-wrapper']);
            this.createStaticItems(this.serviceInjector);
            let parts = this.createApplicationParts(this.serviceInjector);
            this.registerApplicationEventsAndState();
            Dom.appendElements([...parts], this.containerWrapper);
            Dom.appendToDom(this.containerWrapper, this.container);
            Dom.appendToDom(this.container, document.body);
            this.clearSplashScreen();
        }
        ;
        //available in production
        clearSplashScreen() {
            try {
                let splashHost = Dom.$('.mv-splash-container');
                splashHost.style.opacity = '0';
                splashHost.style.display = 'none';
            }
            catch (e) {
                console.log(`[Splash-Error]:available in production Mode`);
            }
        }
        registerApplicationEventsAndState() {
            if (this.windowResizer) {
                Dom.layElement(this.containerWrapper, { width: `${this.windowResizer.getWidth()}px`, height: `${this.windowResizer.getHeight()}px` });
                this.windowResizer.onDidResize.subscribeAsync(this.onWindowDidResize.bind(this));
            }
        }
        ;
        onWindowDidResize(args) {
            Dom.layElement(this.containerWrapper, { width: `${args.width}px`, height: `${args.height}px` });
        }
        createStaticItems(serviceInjector) {
            let themeProvider = serviceInjector.createInstance(themeProvider_1.ThemeProvider);
            themeProvider.initializeProvider(document.getElementsByTagName("html")[0]);
            this.windowResizer = serviceInjector.getOrCreateServiceInstance(windowResizer_1.IWindowResizer);
        }
        createApplicationParts(serviceInjector) {
            //ad-control
            this.adControl = serviceInjector.createInstance(ad_1.AdContainer);
            //top-bar
            let TopBarInstance = serviceInjector.createInstance(topBar_1.TopBar);
            //station
            let StationInstance = serviceInjector.createInstance(station_1.Station);
            let PartsBundle = [this.adControl.element, TopBarInstance.element, StationInstance.element];
            return PartsBundle;
        }
        createServiceInjector() {
            let serviceCollection = new serviceCollectionManager_1.ServiceCollection();
            serviceCollection.set(product_1.IProduct, product_1.ProductData);
            serviceCollection.set(themeService_1.ITheme, new themeService_1.Theme());
            serviceCollection.set(adService_1.IAd, ad_data_1.AdContentdata);
            serviceCollection.set(dragDropService_1.IDragAndDrop, new dragDropService_1.DragManager());
            serviceCollection.set(windowResizer_1.IWindowResizer, new windowResizer_1.WindowResizer());
            return new injector_1.Injector(serviceCollection);
        }
        ;
        async startup() {
            this.initialize();
        }
        ;
    }
    exports.MvAppMain = MvAppMain;
    ;
    const MvMain = new MvAppMain();
    MvMain.startup();
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(535), __webpack_require__(762)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Dom, adService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.AdContainer = void 0;
    let AdContainer = class AdContainer {
        constructor(adService) {
            this.adService = adService;
            this.container = undefined;
            this.mainAdContent = undefined;
            this.adLinkSource = undefined;
            this.initializeComponent();
        }
        initializeComponent() {
            this.createElementLayout();
        }
        applyRawStyles() {
            if (this.container && this.adLinkSource) {
                Dom.layElement(this.container, { width: "100%", height: "30px" });
                Dom.layElement(this.adLinkSource, { width: "100%", height: "30px" });
                Dom.makeCenter(this.adLinkSource);
                this.adLinkSource.style.textDecoration = "none";
                this.mainAdContent.style.fontSize = "15px";
                this.mainAdContent.style.fontFamily = 'sans-serif';
            }
        }
        createElementLayout() {
            this.container = Dom.createElement('div', ['ad-service-container']);
            this.adLinkSource = Dom.createElement('a', ['ad-link-source']);
            this.mainAdContent = Dom.createElement('div', ['ad-main-content']);
            this.mainAdContent.textContent = this.adService.content;
            this.adLinkSource.href = this.adService.linkSource;
            this.container.style.backgroundColor = this.adService.backgroundColor;
            this.mainAdContent.style.color = this.adService.foregroundColor;
            this.applyRawStyles();
            Dom.addDisposableEventListener(this.container, Dom.EVENT_TYPES.MOUSE_MOVE, () => {
                this.mainAdContent.style.textDecoration = "underline";
            });
            Dom.addDisposableEventListener(this.container, Dom.EVENT_TYPES.MOUSE_LEAVE, () => {
                this.mainAdContent.style.textDecoration = "none";
            });
            Dom.hideElement(this.container);
            Dom.appendElements([this.mainAdContent], this.adLinkSource);
            Dom.appendToDom(this.adLinkSource, this.container);
        }
        dispose() {
            this.container.remove();
        }
        isVisible(value) {
            if (value) {
                Dom.showElement("block", this.container);
            }
            else {
                Dom.hideElement(this.container);
            }
        }
        get element() {
            return this.container;
        }
    };
    AdContainer = __decorate([
        __param(0, adService_1.IAd)
    ], AdContainer);
    exports.AdContainer = AdContainer;
    ;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 634:
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(535), __webpack_require__(185), __webpack_require__(752)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Dom, disposeStore_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.DragAndDropContainer = void 0;
    class DragAndDropContainer extends disposeStore_1.DisposeStore {
        constructor(dragService) {
            super();
            this.dragService = dragService;
            this.container = undefined;
            this.IdleBlobContainer = undefined;
            this.dragIconElement = undefined;
            this.dragDescriptionContainer = undefined;
            this.onDidDrop = undefined;
            this.initializeElementComponent();
        }
        initializeElementComponent() {
            this.createElementFoundation();
        }
        ;
        createElementFoundation() {
            this.container = Dom.createElement("div", ['drag-drop-container']);
            this.IdleBlobContainer = Dom.createElement("div", ['idle-blob-container']);
            this.dragDescriptionContainer = Dom.createElement("div", ['drag-drop-description']);
            this.dragIconElement = Dom.createElementWithIcon("div", "IdleBackCover").element();
            this.dragIconElement.classList.add('drag-icon-element');
            this.dragDescriptionContainer.textContent = "Drag & Drop .torrent file";
            this.dragService.initializeContainer({ container: this.container });
            Dom.appendElements([this.dragIconElement, this.dragDescriptionContainer], this.IdleBlobContainer);
            Dom.appendToDom(this.IdleBlobContainer, this.container);
            this.makeEnvironment();
        }
        ;
        makeEnvironment() {
            if (this.dragService.isContainerDefined()) {
                this.registerEventListeners();
            }
        }
        ;
        registerEventListeners() {
            this.dragService.onDidDragContainer.subscribeAsync(this.dragStateHandler.bind(this));
        }
        ;
        dragStateHandler(args) {
            if (args == "prcessing") {
                Dom.setElementBackgroundColor(this.IdleBlobContainer, "var(--drag-background-color)");
            }
            else {
                Dom.setElementBackgroundColor(this.IdleBlobContainer, "unset");
            }
        }
        get element() {
            return this.container;
        }
    }
    exports.DragAndDropContainer = DragAndDropContainer;
    ;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 853:
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(535), __webpack_require__(185), __webpack_require__(606)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Dom, disposeStore_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.SnackBarContainer = void 0;
    class SnackBarContainer extends disposeStore_1.DisposeStore {
        constructor() {
            super();
            this.container = undefined;
            this.containerWrapper = undefined;
            //link-cion
            this.linkButtonWrapper = undefined;
            this.linkIcon = undefined;
            //add-cion
            this.addButtonWrapper = undefined;
            this.addIcon = undefined;
            //more-cion
            this.moreButtonWrapper = undefined;
            this.moreIcon = undefined;
            this.initializeComponent();
        }
        initializeComponent() {
            this.createElementLayout();
        }
        createElementLayout() {
            this.container = Dom.createElement('div', ['snack-bar-controls']);
            this.containerWrapper = Dom.createElement('div', ['snack-main-wrapper']);
            this.linkButtonWrapper = Dom.createElement('div', ['link-button-container', 'snack-control']);
            this.linkIcon = Dom.createElementWithIcon('div', "AddLink").element();
            this.addButtonWrapper = Dom.createElement('div', ['add-button-container', 'snack-control']);
            this.addIcon = Dom.createElementWithIcon('div', "AddFile").element();
            this.moreButtonWrapper = Dom.createElement('div', ['more-button-container', 'snack-control']);
            this.moreIcon = Dom.createElementWithIcon('div', "More").element();
            //event-listeners
            this._register(Dom.addDisposableEventListener(this.linkButtonWrapper, Dom.EVENT_TYPES.CLICK, () => {
            }));
            this._register(Dom.addDisposableEventListener(this.addButtonWrapper, Dom.EVENT_TYPES.CLICK, () => {
            }));
            this._register(Dom.addDisposableEventListener(this.moreButtonWrapper, Dom.EVENT_TYPES.CLICK, () => {
            }));
            let pairBundles = [
                [this.linkButtonWrapper, this.linkIcon],
                [this.addButtonWrapper, this.addIcon],
                [this.moreButtonWrapper, this.moreIcon]
            ];
            for (let bundle of pairBundles) {
                Dom.appendToDom(bundle[1], bundle[0]);
            }
            ;
            Dom.appendElements([this.linkButtonWrapper, this.addButtonWrapper, this.moreButtonWrapper], this.containerWrapper);
            Dom.appendToDom(this.containerWrapper, this.container);
        }
        get element() {
            return this.container;
        }
    }
    exports.SnackBarContainer = SnackBarContainer;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 695:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(535), __webpack_require__(185), __webpack_require__(634), __webpack_require__(745), __webpack_require__(853), __webpack_require__(421), __webpack_require__(552)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Dom, disposeStore_1, dragDrop_1, dragDropService_1, snackBar_1, windowResizer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Station = void 0;
    let Station = class Station extends disposeStore_1.DisposeStore {
        constructor(dragService, resizerService) {
            super();
            this.dragService = dragService;
            this.resizerService = resizerService;
            this.container = undefined;
            this.contentWrapper = undefined;
            this.dragContainer = undefined;
            this.snackContainer = undefined;
            this.initializeComponent();
        }
        initializeComponent() {
            this.createElementLayout();
        }
        createElementLayout() {
            this.container = Dom.createElement("div", ['station-main-area']);
            this.contentWrapper = Dom.createElement("div", ['station-content-wrapper']);
            this.dragContainer = new dragDrop_1.DragAndDropContainer(this.dragService);
            this.snackContainer = new snackBar_1.SnackBarContainer();
            Dom.appendElements([this.dragContainer.element, this.snackContainer.element], this.contentWrapper);
            Dom.appendToDom(this.contentWrapper, this.container);
            this.registerContainerEventsAndState();
        }
        ;
        registerContainerEventsAndState() {
            Dom.layElement(this.container, { width: `${this.resizerService.getWidth()}px`, height: `${(this.resizerService.getHeight() - 50)}px` });
            this.resizerService.onDidResize.subscribeAsync(this.onWindowDidResize.bind(this));
        }
        ;
        onWindowDidResize(args) {
            Dom.layElement(this.container, { width: `${args.width}px`, height: `${(args.height - 50)}px` });
        }
        dispose() {
            super.dispose();
        }
        get element() {
            return this.container;
        }
    };
    Station = __decorate([
        __param(0, dragDropService_1.IDragAndDrop),
        __param(1, windowResizer_1.IWindowResizer)
    ], Station);
    exports.Station = Station;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 90:
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(535), __webpack_require__(960)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Dom) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.ProductLink = void 0;
    class ProductLink {
        constructor(productService) {
            this.productService = productService;
            this.productLinkContainer = undefined;
            this.anchorTagElement = undefined;
            this.productIdContainer = undefined;
            this.productLogo = undefined;
            this.initializeComponent();
        }
        ;
        initializeComponent() {
            this.createComponentFoundation();
        }
        ;
        createComponentFoundation() {
            //create-elements
            this.productLinkContainer = Dom.createElement('div', ['product-container']);
            this.anchorTagElement = Dom.createElement("a", ['product-link-source']);
            this.productIdContainer = Dom.createElement("div", ['product-id']);
            this.productLogo = Dom.createElement("div", ['product-logo']);
            //create-sources;
            this.anchorTagElement.href = this.productService.basehref;
            this.productIdContainer.textContent = this.productService.name;
            Dom.appendElements([this.productLogo, this.productIdContainer], this.anchorTagElement);
            Dom.appendToDom(this.anchorTagElement, this.productLinkContainer);
        }
        ;
        get element() {
            return this.productLinkContainer;
        }
    }
    exports.ProductLink = ProductLink;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 510:
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(535), __webpack_require__(185), __webpack_require__(315)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Dom, disposeStore_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.ThemeContext = void 0;
    class ThemeContext extends disposeStore_1.DisposeStore {
        constructor(themeService) {
            super();
            this.themeService = themeService;
            this.container = undefined;
            this.themeContextElement = undefined;
            this.themeContextIcon = undefined;
            this.initializeElementComponent();
        }
        ;
        initializeElementComponent() {
            this.createElementFoundation();
        }
        ;
        getThemeIcon() {
            return this.themeService.theme == "dark" ? "LightTheme" : "DarkTheme";
        }
        ;
        getTheme() {
            return this.themeService.theme;
        }
        ;
        setContainerToolTip(theme) {
            if (theme == "dark") {
                this.container.title = "Change To LightTheme";
            }
            else {
                this.container.title = "Change To DarkTheme";
            }
        }
        ;
        async changeLayoutTheme() {
            let currentTheme = this.getTheme();
            if (currentTheme == "dark") {
                this.updateContextIcon("dark");
                this.setContainerToolTip("light");
                this.themeService.setTheme("light");
            }
            else {
                this.updateContextIcon("light");
                this.setContainerToolTip("dark");
                this.themeService.setTheme("dark");
            }
        }
        ;
        updateContextIcon(theme) {
            if (theme == "dark") {
                this.themeContextIcon.setIcon("DarkTheme");
            }
            else {
                this.themeContextIcon.setIcon("LightTheme");
            }
        }
        createElementFoundation() {
            this.themeContextIcon = Dom.createElementWithIcon("div", this.getThemeIcon());
            this.container = Dom.createElement('div', ['theme-context-control']);
            this.themeContextElement = this.themeContextIcon.element();
            this.setContainerToolTip(this.getTheme());
            this._register(Dom.addDisposableEventListener(this.container, Dom.EVENT_TYPES.CLICK, (e) => {
                this.changeLayoutTheme();
            }));
            this.container.role = "button";
            this.container.tabIndex = 0;
            Dom.appendToDom(this.themeContextElement, this.container);
        }
        ;
        get element() {
            return this.container;
        }
    }
    exports.ThemeContext = ThemeContext;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 415:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(535), __webpack_require__(678), __webpack_require__(90), __webpack_require__(510), __webpack_require__(615), __webpack_require__(30)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Dom, product_1, productLink_1, themeContext_1, themeService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.TopBar = void 0;
    let TopBar = class TopBar {
        constructor(productService, themeService) {
            this.productService = productService;
            this.themeService = themeService;
            this.productLink = undefined;
            this.themeContext = undefined;
            this.container = undefined;
            this.splitView = undefined;
            this.initializeComponent();
        }
        ;
        initializeComponent() {
            this.createElementFoundation();
        }
        ;
        createElementFoundation() {
            this.productLink = new productLink_1.ProductLink(this.productService);
            this.themeContext = new themeContext_1.ThemeContext(this.themeService);
            this.container = Dom.createElement("div", ['top-bar-container']);
            this.container.role = "banner";
            this.container.ariaLabel = "Header";
            this.splitView = Dom.createElement("div", ['top-bar-split-view']);
            Dom.appendElements([this.productLink.element, this.themeContext.element], this.splitView);
            Dom.appendToDom(this.splitView, this.container);
        }
        get element() {
            return this.container;
        }
    };
    TopBar = __decorate([
        __param(0, product_1.IProduct),
        __param(1, themeService_1.ITheme)
    ], TopBar);
    exports.TopBar = TopBar;
    ;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 146:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(615)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, themeService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.ThemeProvider = void 0;
    let ThemeProvider = class ThemeProvider {
        constructor(themeService) {
            this.themeService = themeService;
        }
        ;
        initializeProvider(container) {
            this.themeService.initializeThemeSystem(container);
        }
    };
    ThemeProvider = __decorate([
        __param(0, themeService_1.ITheme)
    ], ThemeProvider);
    exports.ThemeProvider = ThemeProvider;
    ;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 535:
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(203)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, material_icons_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.createElementWithIcon = exports.applyClassToElement = exports.createAttributedElement = exports.createMaskedDivElement = exports.createElement = exports.showElement = exports.eventStopper = exports.hideElement = exports.layElement = exports.appendElements = exports.appendToDom = exports.setElementBackgroundColor = exports.makeCenter = exports.createReflow = exports.createSpinAnimationElement = exports.attachSuspendClass = exports.createFadeOutAnimationElement = exports.createFadeInAnimationElement = exports.createHoverBindClass = exports.createStyleElement = exports.setState = exports.defineComponent = exports.addDisposableEventListener = exports.$$ = exports.$ = exports.EVENT_TYPES = void 0;
    exports.EVENT_TYPES = {
        FOCUS: 'focus',
        CLICK: 'click',
        RESIZE: 'resize',
        KEY_DOWN: 'keydown',
        KEY_UP: 'keyup',
        MOUSE_DOWN: 'mousedown',
        MOUSE_MOVE: 'mousemove',
        MOUSE_OVER: 'mouseover',
        MOUSE_LEAVE: 'mouseleave',
        MOUSE_UP: 'mouseup',
        DBL_CLICk: 'dblclick',
        BLUR: 'blur',
        DRAG_START: "dragstart",
        DRAG_LEAVE: "dragleave",
        DRAG_OVER: "dragover",
        DROP: "drop",
        FOCUS_OUT: 'focusout'
    };
    class DomListener {
        constructor(node, event, handler, options) {
            this._node = node;
            this._handler = handler;
            this._event = event;
            this._options = options;
            this._node.addEventListener(this._event, this._handler, this._options);
        }
        dispose() {
            if (this._handler != null) {
                this._node.removeEventListener(this._event, this._handler, this._options);
            }
            ;
            //clean up resources;
            this._handler = null;
            this._node = null;
            this._options = null;
        }
    }
    function $(element, parentElement) {
        let _parentElement = parentElement ?? document;
        let _result = _parentElement.querySelector(element);
        if (_result) {
            return _result;
        }
        else {
            return undefined;
        }
    }
    exports.$ = $;
    function $$(element, parentElement) {
        let _parentElement = parentElement ?? document;
        let _result = _parentElement.querySelectorAll(element);
        if (_result.length > 0) {
            return _result;
        }
        else {
            return undefined;
        }
    }
    exports.$$ = $$;
    function addDisposableEventListener(node, type, handler, useCaptureOrOptions) {
        return new DomListener(node, type, handler, useCaptureOrOptions);
    }
    exports.addDisposableEventListener = addDisposableEventListener;
    /**
     * Used to define a custom Element
     */
    function defineComponent(ctor) {
        customElements.define(ctor.is, ctor);
    }
    exports.defineComponent = defineComponent;
    function setState(sourceObject) {
        let _currentState = sourceObject.currentState;
        let _assignedState = Object.assign(_currentState, sourceObject.newState);
        sourceObject.currentState = _assignedState;
    }
    exports.setState = setState;
    function createStyleElement(data, id) {
        const styleElement = document.createElement('style');
        styleElement.id = id;
        styleElement.media = 'screen';
        styleElement.type = 'text/css';
        styleElement.textContent = data;
        return styleElement;
    }
    exports.createStyleElement = createStyleElement;
    function createHoverBindClass(nodes, hoverClass) {
        for (const _node of nodes) {
            const _element = _node;
            _element.classList.add(hoverClass);
        }
    }
    exports.createHoverBindClass = createHoverBindClass;
    function createFadeInAnimationElement(element) {
        if (element) {
            element.classList.add('mdl-fadein');
        }
        return { dispose: () => { element.classList.remove('mdl-fadein'); } };
    }
    exports.createFadeInAnimationElement = createFadeInAnimationElement;
    function createFadeOutAnimationElement(element) {
        if (element) {
            element.classList.add('mdl-fadeout');
        }
        return { dispose: () => { element.classList.remove('mdl-fadeout'); } };
    }
    exports.createFadeOutAnimationElement = createFadeOutAnimationElement;
    function attachSuspendClass(element, _class) {
        if (element) {
            element.classList.add(_class);
        }
        return { dispose: () => { element.classList.remove(_class); } };
    }
    exports.attachSuspendClass = attachSuspendClass;
    function createSpinAnimationElement(element) {
        if (element) {
            element.classList.add('mdl-spin');
        }
        return { dispose: () => { element.classList.remove('mdl-spin'); } };
    }
    exports.createSpinAnimationElement = createSpinAnimationElement;
    function createReflow(element) {
        if (element) {
            element.classList.add('mdl-reflow-animation');
        }
        return { dispose: () => { element.classList.remove('mdl-reflow-animation'); } };
    }
    exports.createReflow = createReflow;
    function makeCenter(element) {
        element.style.display = "flex";
        element.style.alignItems = "center";
        element.style.justifyContent = "center";
    }
    exports.makeCenter = makeCenter;
    function setElementBackgroundColor(element, hexColor) {
        if (element) {
            element.style.backgroundColor = hexColor;
        }
    }
    exports.setElementBackgroundColor = setElementBackgroundColor;
    ;
    function appendToDom(element, parent) {
        if (parent) {
            parent.appendChild(element);
        }
        else {
            document.body.append(element);
        }
    }
    exports.appendToDom = appendToDom;
    ;
    function appendElements(nodes, parent) {
        if (parent) {
            parent.append(...nodes);
        }
    }
    exports.appendElements = appendElements;
    function layElement(element, dimensions) {
        if (element) {
            element.style.width = dimensions.width ?? " ";
            element.style.height = dimensions.height ?? " ";
        }
    }
    exports.layElement = layElement;
    ;
    function hideElement(element) {
        if (element) {
            element.style.display = "none";
        }
    }
    exports.hideElement = hideElement;
    ;
    function eventStopper(e) {
        e.preventDefault();
        if (e.bubbles) {
            e.stopPropagation();
        }
    }
    exports.eventStopper = eventStopper;
    function showElement(type, element) {
        if (element) {
            if (type == "flex") {
                element.style.display = "flex";
            }
            else {
                element.style.display = "block";
            }
        }
    }
    exports.showElement = showElement;
    function createElement(element, classList) {
        const _e = document.createElement(element);
        if (classList) {
            _e.classList.add(...classList);
        }
        ;
        return _e;
    }
    exports.createElement = createElement;
    function createMaskedDivElement(childClassList) {
        let preElement = undefined;
        const _mask = document.createElement('div');
        _mask.classList.add('masked-element');
        const _e = document.createElement('div');
        _mask.style.display = 'flex';
        _mask.style.alignItems = 'center';
        _mask.style.justifyContent = 'center';
        if (childClassList) {
            _e.classList.add(...childClassList);
        }
        preElement = _e;
        return preElement;
    }
    exports.createMaskedDivElement = createMaskedDivElement;
    function createAttributedElement(tag, attributes) {
        const _element = document.createElement(tag);
        for (const _attr of attributes) {
            _element.setAttribute(_attr._name, _attr._value);
        }
        ;
        return _element;
    }
    exports.createAttributedElement = createAttributedElement;
    ;
    function applyClassToElement(element, classList) {
        element.classList.add(...classList);
    }
    exports.applyClassToElement = applyClassToElement;
    function createElementWithIcon(tag, icon) {
        const _element = document.createElement(tag);
        if (material_icons_1.MaterialIcons[icon]) {
            _element.classList.add('material-symbols-outlined');
            _element.ariaLabel = "icon";
            _element.textContent = material_icons_1.MaterialIcons[icon].glyphId;
        }
        return {
            element() {
                return _element;
            },
            setIcon(value) {
                _element.textContent = material_icons_1.MaterialIcons[value].glyphId;
            }
        };
    }
    exports.createElementWithIcon = createElementWithIcon;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 203:
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.MaterialIcons = void 0;
    class MaterialIcons {
        constructor(_glyphId) {
            this._glyphId = _glyphId;
            MaterialIcons._allIcons.push(this);
        }
        ;
        get glyphId() {
            return this._glyphId;
        }
    }
    exports.MaterialIcons = MaterialIcons;
    MaterialIcons._allIcons = [];
    MaterialIcons.NavigationMenu = new MaterialIcons("menu");
    MaterialIcons.HomeControl = new MaterialIcons("home");
    MaterialIcons.Download = new MaterialIcons("download");
    MaterialIcons.ArrowDownWard = new MaterialIcons("arrow_downward");
    MaterialIcons.CheckedCheckBox = new MaterialIcons('check_box');
    MaterialIcons.UnCheckedCheckBox = new MaterialIcons('check_box_outline_blank');
    MaterialIcons.Delete = new MaterialIcons('delete');
    MaterialIcons.ExpandMore = new MaterialIcons('expand_more');
    MaterialIcons.ExpandLess = new MaterialIcons('expand_less');
    MaterialIcons.Sync = new MaterialIcons('sync');
    MaterialIcons.ShareControl = new MaterialIcons('share');
    MaterialIcons.Settings = new MaterialIcons('settings');
    MaterialIcons.Feedback = new MaterialIcons('thumb_up');
    MaterialIcons.About = new MaterialIcons('eco');
    MaterialIcons.CloseControl = new MaterialIcons('close');
    MaterialIcons.TorrentClient = new MaterialIcons('cell_tower');
    MaterialIcons.LightTheme = new MaterialIcons('clear_day');
    MaterialIcons.DarkTheme = new MaterialIcons('bedtime');
    MaterialIcons.IdleBackCover = new MaterialIcons('rocket_launch');
    MaterialIcons.AddLink = new MaterialIcons('add_link');
    MaterialIcons.AddFile = new MaterialIcons('add');
    MaterialIcons.More = new MaterialIcons('more_horiz');
    MaterialIcons.MultipleLinks = new MaterialIcons('chrome_tote');
    ;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 165:
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(535), __webpack_require__(598), __webpack_require__(185)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Dom, events_1, disposeStore_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.CheckButton = void 0;
    class CheckButton extends disposeStore_1.DisposeStore {
        constructor(defaultState) {
            super();
            this.container = undefined;
            this.iconContext = undefined;
            this.iconContextElement = undefined;
            this.onDidToggle = events_1.CommonEvents.createGlobalAsyncEventEmitter();
            this._defaultState = defaultState;
            this.createElementLayout();
        }
        getState() {
            return this._defaultState;
        }
        ;
        setDefaultIcon() {
            return this.getState() == "checked" ? "CheckedCheckBox" : "UnCheckedCheckBox";
        }
        createElementLayout() {
            this.container = Dom.createElement('div', ['mv-component', 'checkbox-cl']);
            this.container.role = "checkbox";
            this.iconContext = Dom.createElementWithIcon("div", this.setDefaultIcon());
            this.iconContextElement = this.iconContext.element();
            this._register(Dom.addDisposableEventListener(this.container, Dom.EVENT_TYPES.CLICK, () => {
                this.toggle(this.getState());
            }));
            Dom.appendToDom(this.iconContextElement, this.container);
        }
        ;
        setCheckButtonState(state) {
            if (state == "checked") {
                this.iconContext.setIcon("UnCheckedCheckBox");
                this.onDidToggle.raiseEventAsync("unchecked");
            }
            else {
                this.iconContext.setIcon("CheckedCheckBox");
                this.onDidToggle.raiseEventAsync("checked");
            }
        }
        toggle(state) {
            if (state == "checked") {
                this.setCheckButtonState("checked");
                this._defaultState = "unchecked";
            }
            else {
                this.setCheckButtonState("unchecked");
                this._defaultState = "checked";
            }
        }
        get element() {
            return this.container;
        }
    }
    exports.CheckButton = CheckButton;
    ;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 569:
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.createDecorator = exports.util = void 0;
    var util;
    (function (util) {
        util.serviceIds = new Map();
        util.DI_TARGET = "$di#target";
        util.DI_DEPENDENCIES = "$di$dependencies";
        function getServiceDepenencies(ctor) {
            return ctor[util.DI_DEPENDENCIES] || [];
        }
        util.getServiceDepenencies = getServiceDepenencies;
    })(util = exports.util || (exports.util = {}));
    ;
    function storeServiceDependency(id, target, index) {
        if (target[util.DI_TARGET] === target) {
            target[util.DI_DEPENDENCIES].push({ id, index });
        }
        else {
            target[util.DI_DEPENDENCIES] = [{ id, index }];
            target[util.DI_TARGET] = target;
        }
    }
    function createDecorator(serviceId) {
        if (util.serviceIds.has(serviceId)) {
            //@ts-ignore
            return util.serviceIds.get(serviceId);
        }
        ;
        const id = function (target, key, index) {
            if (arguments.length !== 3) {
                throw new Error("Service Decorator should be used to decorate a parameter");
            }
            storeServiceDependency(id, target, index);
        };
        id.toString = () => serviceId;
        util.serviceIds.set(serviceId, id);
        return id;
    }
    exports.createDecorator = createDecorator;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 394:
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(569)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, decoratorServer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Injector = void 0;
    class Injector {
        constructor(services) {
            this._services = services;
        }
        getOrCreateServiceInstance(id) {
            let _instanceDesc = this._services.get(id);
            return _instanceDesc;
        }
        createInstance(ctor) {
            //organise dependencies relative to their position in the parameters
            let _serviceDependencies = decoratorServer_1.util.getServiceDepenencies(ctor).sort((a, b) => a.index - b.index);
            let _servieArgs = [];
            for (const dependency of _serviceDependencies) {
                let service = this.getOrCreateServiceInstance(dependency.id);
                if (!service) {
                    throw new Error("Unknown Service");
                }
                ;
                _servieArgs.push(service);
            }
            ;
            return new ctor(..._servieArgs);
        }
        ;
    }
    exports.Injector = Injector;
    ;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 253:
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.ServiceCollection = void 0;
    class ServiceCollection {
        constructor() {
            this._entries = new Map();
        }
        set(id, instance) {
            if (!this._entries.has(id)) {
                this._entries.set(id, instance);
            }
        }
        ;
        has(id) {
            return this._entries.has(id);
        }
        ;
        get(id) {
            return this._entries.get(id);
        }
    }
    exports.ServiceCollection = ServiceCollection;
    ;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 598:
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.CommonEvents = void 0;
    ;
    class _eventEmitterSingle {
        constructor() {
            this._listeners = new Map();
        }
        addEventListener(event, handler) {
            this._listeners.set(event, handler);
        }
        ;
        removeEventListener(event, handler) {
            if (this._listeners != null && this._listeners.has(event)) {
                this._listeners.delete(event);
            }
            else {
                throw new Error(`Removing Unknown Event ${event}`);
            }
        }
        emit(event, ...args) {
            if (this._listeners != null && this._listeners.has(event)) {
                this._listeners.get(event).apply(null, args);
            }
        }
        deleteEmitter() {
            this._listeners.clear();
            this._listeners = null;
        }
    }
    class _asyncEventEmitter extends _eventEmitterSingle {
        constructor() {
            super();
        }
        ;
        async addAsyncEventListener(event, handler) {
            this.addEventListener(event, handler);
            return Promise.resolve();
        }
        async removeAsyncEventListener(event, handler) {
            try {
                this.removeEventListener(event, handler);
                return Promise.resolve();
            }
            catch (err) {
                Promise.reject(err);
            }
        }
        async emitAsync(event, ...args) {
            try {
                this.emit(event, ...args);
                return Promise.resolve();
            }
            catch (e) {
                Promise.reject(e);
            }
        }
        ;
        async deleteEmitterAsync() {
            this.deleteEmitter();
        }
    }
    ;
    ;
    /**
     * Exposes an Event to the public;
     */
    class _globalEventEmitter {
        constructor() {
            this._eventListeners = [];
            this.didFireHandler = null;
        }
        raiseEvent(...args) {
            if (this._eventListeners != null && this._eventListeners.length > 0) {
                this._executeSubscribersWithArgs(args);
            }
        }
        ;
        _executeSubscribersWithArgs(args) {
            let _indicator = this._eventListeners.length;
            for (let i = 0; i < this._eventListeners.length; i++) {
                this._eventListeners[i].apply(null, args);
                _indicator--;
                if (_indicator == 0) {
                    this._invokeDidFireHandler();
                }
            }
        }
        _invokeDidFireHandler() {
            if (this.didFireHandler != null) {
                this.didFireHandler();
            }
        }
        _isRecorded(handler) {
            if (this._eventListeners.indexOf(handler) == -1) {
                return false;
            }
            else {
                return true;
            }
        }
        ;
        _deleteHandler(handler) {
            if (this._isRecorded(handler)) {
                let i = this._eventListeners.indexOf(handler);
                this._eventListeners.splice(i, 1);
            }
        }
        subscribe(handler) {
            if (!this._isRecorded(handler)) {
                this._eventListeners.push(handler);
            }
        }
        ;
        unsubscribe(handler) {
            this._deleteHandler(handler);
        }
        dispose() {
            this._eventListeners = null;
        }
    }
    class _globalAsyncEventEmitter extends _globalEventEmitter {
        constructor() {
            super();
        }
        async raiseEventAsync(...args) {
            if (this._eventListeners != null && this._eventListeners.length > 0) {
                this._executeSubscribersWithArgs(args);
            }
            return Promise.resolve();
        }
        ;
        async subscribeAsync(handler) {
            this.subscribe(handler);
            return Promise.resolve();
        }
        async unsubscribeAsync(handler) {
            this.unsubscribe(handler);
            return Promise.resolve();
        }
        ;
    }
    exports.CommonEvents = {
        createGlobalAsyncEventEmitter() {
            return new _globalAsyncEventEmitter();
        },
        createGlobalEventEmitter() {
            return new _globalEventEmitter();
        },
        createAsyncEventEmitter() {
            return new _asyncEventEmitter();
        },
        createEventEmitter() {
            return new _eventEmitterSingle();
        }
    };
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 185:
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.DisposeStore = exports._trackedDisposable = void 0;
    exports._trackedDisposable = "is_tracking_disposable";
    function trackDisposable(o) {
        if (o) {
            try {
                let _disposable = o;
                _disposable[exports._trackedDisposable] = true;
            }
            catch (e) {
                throw new Error(e);
            }
        }
    }
    function dispose(o) {
        if (o[Symbol.iterator]) {
            for (const t of o) {
                t.dispose();
            }
        }
    }
    class DisposeStore {
        constructor() {
            this._store = new Set();
        }
        dispose() {
            dispose(this._store);
            this._store.clear();
        }
        _register(o) {
            if (!this._store.has(o)) {
                trackDisposable(o);
                this._store.add(o);
            }
            return o;
        }
    }
    exports.DisposeStore = DisposeStore;
    ;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 780:
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.memoize = void 0;
    const memowiseInMemory = {};
    function clearCachedData(storagekeybase) {
        let _literalkeys = Object.keys(storagekeybase);
        if (_literalkeys.length > 8) {
            _literalkeys.forEach((key) => {
                delete storagekeybase[key];
            });
        }
    }
    function memoize(config) {
        return (target, propertyKey, descriptor) => {
            const orginalFunction = descriptor.value;
            if (!(memowiseInMemory[config.storagekey])) {
                //create base key in storage;
                memowiseInMemory[config.storagekey] = {};
            }
            else {
                clearCachedData(memowiseInMemory[config.storagekey]);
            }
            descriptor.value = function (...args) {
                let result = null;
                let properyStorage = memowiseInMemory[config.storagekey];
                if (properyStorage[args]) {
                    console.log(`windowHeight:${args}`, `proposedHeight:${properyStorage[args]}`);
                    result = orginalFunction.call(this, properyStorage[args]);
                }
                else {
                    let preposedValue = config.memoryModifier(args);
                    properyStorage[args] = preposedValue;
                    result = orginalFunction.call(this, preposedValue);
                    console.log(`windowHeight:${args}`, `proposedHeight:${properyStorage[args]}`);
                }
                return result;
            };
        };
    }
    exports.memoize = memoize;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 762:
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(569)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, decoratorServer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.IAd = void 0;
    exports.IAd = (0, decoratorServer_1.createDecorator)('AdService');
    ;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 745:
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(535), __webpack_require__(569), __webpack_require__(598), __webpack_require__(185)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Dom, decoratorServer_1, events_1, disposeStore_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.DragManager = exports.IDragAndDrop = void 0;
    exports.IDragAndDrop = (0, decoratorServer_1.createDecorator)('dragDropService');
    ;
    class DragManager extends disposeStore_1.DisposeStore {
        constructor() {
            super();
            this._container = undefined;
            this.onDidDragContainer = events_1.CommonEvents.createGlobalAsyncEventEmitter();
            this.onDidDropWithinContainer = events_1.CommonEvents.createGlobalAsyncEventEmitter();
            this.initializeService();
        }
        initializeService() {
            this.resetDomSettings();
        }
        ;
        resetDomSettings() {
            [Dom.EVENT_TYPES.DRAG_START, Dom.EVENT_TYPES.DRAG_LEAVE, Dom.EVENT_TYPES.DRAG_OVER, Dom.EVENT_TYPES.DROP].forEach((eventTypes) => {
                this._register(Dom.addDisposableEventListener(document, eventTypes, (e) => {
                    e.preventDefault();
                }));
            });
        }
        ;
        createDragEffectForContainer() {
            if (this._container) {
                this._register(Dom.addDisposableEventListener(this._container, Dom.EVENT_TYPES.DRAG_OVER, () => {
                    this.onDidDragContainer.raiseEventAsync("prcessing");
                }));
                this._register(Dom.addDisposableEventListener(this._container, Dom.EVENT_TYPES.DROP, (event) => {
                    const WebkiteFilePath = this.managerDroppedFile(event);
                    this.onDidDropWithinContainer.raiseEventAsync(WebkiteFilePath.webkitRelativePath);
                }));
                this._register(Dom.addDisposableEventListener(this._container, Dom.EVENT_TYPES.DRAG_LEAVE, () => {
                    this.onDidDragContainer.raiseEventAsync("stopped");
                }));
            }
        }
        ;
        isContainerDefined() {
            if (this._container) {
                return true;
            }
            else {
                return false;
            }
        }
        getContainer() {
            return this._container;
        }
        managerDroppedFile(dragEvent) {
            const File = dragEvent.dataTransfer.files[0];
            return File;
        }
        initializeContainer(options) {
            this._container = options.container;
            this.createDragEffectForContainer();
        }
    }
    exports.DragManager = DragManager;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 678:
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(569)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, decoratorServer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.ProductData = exports.IProduct = void 0;
    exports.IProduct = (0, decoratorServer_1.createDecorator)('ProductService');
    ;
    exports.ProductData = {
        name: "Miver",
        verison: "1.0.0",
        basehref: "/"
    };
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 615:
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(569), __webpack_require__(598)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, decoratorServer_1, events_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Theme = exports.ITheme = void 0;
    exports.ITheme = (0, decoratorServer_1.createDecorator)('themeService');
    ;
    //light-theme-props
    const MVLightThemeProperties = {
        primaryThemeColor: "#f8f8f8",
        primaryShadowColor: "#00000029",
        onPrimaryThemeColor: "#131313c4",
        secondaryThemeColor: "#D24848",
        secondaryShadowColor: "#d24848a4",
        onSecondaryThemeColor: "#fdf2f2",
        errorBackgroundColor: "#d10404f1",
        warningBackgroundColor: "#e7bf0bf1",
        infoBackgroundColor: "#0b7de7f1",
        stationBackgroundColor: "#ededed",
        dragStateColor: "#d7eaf7",
        snackBackgroundColor: "#f3ebeb",
    };
    //dark-theme-props
    const MVDarkThemeProperties = {
        primaryThemeColor: "#2c2c2c",
        primaryShadowColor: "#000000c2",
        onPrimaryThemeColor: "#e1d0d0",
        secondaryThemeColor: "#D24848",
        secondaryShadowColor: "#d24848a4",
        onSecondaryThemeColor: "#fdf2f2",
        errorBackgroundColor: "#d10404f1",
        warningBackgroundColor: "#e7bf0bf1",
        infoBackgroundColor: "#0b7de7f1",
        stationBackgroundColor: "#000",
        dragStateColor: "#393a40",
        snackBackgroundColor: "#1a1a1a",
    };
    const mvPropertyCssKeys = [
        "--primary-theme-color",
        "--primay-shadow-color",
        "--on-primary-theme-color",
        "--secondary-theme-color",
        "--secondary-shadow-color",
        "--on-secondary-theme-color",
        "--error-background-color",
        "--warning-background-color",
        "--info-background-color",
        "--station-background-color",
        "--drag-background-color",
        "--snack-background-color",
    ];
    class Theme {
        constructor() {
            this.theme = undefined;
            this.currentBaseContainer = undefined;
            this.onDidChangeTheme = events_1.CommonEvents.createGlobalAsyncEventEmitter();
            //default theme;
            this.initialize();
        }
        initialize() {
            this.setUpThemeLayout();
        }
        ;
        formatBaseStyleString(container, is) {
            if (is == "dark") {
                mvPropertyCssKeys.forEach((property, index) => {
                    container.style.setProperty(property, Object.values(MVDarkThemeProperties)[index]);
                });
            }
            else {
                mvPropertyCssKeys.forEach((property, index) => {
                    container.style.setProperty(property, Object.values(MVLightThemeProperties)[index]);
                });
            }
        }
        initializeThemeSystem(baseContainer) {
            this.currentBaseContainer = baseContainer;
            if (this.theme == "light") {
                this.formatBaseStyleString(baseContainer, this.theme);
            }
            else {
                this.formatBaseStyleString(baseContainer, this.theme);
            }
            ;
        }
        ;
        updateThemeStorageKey(theme) {
            localStorage.setItem('mv-theme', theme);
        }
        setUpThemeLayout() {
            let mvThemeKey = this.getCurrentThemeKeyFromStorage();
            if (mvThemeKey && (mvThemeKey == "dark" || mvThemeKey == "light")) {
                this.theme = mvThemeKey;
            }
            else {
                this.setUserDefaultTheme();
                this.storeUserThemeKey();
            }
        }
        ;
        storeUserThemeKey() {
            localStorage.setItem("mv-theme", this.theme);
        }
        setUserDefaultTheme() {
            this.theme = "dark";
        }
        getCurrentThemeKeyFromStorage() {
            const themeKey = localStorage.getItem('mv-theme');
            return themeKey;
        }
        setTheme(theme) {
            if (this.currentBaseContainer) {
                this.formatBaseStyleString(this.currentBaseContainer, theme);
                this.onDidChangeTheme.raiseEventAsync(theme);
                this.theme = theme;
                this.updateThemeStorageKey(theme);
            }
        }
        ;
    }
    exports.Theme = Theme;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 421:
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(598), __webpack_require__(569), __webpack_require__(185), __webpack_require__(535)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, events_1, decoratorServer_1, disposeStore_1, dom_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.WindowResizer = exports.IWindowResizer = void 0;
    exports.IWindowResizer = (0, decoratorServer_1.createDecorator)('windowResizer');
    class WindowResizer extends disposeStore_1.DisposeStore {
        constructor() {
            super();
            this.onDidResize = events_1.CommonEvents.createGlobalAsyncEventEmitter();
            this.initializeResizer();
        }
        ;
        dispose() {
            super.dispose();
        }
        getHeight() {
            return window.innerHeight;
        }
        getWidth() {
            return window.innerWidth;
        }
        initializeResizer() {
            this._register((0, dom_1.addDisposableEventListener)(window, dom_1.EVENT_TYPES.RESIZE, () => {
                setTimeout(() => {
                    this.onDidResize.raiseEventAsync({ width: window.innerWidth, height: window.innerHeight });
                }, 9);
            }));
        }
    }
    exports.WindowResizer = WindowResizer;
    ;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 126:
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(203), __webpack_require__(165), __webpack_require__(535), __webpack_require__(569), __webpack_require__(394), __webpack_require__(253), __webpack_require__(185), __webpack_require__(780), __webpack_require__(421), __webpack_require__(678), __webpack_require__(762), __webpack_require__(745), __webpack_require__(615), __webpack_require__(538), __webpack_require__(90), __webpack_require__(415), __webpack_require__(73), __webpack_require__(634), __webpack_require__(853), __webpack_require__(317)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 538:
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.AdContentdata = void 0;
    exports.AdContentdata = {
        content: "Make More With MTN MoMo Pay and Be the Best Customer",
        backgroundColor: "#fffb00",
        foregroundColor: "#000",
        linkSource: "/"
    };
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(256);
/******/ 	
/******/ })()
;