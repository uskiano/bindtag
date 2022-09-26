namespace ulib.bindtag {

    export enum EBindTagType {
        Text = 'text', // default
        Id = 'id',
        Class = 'class',
        HtmlElement = 'html',
        Dataset = 'data',
        Style = 'style',
        Click = 'click'
    }

    export interface IBindItem {
        Type: EBindTagType, // what part of the tag can be found the value?.. for instance: class, dataset, textnode, htmlNode, array-item (by default text-node)
        Model: Object,
        Key: string,
        Value: any,
        Elem: HTMLElement,
        DatasetName?: string,
        Index?: number, // if model is array then the index (by default none)
        IsTwoWay: boolean, // whether one or two way binding,
        Action?: (elem: HTMLElement) => void
    }

    export class BindTagList {

        private bindItems: IBindItem[] = [];
        private BIND_PREFIX = 'bind-';

        constructor(rootElem: HTMLElement, public rootModel: Object) {
            this.createBindsForElements(rootElem);
        }

        public getBindItems() {
            return this.bindItems;
        }

        private createBindsForElements(root: HTMLElement) {
            let elems = this.getElements(root);
            elems.forEach(elem => this.createBindsForElement(elem));
        }

        private createBindsForElement(elem: HTMLElement) {
            let bindTypes = this.getBindTypes(elem);
            bindTypes.forEach(bindtype => this.createElementBind(elem, bindtype));
        }

        private getBindTypes(elem: HTMLElement): EBindTagType[] {
            let bindNames = elem.getAttributeNames().filter(attr => attr.substring(0, this.BIND_PREFIX.length) == this.BIND_PREFIX);
            if (bindNames.length == 0) {
                return [];
            }
            else {
                return bindNames.map(bindName => this.getBindTypeByName(bindName));
            }
        }

        private createElementBind(elem: HTMLElement, bindType: EBindTagType) {
            let modelString = elem.getAttribute(this.BIND_PREFIX + bindType);
            let res = this.getObjectKeyValue(modelString, this.rootModel);
            let bindItem = this.getBindItem(bindType, elem, res.obj, res.key, res.value);
            this.bindItems.push(bindItem);
        }

        private getBindItem(type: EBindTagType, elem: HTMLElement, model: object, key: string, value: string): IBindItem {
            return {
                Type: type,
                Elem: elem,
                Model: model,
                Key: key,
                Value: value,
                IsTwoWay: true
            };
        }

        private getObjectKeyValue(modelString: string, modelRoot: Object): { obj: Object, key: string, value: any } {
            if (!modelString) {
                throw Error(`Can't find model of null or undefined`);
            }
            let modelStringDot = this.strArrayToDotNotation(modelString);
            let parts = modelStringDot.split('.'); // traversing object string notation. i.e: 'app.users[i].user.address.latlng.longitude' TODO: support arrays as in sample
            let obj = null;
            let key = null;
            let value = modelRoot;
            for (let i = 0; i < parts.length; i++) {
                let part = parts[i];
                obj = value;
                value = obj[part];
                key = part;
                if (value == undefined) {
                    throw Error(`Can't find key in model of '${modelString}'`);
                }
            }
            if (obj == null) {
                throw Error(`Error parsing '${modelString}' to model: key/object`);
            }
            return {
                key: key as string,
                obj: obj,
                value: value
            };
        }

        // arrayNotation to object dot notation, i.e: items[2].x.subitems[3] => items.2.x.subitems.3
        private strArrayToDotNotation(str: string) { 
            let result = str.replace(/\[+/g, '.');
            return result.replace(/]/g, '');
        }

        private getBindTypeByName(bindName: string): EBindTagType {
            
            switch (bindName) {
                case 'bind':
                    return EBindTagType.Text;
                case 'bind-text':
                    return EBindTagType.Text;
                case 'bind-class':
                    return EBindTagType.Class;
                case 'bind-html':
                    return EBindTagType.HtmlElement;
                case 'bind-id':
                    return EBindTagType.Id;
                case 'bind-data':
                    return EBindTagType.Dataset;
                case 'bind-style':
                    return EBindTagType.Style;
                case 'bind-click':
                    return EBindTagType.Click;
                default: throw Error(`Bind type '${bindName}' not found.`)
            }
        }

        private getElements(elem: HTMLElement): HTMLElement[] {
            let elems = elem.children;
            if (elems.length == 0) return [elem];
            let list: HTMLElement[] = [elem];
            for (let i = 0; i < elems.length; i++) {
                let el = elems[i] as HTMLElement;
                let childElems = this.getElements(el);
                list = list.concat(childElems);
            }
            return list;
        }
    }

}