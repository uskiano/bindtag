namespace ulib.bindtag {

    export class BindTag {

        private bindItems: IBindItem[];
        private proxyModel: Object;

        constructor(public rootElem: HTMLElement, public rootModel: Object) {
            this.bindItems = new BindTagList(rootElem, rootModel).getBindItems();
            this.proxyModel = getProxyDeep(rootModel, (m, k, v) => this.updateElements(m, k, v));
        }

        public getModel() {
            return this.proxyModel;
        }

        private updateElements(model: Object, key: string, value: string) {
            let items = this.bindItems
                .filter(p => this.areEqual(p.Model, model) && p.Key == key);
            items.forEach(bindItem => {
                this.updateElement(bindItem, value);
            });
        }

        private updateElement(bindItem: IBindItem, value: any) {
            switch (bindItem.Type) {
                case EBindTagType.Text:
                    this.updateText(bindItem.Elem, value);
                    break;
                case EBindTagType.Class:
                    this.updateClass(bindItem.Elem, value);
                    break;

            }
        }

        private updateText(elem: HTMLElement, value: string) {
            if (elem.tagName == 'INPUT') {
                (elem as HTMLInputElement).value = value;
            }
            else {
                elem.textContent = value;
            }
        }

        private updateClass(elem: HTMLElement, value: string) {
            elem.className = value;
        }

        private areEqual(obj1: Object, obj2: Object): boolean {
            if (obj1 === obj2) {
                return true;
            }
            //else return false;
            let _obj1 = JSON.stringify(obj1);
            let _obj2 = JSON.stringify(obj2);
            return _obj1 == _obj2;
        }

    }

}