/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as Dom from "mv/base/browser/dom";
import { IProduct,IProductService } from "mv/platform/services/product";
import { ProductLink } from "mv/app/parts/topBar/parts/productLink/productLink";
import { ThemeContext } from "mv/app/parts/topBar/parts/theme/themeContext";
import { IThemeService,ITheme } from "mv/platform/services/themeService/themeService";
import "./media/topBar.css";

export class TopBar implements Dom.IElementComponent {
    
    private productLink: ProductLink | undefined = undefined;
    private themeContext: ThemeContext | undefined = undefined;
    private container: HTMLElement | undefined = undefined;
    private splitView: HTMLElement | undefined = undefined;

    constructor(
        @IProduct private readonly productService: IProductService,
        @ITheme private readonly themeService:IThemeService
    ) {
        this.initializeComponent()
    };

    private initializeComponent() {
        this.createElementFoundation()  
    };

    private createElementFoundation() {
        this.productLink = new ProductLink(this.productService);
        this.themeContext = new ThemeContext(this.themeService)
        this.container = Dom.createElement("div", ['top-bar-container']);
        this.container.role = "banner"
        this.container.ariaLabel = "Header"
        this.splitView = Dom.createElement("div", ['top-bar-split-view']);


        Dom.appendElements([this.productLink.element,this.themeContext.element], this.splitView);
        Dom.appendToDom(this.splitView, this.container);

    }
    public get element() {
        return this.container!
    }
   
};