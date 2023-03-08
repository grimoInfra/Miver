/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ServiceIdentifier, util } from "./decoratorServer";
import { ServiceCollection } from "./serviceCollectionManager";

export class Injector {

    private readonly _services:ServiceCollection;

    constructor(services:ServiceCollection){
        this._services = services;
    }

    getOrCreateServiceInstance<T>(id:ServiceIdentifier<T>){
        let _instanceDesc = this._services.get(id);
        return _instanceDesc;
    }

    createInstance<T>(ctor:any):T{
        //organise dependencies relative to their position in the parameters
        let _serviceDependencies = util.getServiceDepenencies(ctor).sort((a,b)=>a.index  - b.index);

        let _servieArgs:any[] = [];

        for(const dependency of _serviceDependencies) {
            let service = this.getOrCreateServiceInstance(dependency.id);

            if(!service){
                throw new Error("Unknown Service");
            };
            _servieArgs.push(service);
        };

        return <T>new ctor(..._servieArgs);

    };
};