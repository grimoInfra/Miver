/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createDecorator as createServiceDecorator } from "mv/base/node/decorators/decoratorServer";

export const IAd = createServiceDecorator<IAdService>('AdService');

export interface IAdService {
    content: string;
    linkSource: string;
    foregroundColor: string;
    backgroundColor: string;
};
