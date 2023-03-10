/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

//base
import "mv/base/browser/material-icons";
import "mv/base/browser/ui/checkButton";
import "mv/base/browser/dom";
import "mv/base/node/decorators/decoratorServer";
import "mv/base/node/decorators/injector";
import "mv/base/node/decorators/serviceCollectionManager";

//platform
import "mv/platform/disposeStore";
import "mv/platform/memoize";
import "mv/platform/windowResizer"

//platform-services
import "mv/platform/services/product";
import "mv/platform/services/adService/adService";
import "mv/platform/services/dragDropService/dragDropService";
import "mv/platform/services/themeService/themeService";

//string;
import "mv/strings/ad.data"

//app
import "mv/app/parts/topBar/parts/productLink/productLink"
import "mv/app/parts/topBar/topBar";

import "mv/app/parts/ad/ad";
import "mv/app/parts/station/parts/dragManager/dragDrop";
import "mv/app/parts/station/parts/snackBar/snackBar";
import "mv/app/mv.main";