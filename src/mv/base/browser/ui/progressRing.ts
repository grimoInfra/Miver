/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as Dom from "mv/base/browser/dom";
import { CommonEvents, IAsyncGlobalEventEmitter } from "mv/base/node/events/events";
import { DisposeStore } from "mv/platform/disposeStore";


type progressRingState = "active" | "dormant";


enum RING_STRATEGY  {
    SETTLED = "settled-ring",
    ROLLING = "rolling-ring"
}

export class ProgressRing extends DisposeStore {

    private container: HTMLElement | undefined = undefined;
    private ringContainer: HTMLElement | undefined = undefined;
    private ringMainAct: HTMLElement | undefined = undefined;
    private _state: progressRingState = 'dormant';
    public onDidChangeRingState: IAsyncGlobalEventEmitter<progressRingState>;

    constructor() {
        super();
        this.onDidChangeRingState = CommonEvents.createGlobalAsyncEventEmitter();
        this.createElementLayout();
    }


    private createElementLayout() {
        this.container = Dom.createElement('div', ['mv-component', 'progress-cl'])!;
        this.ringContainer = Dom.createElement('div', ['ring-container']);
        this.ringMainAct = Dom.createElement('div', ['ring-act', RING_STRATEGY.SETTLED]);

        Dom.appendToDom(this.ringMainAct, this.ringContainer);
        Dom.appendToDom(this.ringContainer,this.container);


    };

    public get element() {
        return this.container!;
    }

    private applySettledStrategy() {
        if (this.ringMainAct) {
            this.ringMainAct.classList.remove(RING_STRATEGY.ROLLING);
            this.ringMainAct.classList.add(RING_STRATEGY.SETTLED);
        }
    };


    private applyRollingStrategy() {
        if (this.ringMainAct) {
            this.ringMainAct.classList.remove(RING_STRATEGY.SETTLED);
            this.ringMainAct.classList.add(RING_STRATEGY.ROLLING);
        }
    }

    private invokeRingCurrentStateEvenly() {
        if (this._state == "active") {
            this.applyRollingStrategy()
            
        } else {
            this.applySettledStrategy()
        }
    }

    public setRingState(state: progressRingState) {
        this._state = state;
        this.invokeRingCurrentStateEvenly()
        this.onDidChangeRingState.raiseEventAsync(state);
    };

    public override dispose(): void {
        super.dispose();
        this.onDidChangeRingState.dispose();
    }



}