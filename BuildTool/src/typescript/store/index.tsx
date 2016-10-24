import * as FluxUtils from 'flux/utils';
import * as Flux from 'flux';
import Dispatcher from '../dispatcher/Dispatcher';

class State {
    constructor(public path: any) {

    }
}

class Payload {
    constructor(public type: any, public path: any) {

    }
}

class IndexStore extends FluxUtils.ReduceStore<State, Payload> {
    constructor(d: Flux.Dispatcher<Payload>) {
        super(d);
    }

    getInitialState() {
        return new State([]);
    }

    reduce(state:any, action: Payload) {
        switch (action.type) {
            case 'change_path':
                return action.path;
            default:
                return new State([]);
        }
    }
}

const instance = new IndexStore(Dispatcher);
export default instance;