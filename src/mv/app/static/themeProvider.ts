/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ITheme,IThemeService } from "mv/platform/services/themeService/themeService";


export class ThemeProvider {

    constructor(@ITheme private readonly themeService: IThemeService) { };

    public initializeProvider(container:HTMLElement) {
        this.themeService.initializeThemeSystem(container)
    }

};