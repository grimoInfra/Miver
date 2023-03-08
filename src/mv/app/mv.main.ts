/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as Dom from "mv/base/browser/dom";
import { Injector } from "mv/base/node/decorators/injector";
import { ServiceCollection } from "mv/base/node/decorators/serviceCollectionManager";
import { IProduct, ProductData } from "mv/platform/services/product";
import { TopBar } from "mv/app/parts/topBar/topBar";
import { ThemeProvider } from "mv/app/static/themeProvider";
import { ITheme, Theme } from "mv/platform/services/themeService/themeService";
import { Station } from "mv/app/parts/station/station";
import { AdContainer, IAdOption } from "mv/app/parts/ad/ad";
import { AdContentdata } from "mv/strings/ad.data";
import { IAd } from "mv/platform/services/adService/adService";
import { IDragAndDrop, DragManager } from "mv/platform/services/dragDropService/dragDropService";
import { IWindowResizer, IWindowResizerService, WindowResizer, IWindowProps } from "mv/platform/windowResizer";
import "./media/static.css";
import "./media/symbols.css"

export class MvAppMain {

    private container: HTMLElement | undefined = undefined;
    private containerWrapper: HTMLElement | undefined = undefined;
    private serviceInjector: Injector | undefined = undefined;
    private adControl: IAdOption | undefined = undefined;
    private windowResizer: IWindowResizerService | undefined = undefined;


    private initialize() {
        this.createInjectorFoundation();
        this.provideElementsToHost();
    }

    private createInjectorFoundation() {
        this.serviceInjector = this.createServiceInjector();
    }

    private provideElementsToHost() {
        this.container = Dom.createElement("div", ['mv-application']);
        this.container.role = 'application';
        this.containerWrapper = Dom.createElement("div", ['mv-application-wrapper']);

        this.createStaticItems(this.serviceInjector!);
        let parts = this.createApplicationParts(this.serviceInjector!);

        this.registerApplicationEventsAndState();

        Dom.appendElements([...parts], this.containerWrapper);
        Dom.appendToDom(this.containerWrapper, this.container);
        Dom.appendToDom(this.container, document.body);

    };

    private registerApplicationEventsAndState() {
        if (this.windowResizer) {
            Dom.layElement(this.containerWrapper!, { width: `${this.windowResizer.getWidth()}px`, height: `${this.windowResizer.getHeight()}px` });
            this.windowResizer.onDidResize.subscribeAsync(this.onWindowDidResize.bind(this))
        }
    };

    private onWindowDidResize(args: IWindowProps) {
        Dom.layElement(this.containerWrapper!, { width: `${args.width}px`, height: `${args.height}px` });
    }

    private createStaticItems(serviceInjector: Injector) {
        let themeProvider = serviceInjector.createInstance<ThemeProvider>(ThemeProvider);
        themeProvider.initializeProvider(document.getElementsByTagName("html")[0]);

        this.windowResizer = serviceInjector.getOrCreateServiceInstance(IWindowResizer)! as IWindowResizerService;

    }



    private createApplicationParts(serviceInjector: Injector) {
        //ad-control
        this.adControl = serviceInjector.createInstance<IAdOption>(AdContainer);

        //top-bar
        let TopBarInstance = serviceInjector.createInstance<Dom.IElementComponent>(TopBar);

        //station
        let StationInstance = serviceInjector.createInstance<Dom.IElementComponent>(Station)
        let PartsBundle: HTMLElement[] = [this.adControl.element, TopBarInstance.element, StationInstance.element];
        return PartsBundle;
    }

    private createServiceInjector() {
        let serviceCollection = new ServiceCollection();
        serviceCollection.set(IProduct, ProductData);
        serviceCollection.set(ITheme, new Theme());
        serviceCollection.set(IAd, AdContentdata)
        serviceCollection.set(IDragAndDrop, new DragManager());
        serviceCollection.set(IWindowResizer, new WindowResizer())

        return new Injector(serviceCollection)
    };

    public async startup() {
        this.initialize();
    };

};


const MvMain = new MvAppMain();
MvMain.startup()