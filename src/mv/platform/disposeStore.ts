/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


/**
 * A disposable is considered leaked if its not a child of a parent disposable
 */


/**
 * A dispose interface;
 */
export interface IDisposable {
    dispose(): void;
}


export const _trackedDisposable = "is_tracking_disposable";

function trackDisposable(o: IDisposable) {
    if (o) {

        try {
            let _disposable = o! as unknown as any;
            _disposable[_trackedDisposable] = true
        } catch (e) {
            throw new Error(e)
        }
    }
}

function dispose(o: Set<IDisposable>) {
    if (o[Symbol.iterator]) {
        for (const t of o) {
            t.dispose();
        }
    }
}

export  class DisposeStore implements IDisposable {


    public _store: Set<IDisposable> = new Set<IDisposable>();

    public dispose(): void {
        dispose(this._store);
        this._store.clear();
    }

    public _register<T extends IDisposable>(o: T) {

        if (!this._store.has(o)) {

            trackDisposable(o)
            this._store.add(o)

        }
        return o

    }

};