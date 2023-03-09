import { itemVO } from './../../pages/Products/layouts/ProductsLayouts';
import { ActionType } from "../action-types";
import { Action } from "../actions";

const init = {
    itemId : 0,
    itemNo : '',
    itemName : ''
}

const reducer = (state:itemVO = init, action:Action) => {
    switch(action.type){
        case ActionType.SETROWDATA:
            return action.data;
        default :
            return state
    }
}

export default reducer;