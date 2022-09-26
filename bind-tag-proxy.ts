namespace ulib.bindtag {

    export function getProxy(model: Object, updateFunc: (obj, key, value) => void): Object {
        let handler = {
            set: (obj, key, value) => {
                obj[key] = value;
                updateFunc(obj, key, value);
                return true;
            }

        }
        return new Proxy(model, handler);
    }

    export function getProxyDeep(model: Object, updateFunc:(obj,key,value)=>void): Object {
        let handler = {
            set: (obj, key, value) => {
                obj[key] = value;
                updateFunc(obj, key, value);
                return true;
            }
        }
        return createProxiesRecursive(model, handler);
    }

    function createProxiesRecursive(model: Object, handler: {}): Object {
        Object.keys(model).forEach(key => {
            if (isPlainObject(model[key]) || isArray(model[key])) {
                model[key] = createProxiesRecursive(model[key], handler);
            }
        });
        return new Proxy(model, handler);
    }

    export function isArray(obj: any) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }

    function isPlainObject(obj: any): boolean {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }
}