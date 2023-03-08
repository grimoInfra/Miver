/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as Dom from "mv/base/browser/dom";
import { IProductService } from "mv/platform/services/product";
import "./media/productLink.css"


export class ProductLink {

    private productLinkContainer: HTMLElement | undefined = undefined;
    private anchorTagElement: HTMLAnchorElement | undefined = undefined;
    private productIdContainer: HTMLElement | undefined = undefined;
    private productLogo: HTMLElement | undefined = undefined;
    

    constructor(private readonly productService:IProductService) {
        this.initializeComponent()  
    };

    private initializeComponent() {
        this.createComponentFoundation();
    };

    private createComponentFoundation() {
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
        
    };

    public get element() {
        return this.productLinkContainer!;
    }

}