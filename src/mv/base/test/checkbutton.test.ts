/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as Dom from "mv/base/browser/dom";
import { CheckButton, IToggleState } from "mv/base/browser/ui/checkButton";

//check-button-test

function createFakeDomEnvironment() {
    const dom = document.createElement("div");
    dom.classList.add('dom-t-container');
    return dom;
};


describe('CheckBox Functionality', () => {
    let fakeDomEnvironment: HTMLElement;
    let CheckBoxElement: CheckButton;

    beforeEach(() => {

        fakeDomEnvironment = createFakeDomEnvironment();
        CheckBoxElement = new CheckButton("checked");
        fakeDomEnvironment.appendChild(CheckBoxElement.element);
    });


    afterEach(() => {

        CheckBoxElement.dispose();
    })

    test('Should Create The CheckBox', () => {
        
        let checkBoxDomElement = Dom.$('.checkbox-cl', fakeDomEnvironment);
        expect(checkBoxDomElement).toBeTruthy();
    });

    test('Should have a default State of checked', () => {
        
        expect(CheckBoxElement.getState()).toBe<IToggleState>("checked");
    });

    test('should change state when clicked', () => {
        
        CheckBoxElement.element.click();
        expect(CheckBoxElement.getState()).toBe<IToggleState>("unchecked");
    });



})