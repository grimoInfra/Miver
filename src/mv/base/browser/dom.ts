/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDisposable } from "mv/platform/disposeStore";
import { MaterialIcons,_materialIcons } from "mv/base/browser/material-icons";

export const EVENT_TYPES = {
    FOCUS: 'focus',
    CLICK: 'click',
    RESIZE: 'resize',
    KEY_DOWN: 'keydown',
    KEY_UP: 'keyup',
    MOUSE_DOWN: 'mousedown',
    MOUSE_MOVE: 'mousemove',
    MOUSE_OVER: 'mouseover',
    MOUSE_LEAVE: 'mouseleave',
    MOUSE_UP: 'mouseup',
    DBL_CLICk: 'dblclick',
    BLUR: 'blur',
    DRAG_START : "dragstart",
    DRAG_LEAVE: "dragleave",
    DRAG_OVER: "dragover",
    DROP: "drop",
    FOCUS_OUT: 'focusout'
}


class DomListener implements IDisposable {
    private _node: EventTarget | null;
    private _handler: any;
    private _options: any;
    private readonly _event: string;
    constructor(node: EventTarget, event: string, handler: (e: any) => any, options?: any) {
        this._node = node;
        this._handler = handler;
        this._event = event;
        this._options = options;
        this._node.addEventListener(this._event, this._handler, this._options);
    }
    public dispose() {
        if (this._handler != null) {
            this._node!.removeEventListener(this._event, this._handler, this._options)
        };
        //clean up resources;
        this._handler = null;
        this._node = null;
        this._options = null;
    }
}


export interface IElementComponent {
    element:HTMLElement
}

export function $<T extends Element>(element: string, parentElement?: HTMLDivElement | HTMLElement) {
    let _parentElement = parentElement ?? document;
    let _result = _parentElement.querySelector<T>(element);
    if (_result) {
        return _result;
    } else {
        return undefined;
    }
}
export function $$<T extends Element>(element: string, parentElement?: HTMLDivElement | HTMLElement) {
    let _parentElement = parentElement ?? document;
    let _result = _parentElement.querySelectorAll<T>(element);
    if (_result.length > 0) {
        return _result;
    } else {
        return undefined;
    }
}

export function addDisposableEventListener<K extends keyof GlobalEventHandlersEventMap>(node: EventTarget, type: K, handler: (event: GlobalEventHandlersEventMap[K]) => void, useCapture?: boolean): IDisposable;
export function addDisposableEventListener(node: EventTarget, type: string, handler: (event: any) => void, useCapture?: boolean): IDisposable;
export function addDisposableEventListener(node: EventTarget, type: string, handler: (event: any) => void, options: AddEventListenerOptions): IDisposable;
export function addDisposableEventListener(node: EventTarget, type: string, handler: (event: any) => void, useCaptureOrOptions?: boolean | AddEventListenerOptions): IDisposable {
    return new DomListener(node, type, handler, useCaptureOrOptions)
}


interface IStateSourceObject {
    currentState: {};
    newState: {}
}
interface IComponent extends CustomElementConstructor {
    is: string
}

/**
 * Used to define a custom Element
 */

export function defineComponent(ctor: IComponent) {
    customElements.define(ctor.is, ctor)
}

export function setState(sourceObject: IStateSourceObject): void {
    let _currentState = sourceObject.currentState
    let _assignedState = Object.assign(_currentState, sourceObject.newState);
    sourceObject.currentState = _assignedState;
}

export function createStyleElement(data: string, id: string) {
    const styleElement = document.createElement('style');
    styleElement.id = id;
    styleElement.media = 'screen';
    styleElement.type = 'text/css';
    styleElement.textContent = data;
    return styleElement
}

export function createHoverBindClass(nodes: Node[], hoverClass: string) {
    for (const _node of nodes) {
        const _element = _node! as HTMLElement;
        _element.classList.add(hoverClass);
    }
}


export function createFadeInAnimationElement(element: HTMLElement): IDisposable {
    if (element) {
        element.classList.add('mdl-fadein')
    }
    return { dispose: () => { element.classList.remove('mdl-fadein') } }
}

export function createFadeOutAnimationElement(element: HTMLElement): IDisposable {
    if (element) {
        element.classList.add('mdl-fadeout')
    }
    return { dispose: () => { element.classList.remove('mdl-fadeout') } }
}

export function attachSuspendClass(element: HTMLElement, _class: string) {
    if (element) {
        element.classList.add(_class)
    }
    return { dispose: () => { element.classList.remove(_class) } }
}

export function createSpinAnimationElement(element: HTMLElement): IDisposable {
    if (element) {
        element.classList.add('mdl-spin');
    }
    return { dispose: () => { element.classList.remove('mdl-spin') } }
}

export function createReflow(element: HTMLElement): IDisposable {
    if (element) {
        element.classList.add('mdl-reflow-animation')
    }
    return { dispose: () => { element.classList.remove('mdl-reflow-animation') } }

}

export function makeCenter(element: HTMLElement) {
    element.style.display = "flex";
    element.style.alignItems = "center";
    element.style.justifyContent = "center"
}


export function setElementBackgroundColor(element: HTMLElement, hexColor: string) {
    if (element) {
        element.style.backgroundColor = hexColor;
    }
};

export function appendToDom(element: HTMLElement, parent?: HTMLElement) {
    if (parent) {
        parent.appendChild(element);
    } else {
        document.body.append(element);
    }
};

export function appendElements(nodes: Node[], parent?: HTMLElement) {
    if (parent) {
        parent.append(...nodes)
    }
}

export function layElement(element: HTMLElement | undefined, dimensions: { width?: string, height?: string }) {
    if (element) {
        element.style.width = dimensions.width ?? " "
        element.style.height = dimensions.height ?? " "

    }
};
export function hideElement(element: HTMLElement | undefined) {
    if (element) {
        element.style.display = "none";
    }
};

export function eventStopper(e: Event) {
    e.preventDefault();
    if (e.bubbles) {
        e.stopPropagation()
    }
}

export function showElement(type: "flex" | "block", element: HTMLElement | undefined) {
    if (element) {
        if (type == "flex") {
            element.style.display = "flex";
        } else {
            element.style.display = "block"
        }
    }
}



export function createElement<T extends keyof HTMLElementTagNameMap>(element: T, classList?: string[]) {
    const _e = document.createElement(element);
    if (classList) {
        _e.classList.add(...classList)
    };
    return _e;
}


export function createMaskedDivElement<T extends HTMLElement>(childClassList?: string[]) {

    let preElement: HTMLElement | undefined | T = undefined;

    const _mask = document.createElement('div');
    _mask.classList.add('masked-element');

    const _e = document.createElement('div');

    _mask.style.display = 'flex';
    _mask.style.alignItems = 'center';
    _mask.style.justifyContent = 'center';


    if (childClassList) {
        _e.classList.add(...childClassList);
    }
    preElement = _e;
    return preElement;

}

interface IElementAttrbute {
    _name: string,
    _value: string
}

export function createAttributedElement<T extends keyof HTMLElementTagNameMap>(tag: T, attributes: IElementAttrbute[]) {

    const _element = document.createElement(tag);
    for (const _attr of attributes) {
        _element.setAttribute(_attr._name, _attr._value)
    };
    return _element;

};

export function applyClassToElement(element:HTMLElement,classList:string[]){
    element.classList.add(...classList);
}

export interface IconContext {
    element(): HTMLElement;
    setIcon(value:_materialIcons): void;
}

export function createElementWithIcon<T extends keyof HTMLElementTagNameMap>(tag:T,icon:_materialIcons):IconContext{

    const _element  = document.createElement(tag);

    if(MaterialIcons[icon]){
        _element.classList.add('symbols-icon');
        _element.ariaLabel = "icon"
        _element.textContent = MaterialIcons[icon].glyphId;
    }

    return {

        element(){
            return _element;
        },

        setIcon(value:_materialIcons){
            _element.textContent = MaterialIcons[value].glyphId;
        }

    }
}