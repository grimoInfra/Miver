/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as Dom from "mv/base/browser/dom";
import { createDecorator as createServiceDecorator } from "mv/base/node/decorators/decoratorServer";
import { CommonEvents, IAsyncGlobalEventEmitter } from "mv/base/node/events/events";
import { DisposeStore } from "mv/platform/disposeStore";

export const IDragAndDrop = createServiceDecorator<IDragAndDropService>('dragDropService');

export type dragState = "prcessing" | "stopped"

interface IDragContainerOptions {
    container: HTMLElement;
}

export interface IDragAndDropService {

    /**
     * Makes a container Dragable and provided relevant options to it
     */
    initializeContainer(options:IDragContainerOptions): void;
    
    /**
     * An event called whenever a user drags files over the container
     * 
     * provides a state to show whether the file is valid or not;
     */
    onDidDragContainer: IAsyncGlobalEventEmitter<dragState>;

    /**
     * An event called when a user has dropped a file
     * and provided the file path;
     */
    onDidDropWithinContainer: IAsyncGlobalEventEmitter<string>;


    /**
     * Gets the drag container
     */
    getContainer(): HTMLElement;

    isContainerDefined(): boolean;

    //dispose
    dispose(): void;
};

export class DragManager extends DisposeStore implements IDragAndDropService {
    private _container: HTMLElement | undefined = undefined;

    public onDidDragContainer: IAsyncGlobalEventEmitter<dragState>;
    public onDidDropWithinContainer: IAsyncGlobalEventEmitter<string>;

    constructor() {
        super()

        this.onDidDragContainer = CommonEvents.createGlobalAsyncEventEmitter()
        this.onDidDropWithinContainer = CommonEvents.createGlobalAsyncEventEmitter()
        this.initializeService();
    }

    private initializeService() {
        this.resetDomSettings()
    };

    private resetDomSettings() {
        [Dom.EVENT_TYPES.DRAG_START, Dom.EVENT_TYPES.DRAG_LEAVE, Dom.EVENT_TYPES.DRAG_OVER, Dom.EVENT_TYPES.DROP].forEach((eventTypes) => {
            this._register(Dom.addDisposableEventListener(document, eventTypes, (e:Event) => {
                e.preventDefault();
            }))
        })
    };

    private createDragEffectForContainer() {
        if (this._container) {
            this._register(Dom.addDisposableEventListener(this._container, Dom.EVENT_TYPES.DRAG_OVER, () => {
                this.onDidDragContainer.raiseEventAsync("prcessing")
            }));

            this._register(Dom.addDisposableEventListener(this._container, Dom.EVENT_TYPES.DROP, (event:DragEvent) => {
                const WebkiteFilePath = this.managerDroppedFile(event)
                this.onDidDropWithinContainer.raiseEventAsync(WebkiteFilePath.webkitRelativePath)
            }));


            this._register(Dom.addDisposableEventListener(this._container, Dom.EVENT_TYPES.DRAG_LEAVE, () => {
                this.onDidDragContainer.raiseEventAsync("stopped");
            }));

            
        }
    };

    public isContainerDefined(): boolean {
        if (this._container) {
            return true;
        }else{
            return false
        }
    }

    public getContainer(): HTMLElement {
        return this._container!;
    }

    private managerDroppedFile(dragEvent: DragEvent) {
        const File = dragEvent.dataTransfer!.files[0]
        return File;
    }

    public initializeContainer(options: IDragContainerOptions): void {
        this._container = options.container;
        this.createDragEffectForContainer()

    }
}