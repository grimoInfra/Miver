/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as Dom from "mv/base/browser/dom";
import { DisposeStore } from "mv/platform/disposeStore";
import { DragAndDropContainer } from "mv/app/parts/station/parts/dragManager/dragDrop";
import { IDragAndDrop, IDragAndDropService } from "mv/platform/services/dragDropService/dragDropService";
import { SnackBarContainer } from "mv/app/parts/station/parts/snackBar/snackBar"
import { IWindowResizer, IWindowResizerService, IWindowProps } from "mv/platform/windowResizer";
import "./media/station.css"

export class Station extends DisposeStore implements Dom.IElementComponent {

    private container: HTMLElement | undefined = undefined;
    private contentWrapper: HTMLElement | undefined = undefined;
    private dragContainer: DragAndDropContainer | undefined = undefined;
    private snackContainer: SnackBarContainer | undefined = undefined;

    constructor(
        @IDragAndDrop private readonly dragService: IDragAndDropService,
        @IWindowResizer private readonly resizerService: IWindowResizerService
    ) {
        super()
        this.initializeComponent()
    }

    private initializeComponent() {
        this.createElementLayout()
    }

    private createElementLayout() {
        this.container = Dom.createElement("div", ['station-main-area']);
        this.contentWrapper = Dom.createElement("div", ['station-content-wrapper']);
        this.dragContainer = new DragAndDropContainer(this.dragService);
        this.snackContainer = new SnackBarContainer();

        Dom.appendElements([this.dragContainer.element, this.snackContainer.element], this.contentWrapper)
        Dom.appendToDom(this.contentWrapper, this.container);
        this.registerContainerEventsAndState()
    };

    private registerContainerEventsAndState() {
        Dom.layElement(this.container!, { width: `${this.resizerService.getWidth()}px`, height: `${(this.resizerService.getHeight() - 50)}px` });
        this.resizerService.onDidResize.subscribeAsync(this.onWindowDidResize.bind(this))
    };

    private onWindowDidResize(args: IWindowProps) {
        Dom.layElement(this.container!, { width: `${args.width}px`, height: `${(args.height - 50)}px` });
    }


    public override dispose(): void {
        super.dispose();
    }

    public get element() {
        return this.container!;
    }

}