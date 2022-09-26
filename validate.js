var util;
(function (util) {
    var validate;
    (function (validate) {
        function stringIsBoolean(val) {
            if (val.toLowerCase() == 'true' || val.toLowerCase() == 'false') {
                return true;
            }
            else {
                return false;
            }
        }
        validate.stringIsBoolean = stringIsBoolean;
        function stringToBoolOrDefault(val, defaultValue) {
            if (stringIsNullOrEmpty(val)) {
                return defaultValue;
            }
            if (val.toLowerCase() == 'true')
                return true;
            if (val.toLowerCase() == 'false')
                return false;
            return defaultValue;
        }
        validate.stringToBoolOrDefault = stringToBoolOrDefault;
        function stringIsNullOrEmpty(val) {
            if (!val || val == '') {
                return true;
            }
            else {
                return false;
            }
        }
        validate.stringIsNullOrEmpty = stringIsNullOrEmpty;
        function stringIsInList(val, list) {
            if (stringIsNullOrEmpty(val))
                return false;
            let chartNameResult = list.filter(c => c.Name == val);
            if (chartNameResult.length == 0) {
                return false;
            }
            else {
                return true;
            }
        }
        validate.stringIsInList = stringIsInList;
        function isDate(val) {
            let isValidDate = Date.parse(val);
            if (isNaN(isValidDate)) {
                return false;
            }
            return true;
        }
        validate.isDate = isDate;
        function isPlainObject(obj) {
            return Object.prototype.toString.call(obj) === '[object Object]';
        }
        validate.isPlainObject = isPlainObject;
        function isArray(obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        }
        validate.isArray = isArray;
        function isFunction(obj) {
            return Object.prototype.toString.call(obj) === '[object Function]';
        }
        validate.isFunction = isFunction;
    })(validate = util.validate || (util.validate = {}));
})(util || (util = {}));
