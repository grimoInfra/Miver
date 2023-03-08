/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const memowiseInMemory: any = {};

interface IMemoize {
    storagekey:string,
    memoryModifier(param: any): any;
}


function clearCachedData(storagekeybase:any) {
    let _literalkeys = Object.keys(storagekeybase);

    if (_literalkeys.length > 8) {
        _literalkeys.forEach((key) => {
            delete storagekeybase[key]
        })
    }
}

export function memoize(config: IMemoize) {

    return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        const orginalFunction = descriptor.value;

        if (!(memowiseInMemory[config.storagekey])) {
            //create base key in storage;
            memowiseInMemory[config.storagekey] = {};
        } else {
            
            clearCachedData(memowiseInMemory[config.storagekey]);
        }


        descriptor.value = function (...args: any) {
            let result: any = null;
            let properyStorage = memowiseInMemory[config.storagekey]

            if (properyStorage[args]) {
                console.log(`windowHeight:${args}`, `proposedHeight:${properyStorage[args]}`)
                result = orginalFunction.call(this, properyStorage[args]);
            } else {
                let preposedValue = config.memoryModifier(args);
                properyStorage[args] = preposedValue;
                result = orginalFunction.call(this, preposedValue)
                console.log(`windowHeight:${args}`, `proposedHeight:${properyStorage[args]}`)

            }

            return result;

        }

    }

}