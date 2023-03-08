/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as Dom from "mv/base/browser/dom";
import { IAd,IAdService } from "mv/platform/services/adService/adService";

export interface IAdOption {
    dispose(): void;
    element: HTMLElement;
    isVisible(value: boolean): void;
}

export class AdContainer implements IAdOption {

    private container: HTMLElement | undefined = undefined;
    private mainAdContent: HTMLElement | undefined = undefined;
    private adLinkSource: HTMLAnchorElement | undefined = undefined;

    constructor(@IAd private readonly adService:IAdService) {
        this.initializeComponent();
    }

    private initializeComponent() {
        this.createElementLayout();
    }

    private applyRawStyles() {
        if (this.container && this.adLinkSource) {
            Dom.layElement(this.container, { width: "100%", height: "30px" });
            Dom.layElement(this.adLinkSource, { width: "100%", height: "30px" });
            Dom.makeCenter(this.adLinkSource);
            this.adLinkSource.style.textDecoration = "none";
            this.mainAdContent!.style.fontSize = "15px";
            this.mainAdContent!.style.fontFamily = 'sans-serif'
        }
    }

    private createElementLayout() {
        this.container = Dom.createElement('div', ['ad-service-container']);
        this.adLinkSource = Dom.createElement('a', ['ad-link-source']);
        this.mainAdContent = Dom.createElement('div', ['ad-main-content']);

        this.mainAdContent.textContent = this.adService.content;
        this.adLinkSource.href = this.adService.linkSource;

        this.container.style.backgroundColor = this.adService.backgroundColor;
        this.mainAdContent.style.color = this.adService.foregroundColor;
        this.applyRawStyles();

        Dom.addDisposableEventListener(this.container, Dom.EVENT_TYPES.MOUSE_MOVE, () => {
            this.mainAdContent!.style.textDecoration = "underline";
        })
        Dom.addDisposableEventListener(this.container, Dom.EVENT_TYPES.MOUSE_LEAVE, () => {
            this.mainAdContent!.style.textDecoration = "none";
        });
        Dom.hideElement(this.container)

        Dom.appendElements([this.mainAdContent], this.adLinkSource);
        Dom.appendToDom(this.adLinkSource, this.container);
    }


    public dispose(): void {
        this.container!.remove()
    }
    public isVisible(value: boolean): void {
        if (value) {
            Dom.showElement("block", this.container)
        } else {
            Dom.hideElement(this.container)
            
        }
    }

    public get element(){
        return this.container!;
    }

};