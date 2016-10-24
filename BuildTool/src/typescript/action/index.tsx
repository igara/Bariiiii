import {dispatch} from '../dispatcher/Dispatcher';

const IndexAction = {
    changePath: (path) => {
        dispatch({
            type: 'change_path',
            path: path
        });
    }
}
export default IndexAction;