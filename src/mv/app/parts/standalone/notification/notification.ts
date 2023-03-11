/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as Dom from "mv/base/browser/dom";
import { IAsyncGlobalEventEmitter } from "mv/base/node/events/events";
import { DisposeStore } from "mv/platform/disposeStore";

type NAction = "default" | "extended";

enum Severity {
    INFO = 0,
    WARNING = 1,
    ERROR = 2,
    LOADING = 3
}

interface IAction {
    content: string;
}

interface INotificationActions {
    defaultAction?:IAction,
    extendAction?: IAction;
}

interface INotificationServiceProvide {

    severity: Severity;
    message: string,
    id:string,
    dismisabble?: boolean;
    timeout?: number;
    hasActions?: boolean;
    actions?: INotificationActions;

};

export interface INotificationItem {
    /**
     * an event fired when a user click one of the actions
     */
    onDidFireAction: IAsyncGlobalEventEmitter<IAction>;
    /**
     * display the notification item
     */
    display(): void;
    dispose(): void;
}

export class NotificaionItem extends DisposeStore {

    //main-container
    private container: HTMLElement | undefined = undefined;
    private _properties: INotificationServiceProvide;

    //used to forcefully dismiss the notification;
    private notificationDismisserContainer: HTMLElement | undefined = undefined;

    //main-element-handles


    //---first container--
    //used to act as a container for the icon
    private itemLogoContainer: HTMLElement | undefined = undefined
    
    //will be available until we need it
    private itemProgressRing: HTMLElement | undefined = undefined;

    //icons container
    private iconContext: Dom.IElementComponent | undefined = undefined;
    private iconContextContainer: HTMLElement | undefined = undefined;

    //--second-container
    private messageContainer: HTMLElement | undefined = undefined;
    private messageContainerWrapper: HTMLElement | undefined = undefined;

    //--third-container
    private actionsContainer: HTMLElement | undefined = undefined;
    private defaultActionContainer: HTMLElement | undefined = undefined;
    private extendedActionContainer: HTMLElement | undefined = undefined;

    constructor(properties:INotificationServiceProvide) {
        super();
        this._properties = properties;
        this.intializeNotificationItem();
    };

    private intializeNotificationItem() {
        this.createElementLayout();
    };

    private createElementLayout() {
        this.container = Dom.createElement('div', ['notification-item']);
        this.notificationDismisserContainer = Dom.createElementWithIcon("div", "CloseControl").element();

        //main-element handles
        this.itemLogoContainer = Dom.createElement('div', ['notification-logo-container']);
        this.itemProgressRing = Dom.createElement('div',)


    }

    public item() {
        return this.container;
    }



};