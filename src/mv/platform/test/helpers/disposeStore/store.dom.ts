/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { addDisposableEventListener, EVENT_TYPES } from "mv/base/browser/dom";
import { DisposeStore,IDisposable,_trackedDisposable } from "mv/platform/disposeStore";

export class DisposableStoreTestDomEventListeners extends DisposeStore {

    public disposableComponent: IDisposable | undefined = undefined;
    public testElement:HTMLElement|undefined = undefined
    public testSSD:string = ""
    
    public registerTestElement(element:HTMLElement) {
        this.testElement = element
    }

    public makeDidClickAction() {
        if (this.testElement) {
            this.testElement.click()
        }
    };

    public registerDisposable() {
        if (this.disposableComponent) {
            this._register(this.disposableComponent);
        }
    };

    public isTracked() {
        let result = false;
        if (this.disposableComponent) {
            let _disComponent = this.disposableComponent! as unknown as any;
            if (_disComponent[_trackedDisposable]) {
                result = true;
            } else {
                result = false;
            }
        } else {
            throw new Error('disposable component not registered');
        }
        return result;
    }

    public override dispose(): void {
        super.dispose();
        this.testElement = undefined;
        this.disposableComponent = undefined;
    }

    public createDisposableComponent() {
        this.disposableComponent = addDisposableEventListener(this.testElement!, EVENT_TYPES.CLICK, () => {
            this.testSSD = "Click Listener works"
        })
    }

    public get disposeStoreSize() {
        return this._store.size;
    };
    

};