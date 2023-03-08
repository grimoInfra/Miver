/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { DisposableStoreTestDomEventListeners } from "./helpers/disposeStore/store.dom";
import { DisposableStoreTestEventEmitters } from "./helpers/disposeStore/store.emitter";


function createFakeDomEnvironment() {
    const dom = document.createElement("div");
    dom.classList.add('dom-text-container');
    return dom;
};

function createCommonElement() {
    const commonElement = document.createElement('div');
    commonElement.classList.add('test-common-element');
    return commonElement;
}

describe('Disposable Store Test Bed', () => {

    describe('DisposableStoreDomListeners', () => {

        let fakeDomEnvironment: HTMLElement;
        let commonElement: HTMLElement;
        let disposeStore: DisposableStoreTestDomEventListeners;

        beforeEach(() => {

            disposeStore = new DisposableStoreTestDomEventListeners()
            fakeDomEnvironment = createFakeDomEnvironment();
            commonElement = createCommonElement();

            fakeDomEnvironment.appendChild(commonElement)

        });


        test('The CommonElement Should Be Created', () => {
            expect(commonElement).toBeTruthy();
        });


        test('The DisposeStore should be created', () => {
            expect(disposeStore).toBeTruthy();
        });


        test("Event listener should be registered And Working", () => {

            disposeStore.registerTestElement(commonElement);
            disposeStore.createDisposableComponent();
            disposeStore.makeDidClickAction();

            expect(disposeStore.testSSD).toBe("Click Listener works")
        })

        test("Event listener should be Active After Registration", () => {
            disposeStore.registerTestElement(commonElement);
            disposeStore.createDisposableComponent();
            disposeStore.registerDisposable()
            disposeStore.makeDidClickAction();


            expect(disposeStore.testSSD).toBe("Click Listener works")
        });

        test("The disposable should be tracked", () => {
            disposeStore.registerTestElement(commonElement);
            disposeStore.createDisposableComponent();
            disposeStore.registerDisposable()

            expect(disposeStore.isTracked()).toBe(true);

        });

        test("The Disposable store should have matured in size", () => {
            disposeStore.registerTestElement(commonElement);
            disposeStore.createDisposableComponent();
            disposeStore.registerDisposable()

            expect(disposeStore.disposeStoreSize).toBeGreaterThanOrEqual(1);
        });

        test("The Dispose Store Should have cleared", () => {
            disposeStore.registerTestElement(commonElement);
            disposeStore.createDisposableComponent();
            disposeStore.registerDisposable()
            disposeStore.dispose();

            disposeStore.makeDidClickAction();
            expect(disposeStore.testSSD).not.toBe("Click Listener works");

            disposeStore.dispose();

            expect(disposeStore.disposeStoreSize).toBe(0)
        })

    })

    describe('DisposableStoreEventEmitters', () => {

        let eventEmitterDisposeStore: DisposableStoreTestEventEmitters;

        beforeEach(() => {

            eventEmitterDisposeStore = new DisposableStoreTestEventEmitters();
        });

        test('The dispose store should be created', () => {
            expect(eventEmitterDisposeStore).toBeTruthy();
        });

        test('Event Emitter disposable store should be registered and working', async () => {
            eventEmitterDisposeStore.registerEventEmitter();
            eventEmitterDisposeStore.createDisposableEventEmitter();
            eventEmitterDisposeStore.testEmitter!.raiseEventAsync("Event Emitter test").then(() => {
                expect(eventEmitterDisposeStore.testSSD).toBe("Event Emitter test")
            })
        });

        test('Event Emitter disposable store should be tracked', () => {
            eventEmitterDisposeStore.registerEventEmitter();
            eventEmitterDisposeStore.createDisposableEventEmitter();

            expect(eventEmitterDisposeStore.isTracked()).toBe(true)
        });

        test('Event Emitter disposable store should have matured in size', () => {
            eventEmitterDisposeStore.registerEventEmitter();
            eventEmitterDisposeStore.createDisposableEventEmitter();

            expect(eventEmitterDisposeStore.disposeStoreSize).toBeLessThanOrEqual(1);
        });

        test('Event Emitter disposable store should have cleared', () => {
            eventEmitterDisposeStore.registerEventEmitter();
            eventEmitterDisposeStore.createDisposableEventEmitter();
            eventEmitterDisposeStore.dispose();

            expect(eventEmitterDisposeStore.disposeStoreSize).toBe(0)



        })

    })
})