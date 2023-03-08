/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as Dom from "mv/base/browser/dom";
import { _materialIcons } from "mv/base/browser/material-icons";
import { DisposeStore } from "mv/platform/disposeStore";
import { IThemeService,UITheme } from "mv/platform/services/themeService/themeService";
import "./media/themeContext.css";

export class ThemeContext extends DisposeStore implements Dom.IElementComponent {

    private container: HTMLElement | undefined = undefined;
    private themeContextElement: HTMLElement | undefined = undefined;
    private themeContextIcon: Dom.IconContext | undefined = undefined;

    constructor(private readonly themeService: IThemeService) {
        super();
        this.initializeElementComponent()
    };

    private initializeElementComponent() {
        this.createElementFoundation();
    };

    private getThemeIcon():_materialIcons {
        return this.themeService.theme! == "dark" ? "LightTheme" : "DarkTheme";
    };

    private getTheme() {
        return this.themeService.theme!
    };

    private setContainerToolTip(theme:UITheme) {
        if (theme == "dark") {
            this.container!.title = "Change To LightTheme"
        } else {
            this.container!.title = "Change To DarkTheme"
        }
    };

    private async changeLayoutTheme() {
        let currentTheme = this.getTheme();
        if (currentTheme == "dark") {
            this.updateContextIcon("dark");
            this.setContainerToolTip("light");

            this.themeService.setTheme("light")
        }else{
            this.updateContextIcon("light");
            this.setContainerToolTip("dark");

            this.themeService.setTheme("dark")
        }
        
    };

    private updateContextIcon(theme:UITheme) {
        if (theme == "dark") {
            this.themeContextIcon!.setIcon("DarkTheme")
        } else {
            this.themeContextIcon!.setIcon("LightTheme")
        }
    }

    private createElementFoundation() {
        this.themeContextIcon = Dom.createElementWithIcon("div", this.getThemeIcon());
        this.container = Dom.createElement('div',['theme-context-control']);
        this.themeContextElement = this.themeContextIcon.element();
        this.setContainerToolTip(this.getTheme());


        this._register(Dom.addDisposableEventListener(this.container, Dom.EVENT_TYPES.CLICK, (e) => {
            this.changeLayoutTheme()
        }))

        this.container.role = "button";
        this.container.tabIndex = 0;

        Dom.appendToDom(this.themeContextElement, this.container);

    };

    public get element() {
        return this.container!;
    }


}