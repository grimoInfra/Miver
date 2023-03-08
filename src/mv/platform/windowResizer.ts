/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { CommonEvents, IAsyncGlobalEventEmitter } from "mv/base/node/events/events";
import { createDecorator } from "mv/base/node/decorators/decoratorServer";
import { DisposeStore } from "./disposeStore";
import { addDisposableEventListener, EVENT_TYPES } from "mv/base/browser/dom";

export const IWindowResizer = createDecorator<IWindowResizerService>('windowResizer')

export interface IWindowProps {
    width: number;
    height: number;

}

export interface IWindowResizerService {
    
    onDidResize: IAsyncGlobalEventEmitter<IWindowProps>;
    getWidth(): number;
    getHeight(): number;
    dispose(): void;
}

export class WindowResizer extends DisposeStore implements IWindowResizerService{

    public onDidResize: IAsyncGlobalEventEmitter<IWindowProps> = CommonEvents.createGlobalAsyncEventEmitter();

    constructor() { 
        super();
        this.initializeResizer()
    };

    public override dispose(): void {
        super.dispose();
    }

    public getHeight(): number {
        return window.innerHeight;
    }

    public getWidth(): number {
        return window.innerWidth
    }

    private initializeResizer() {
        this._register(addDisposableEventListener(window, EVENT_TYPES.RESIZE, () => {
            setTimeout(() => {
                this.onDidResize.raiseEventAsync({width : window.innerWidth,height:window.innerHeight})
           },9)
       }))
        
    }
   

};