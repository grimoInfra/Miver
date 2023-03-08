/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createDecorator as createServiceDecorator } from "mv/base/node/decorators/decoratorServer";


export const IProduct = createServiceDecorator<IProductService>('ProductService');

export interface IProductService {

    name: string,
    verison: string;
    basehref:string
};

export const ProductData: IProductService = {
    name: "Miver",
    verison: "1.0.0",
    basehref : "/"
}