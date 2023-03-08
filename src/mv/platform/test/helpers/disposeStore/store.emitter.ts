/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { DisposeStore,IDisposable,_trackedDisposable } from "mv/platform/disposeStore";
import { CommonEvents, IAsyncGlobalEventEmitter } from "mv/base/node/events/events";

export class DisposableStoreTestEventEmitters extends DisposeStore {
    public disposableComponent: IDisposable | undefined = undefined;

    public testEmitter:IAsyncGlobalEventEmitter<string>|undefined = undefined;

    public testSSD:string = " "
    public registerEventEmitter(){
        this.testEmitter = CommonEvents.createGlobalAsyncEventEmitter<string>();

    };


    public createDisposableEventEmitter(){
        if(this.testEmitter){
            this._register(this.testEmitter).subscribeAsync(this.createEventEmitterListener.bind(this));
            this.disposableComponent = this.testEmitter;
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

    private createEventEmitterListener(value:string){
        this.testSSD = value
    }

    public get disposeStoreSize() {
        return this._store.size;
    };
    

    public override dispose(): void {
        super.dispose();
        this.testEmitter = undefined;
        this.disposableComponent = undefined;
    }

}