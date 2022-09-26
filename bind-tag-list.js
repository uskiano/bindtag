var ulib;
(function (ulib) {
    var bindtag;
    (function (bindtag) {
        let EBindTagType;
        (function (EBindTagType) {
            EBindTagType["Text"] = "text";
            EBindTagType["Id"] = "id";
            EBindTagType["Class"] = "class";
            EBindTagType["HtmlElement"] = "html";
            EBindTagType["Dataset"] = "data";
            EBindTagType["Style"] = "style";
            EBindTagType["Click"] = "click";
        })(EBindTagType = bindtag.EBindTagType || (bindtag.EBindTagType = {}));
        class BindTagList {
            constructor(rootElem, rootModel) {
                this.rootModel = rootModel;
                this.bindItems = [];
                this.BIND_PREFIX = 'bind-';
                this.createBindsForElements(rootElem);
            }
            getBindItems() {
                return this.bindItems;
            }
            createBindsForElements(root) {
                let elems = this.getElements(root);
                elems.forEach(elem => this.createBindsForElement(elem));
            }
            createBindsForElement(elem) {
                let bindTypes = this.getBindTypes(elem);
                bindTypes.forEach(bindtype => this.createElementBind(elem, bindtype));
            }
            getBindTypes(elem) {
                let bindNames = elem.getAttributeNames().filter(attr => attr.substring(0, this.BIND_PREFIX.length) == this.BIND_PREFIX);
                if (bindNames.length == 0) {
                    return [];
                }
                else {
                    return bindNames.map(bindName => this.getBindTypeByName(bindName));
                }
            }
            createElementBind(elem, bindType) {
                let modelString = elem.getAttribute(this.BIND_PREFIX + bindType);
                let res = this.getObjectKeyValue(modelString, this.rootModel);
                let bindItem = this.getBindItem(bindType, elem, res.obj, res.key, res.value);
                this.bindItems.push(bindItem);
            }
            getBindItem(type, elem, model, key, value) {
                return {
                    Type: type,
                    Elem: elem,
                    Model: model,
                    Key: key,
                    Value: value,
                    IsTwoWay: true
                };
            }
            getObjectKeyValue(modelString, modelRoot) {
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
                    key: key,
                    obj: obj,
                    value: value
                };
            }
            // arrayNotation to object dot notation, i.e: items[2].x.subitems[3] => items.2.x.subitems.3
            strArrayToDotNotation(str) {
                let result = str.replace(/\[+/g, '.');
                return result.replace(/]/g, '');
            }
            getBindTypeByName(bindName) {
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
                    default: throw Error(`Bind type '${bindName}' not found.`);
                }
            }
            getElements(elem) {
                let elems = elem.children;
                if (elems.length == 0)
                    return [elem];
                let list = [elem];
                for (let i = 0; i < elems.length; i++) {
                    let el = elems[i];
                    let childElems = this.getElements(el);
                    list = list.concat(childElems);
                }
                return list;
            }
        }
        bindtag.BindTagList = BindTagList;
    })(bindtag = ulib.bindtag || (ulib.bindtag = {}));
})(ulib || (ulib = {}));
