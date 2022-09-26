namespace util.validate {

    export function stringIsBoolean(val: string): boolean {
        if (val.toLowerCase() == 'true' || val.toLowerCase() == 'false') {
            return true;
        }
        else {
            return false;
        }
    }

    export function stringToBoolOrDefault(val: string, defaultValue: boolean): boolean {
        if (stringIsNullOrEmpty(val)) {
            return defaultValue;
        }
        if (val.toLowerCase() == 'true') return true;
        if (val.toLowerCase() == 'false') return false;
        return defaultValue;
    }

    export function stringIsNullOrEmpty(val: string): boolean {
        if (!val || val == '') {
            return true;
        }
        else {
            return false;
        }
    }

    export function stringIsInList(val: string, list: any[]): boolean {
        if (stringIsNullOrEmpty(val)) return false;
        let chartNameResult = list.filter(c => c.Name == val);
        if (chartNameResult.length == 0) {
            return false;
        }
        else {
            return true;
        }
    }

    export function isDate(val): boolean {
        let isValidDate = Date.parse(val);

        if (isNaN(isValidDate)) {
            return false;
        }
        return true;
    }

    export function isPlainObject(obj: any): boolean {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }

    export function isArray(obj: any) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }

    export function isFunction(obj: any) {
        return Object.prototype.toString.call(obj) === '[object Function]';
    }

}