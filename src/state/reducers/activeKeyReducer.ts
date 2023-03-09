import { ActionType } from './../action-types/index';
import {Action} from '../actions/index';


const initState = 1;

const reducer = (state:number = initState, action:Action) => {
    switch(action.type){
        case ActionType.CHANGEACTIVEKEY:
            return action.payload;
        default :
            return state
    }
}

export default reducer;