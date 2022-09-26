
namespace ulib {

    export class Observable {

        public observers: any[];

        constructor() {
            this.observers = [];
        }

        public subscribe(f) {
            this.observers.push(f);
        }

        public unsubscribe(f) {
            this.observers = this.observers.filter(subscriber => subscriber !== f);
        }

        public notify(...data) {
            this.observers.forEach(observer => observer(...data));
        }
    }
}