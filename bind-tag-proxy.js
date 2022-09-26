var ulib;
(function (ulib) {
    var bindtag;
    (function (bindtag) {
        function getProxy(model, updateFunc) {
            let handler = {
                set: (obj, key, value) => {
                    obj[key] = value;
                    updateFunc(obj, key, value);
                    return true;
                }
            };
            return new Proxy(model, handler);
        }
        bindtag.getProxy = getProxy;
        function getProxyDeep(model, updateFunc) {
            let handler = {
                set: (obj, key, value) => {
                    obj[key] = value;
                    updateFunc(obj, key, value);
                    return true;
                }
            };
            return createProxiesRecursive(model, handler);
        }
        bindtag.getProxyDeep = getProxyDeep;
        function createProxiesRecursive(model, handler) {
            Object.keys(model).forEach(key => {
                if (isPlainObject(model[key]) || isArray(model[key])) {
                    model[key] = createProxiesRecursive(model[key], handler);
                }
            });
            return new Proxy(model, handler);
        }
        function isArray(obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        }
        bindtag.isArray = isArray;
        function isPlainObject(obj) {
            return Object.prototype.toString.call(obj) === '[object Object]';
        }
    })(bindtag = ulib.bindtag || (ulib.bindtag = {}));
})(ulib || (ulib = {}));
