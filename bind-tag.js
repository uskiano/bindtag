var ulib;
(function (ulib) {
    var bindtag;
    (function (bindtag) {
        class BindTag {
            constructor(rootElem, rootModel) {
                this.rootElem = rootElem;
                this.rootModel = rootModel;
                this.bindItems = new bindtag.BindTagList(rootElem, rootModel).getBindItems();
                this.proxyModel = bindtag.getProxyDeep(rootModel, (m, k, v) => this.updateElements(m, k, v));
            }
            getModel() {
                return this.proxyModel;
            }
            updateElements(model, key, value) {
                let items = this.bindItems
                    .filter(p => this.areEqual(p.Model, model) && p.Key == key);
                items.forEach(bindItem => {
                    this.updateElement(bindItem, value);
                });
            }
            updateElement(bindItem, value) {
                switch (bindItem.Type) {
                    case bindtag.EBindTagType.Text:
                        this.updateText(bindItem.Elem, value);
                        break;
                    case bindtag.EBindTagType.Class:
                        this.updateClass(bindItem.Elem, value);
                        break;
                }
            }
            updateText(elem, value) {
                if (elem.tagName == 'INPUT') {
                    elem.value = value;
                }
                else {
                    elem.textContent = value;
                }
            }
            updateClass(elem, value) {
                elem.className = value;
            }
            areEqual(obj1, obj2) {
                if (obj1 === obj2) {
                    return true;
                }
                //else return false;
                let _obj1 = JSON.stringify(obj1);
                let _obj2 = JSON.stringify(obj2);
                return _obj1 == _obj2;
            }
        }
        bindtag.BindTag = BindTag;
    })(bindtag = ulib.bindtag || (ulib.bindtag = {}));
})(ulib || (ulib = {}));
