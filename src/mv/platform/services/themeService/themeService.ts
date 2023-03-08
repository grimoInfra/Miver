/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createDecorator as createServiceDecorator } from "mv/base/node/decorators/decoratorServer";
import { CommonEvents, IAsyncGlobalEventEmitter } from "mv/base/node/events/events";

export const ITheme = createServiceDecorator<IThemeService>('themeService')

export type UITheme = "dark" | "light";

export interface IThemeService {

    theme: UITheme | undefined;
    setTheme(theme: UITheme): void;
    initializeThemeSystem(baseContainer: HTMLElement): void;

}

interface themeProperties {
    //primary-theme-color
    primaryThemeColor: string,
    primaryShadowColor: string,
    onPrimaryThemeColor: string,

    //secondary-theme-color
    secondaryThemeColor: string,
    secondaryShadowColor: string,
    onSecondaryThemeColor: string,

    //error,warning,info colors
    errorBackgroundColor: string,
    warningBackgroundColor: string,
    infoBackgroundColor: string,

    stationBackgroundColor: string,
    dragStateColor: string,
    snackBackgroundColor: string
   


};

//light-theme-props

const MVLightThemeProperties: themeProperties = {
    primaryThemeColor: "#f8f8f8",
    primaryShadowColor: "#00000029",
    onPrimaryThemeColor: "#131313c4",

    secondaryThemeColor: "#D24848",
    secondaryShadowColor: "#d24848a4",
    onSecondaryThemeColor: "#fdf2f2",

    errorBackgroundColor: "#d10404f1",
    warningBackgroundColor: "#e7bf0bf1",
    infoBackgroundColor: "#0b7de7f1",

    stationBackgroundColor: "#ededed",
    dragStateColor: "#d7eaf7",
    snackBackgroundColor: "#f3ebeb",

 
    
};

//dark-theme-props

const MVDarkThemeProperties: themeProperties = {
    primaryThemeColor: "#2c2c2c",
    primaryShadowColor: "#000000c2",
    onPrimaryThemeColor: "#e1d0d0",

    secondaryThemeColor: "#D24848",
    secondaryShadowColor: "#d24848a4",
    onSecondaryThemeColor: "#fdf2f2",

    errorBackgroundColor: "#d10404f1",
    warningBackgroundColor: "#e7bf0bf1",
    infoBackgroundColor: "#0b7de7f1",

    stationBackgroundColor: "#000",
    
    dragStateColor: "#393a40",
    snackBackgroundColor: "#1a1a1a",



};


const mvPropertyCssKeys: string[] = [
    "--primary-theme-color",
    "--primay-shadow-color",
    "--on-primary-theme-color",

    "--secondary-theme-color",
    "--secondary-shadow-color",
    "--on-secondary-theme-color",

    "--error-background-color",
    "--warning-background-color",
    "--info-background-color",
    "--station-background-color",
    "--drag-background-color",
    "--snack-background-color",
];


export class Theme implements IThemeService {

    theme: UITheme | undefined = undefined;
    private currentBaseContainer: HTMLElement | undefined = undefined;
    private onDidChangeTheme: IAsyncGlobalEventEmitter<UITheme> = CommonEvents.createGlobalAsyncEventEmitter();


    constructor() {

        //default theme;
        this.initialize()
    }

    private initialize() {
        this.setUpThemeLayout();
    };

    private formatBaseStyleString(container: HTMLElement, is: UITheme) {
        if (is == "dark") {
            mvPropertyCssKeys.forEach((property, index) => {
                container.style.setProperty(property, Object.values(MVDarkThemeProperties)[index])
            });
        } else {
            mvPropertyCssKeys.forEach((property, index) => {
                container.style.setProperty(property, Object.values(MVLightThemeProperties)[index])
            });
        }

    }

    public initializeThemeSystem(baseContainer: HTMLElement): void {
        this.currentBaseContainer = baseContainer;
        if (this.theme == "light") {

            this.formatBaseStyleString(baseContainer, this.theme)

        } else {
            this.formatBaseStyleString(baseContainer, this.theme!)

        };
    };

    private updateThemeStorageKey(theme: UITheme) {
        localStorage.setItem('mv-theme', theme)
    }

    private setUpThemeLayout() {
        let mvThemeKey = this.getCurrentThemeKeyFromStorage()! as UITheme;
        if (mvThemeKey) {
            this.theme = mvThemeKey
        } else {
            this.setUserDefaultTheme();
            this.storeUserThemeKey()
        }
    };

    private storeUserThemeKey() {
        localStorage.setItem("mv-theme", this.theme!)
    }

    private setUserDefaultTheme() {
        this.theme = "light"
    }


    private getCurrentThemeKeyFromStorage() {
        const themeKey = localStorage.getItem('mv-theme');
        return themeKey;
    }

    setTheme(theme: UITheme): void {
        if (this.currentBaseContainer) {
            this.formatBaseStyleString(this.currentBaseContainer, theme);
            this.onDidChangeTheme.raiseEventAsync(theme)
            this.theme = theme;
            this.updateThemeStorageKey(theme)

        }

    };

}