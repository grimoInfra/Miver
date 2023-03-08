/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as Dom from "mv/base/browser/dom";
import { IAsyncGlobalEventEmitter } from "mv/base/node/events/events";
import { DisposeStore } from "mv/platform/disposeStore";
import { IDragAndDropService,dragState } from "mv/platform/services/dragDropService/dragDropService";
import "./media/dragdrop.css";

export class DragAndDropContainer extends DisposeStore{

    private container: HTMLElement | undefined = undefined;
    private IdleBlobContainer: HTMLElement | undefined = undefined;
    private dragIconElement: HTMLElement | undefined = undefined;
    private dragDescriptionContainer: HTMLElement | undefined = undefined;
    public onDidDrop: IAsyncGlobalEventEmitter<string> | undefined = undefined;


    constructor(private readonly dragService:IDragAndDropService) { 
        super();
        this.initializeElementComponent()
    }

    private initializeElementComponent() {
        this.createElementFoundation();
    };

    private createElementFoundation() {
        this.container = Dom.createElement("div", ['drag-drop-container']);
        this.IdleBlobContainer = Dom.createElement("div", ['idle-blob-container']);
        this.dragDescriptionContainer = Dom.createElement("div", ['drag-drop-description']);
        this.dragIconElement = Dom.createElementWithIcon("div", "IdleBackCover").element();
        this.dragIconElement.classList.add('drag-icon-element')
        this.dragDescriptionContainer.textContent = "Drag & Drop .torrent file";

        this.dragService.initializeContainer({container : this.container})

        Dom.appendElements([this.dragIconElement,this.dragDescriptionContainer],this.IdleBlobContainer)
        Dom.appendToDom(this.IdleBlobContainer, this.container);
        this.makeEnvironment()
    };

    private makeEnvironment() {
        if (this.dragService.isContainerDefined()) {
            this.registerEventListeners()
        }
    };

    private registerEventListeners() {
        this.dragService.onDidDragContainer.subscribeAsync(this.dragStateHandler.bind(this))
        
    };

    private dragStateHandler(args: dragState) {
        if (args == "prcessing") {
            Dom.setElementBackgroundColor(this.IdleBlobContainer!,"var(--drag-background-color)")
        } else {
            Dom.setElementBackgroundColor(this.IdleBlobContainer!,"unset")
            
        }
    }

    public get element() {
        return this.container!;
    }


};