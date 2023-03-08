/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as Dom from "mv/base/browser/dom";
import { IAsyncGlobalEventEmitter, CommonEvents } from "mv/base/node/events/events";
import { DisposeStore } from "mv/platform/disposeStore";
import { _materialIcons } from "mv/base/browser/material-icons";

export type IToggleState = "checked" | "unchecked";

export class CheckButton extends DisposeStore {

    private container: HTMLElement | undefined = undefined;
    private iconContext: Dom.IconContext | undefined = undefined;
    private iconContextElement: HTMLElement | undefined = undefined;

    public onDidToggle: IAsyncGlobalEventEmitter<IToggleState> = CommonEvents.createGlobalAsyncEventEmitter<IToggleState>();

    private _defaultState: IToggleState;

    constructor(defaultState: IToggleState) {
        super();
        this._defaultState = defaultState;
        this.createElementLayout()

    }

    public getState() {
        return this._defaultState;
    };

    private setDefaultIcon(): _materialIcons {
        return this.getState() == "checked" ? "CheckedCheckBox" : "UnCheckedCheckBox";
    }

    private createElementLayout() {
        this.container = Dom.createElement('div', ['mv-component', 'checkbox-cl']);
        this.container.role = "checkbox"
        this.iconContext = Dom.createElementWithIcon("div", this.setDefaultIcon());
        this.iconContextElement = this.iconContext.element();

        this._register(Dom.addDisposableEventListener(this.container, Dom.EVENT_TYPES.CLICK, () => {
            this.toggle(this.getState())
        }));

        Dom.appendToDom(this.iconContextElement, this.container);
    };

    private setCheckButtonState(state: IToggleState) {
        if (state == "checked") {
            this.iconContext!.setIcon("UnCheckedCheckBox");
            this.onDidToggle.raiseEventAsync("unchecked")
        } else {
            this.iconContext!.setIcon("CheckedCheckBox");
            this.onDidToggle.raiseEventAsync("checked");

        }
    }

    private toggle(state: IToggleState) {
        if (state == "checked") {
            this.setCheckButtonState("checked");
            this._defaultState = "unchecked";
        } else {
            this.setCheckButtonState("unchecked");
            this._defaultState = "checked";
        }
    }

    public get element() {
        return this.container!;
    }

};