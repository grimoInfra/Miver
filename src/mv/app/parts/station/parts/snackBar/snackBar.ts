/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as Dom from "mv/base/browser/dom";
import { DisposeStore } from "mv/platform/disposeStore";
import "./media/snackBar.css"

export class SnackBarContainer extends DisposeStore {

    private container: HTMLElement | undefined = undefined;

    private containerWrapper: HTMLElement | undefined = undefined;

    //link-cion
    private linkButtonWrapper: HTMLElement | undefined = undefined;
    private linkIcon: HTMLElement | undefined = undefined;

    //add-cion
    private addButtonWrapper: HTMLElement | undefined = undefined;
    private addIcon: HTMLElement | undefined = undefined;

    //more-cion
    private moreButtonWrapper: HTMLElement | undefined = undefined;
    private moreIcon: HTMLElement | undefined = undefined;


    constructor() {
        super()
        this.initializeComponent()
    }

    private initializeComponent() {
        this.createElementLayout();  
    }

    private createElementLayout() {
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
            //use to invoke the magnetic-link and urltotorrent-file
            
            
        }));

        this._register(Dom.addDisposableEventListener(this.addButtonWrapper, Dom.EVENT_TYPES.CLICK, () => {
            //used to invoke the add file facility
        }));

        this._register(Dom.addDisposableEventListener(this.moreButtonWrapper, Dom.EVENT_TYPES.CLICK, () => {
            //used to invoke a dialog box;
        }));


        let pairBundles: Array<HTMLElement[]> = [
            [this.linkButtonWrapper, this.linkIcon],
            [this.addButtonWrapper, this.addIcon],
            [this.moreButtonWrapper, this.moreIcon]
        ];

        for (let bundle of pairBundles) {
            Dom.appendToDom(bundle[1], bundle[0]);
        };

        Dom.appendElements([this.linkButtonWrapper,this.addButtonWrapper,this.moreButtonWrapper], this.containerWrapper);
        Dom.appendToDom(this.containerWrapper,this.container)


    }

    public get element() {
        return this.container!;
    }
}