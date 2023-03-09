import { itemVO } from './../../pages/Products/layouts/ProductsLayouts';
import { ActionType } from "../action-types"
import {Dispatch} from 'redux'
import { Action } from "../actions"

/**
 * 
 * antd 스텝 변경
 */
export const changeActiveKey = (amount: number) => {
    return (dispatch:Dispatch<Action>) => {
        dispatch({
            type: ActionType.CHANGEACTIVEKEY,
            payload: amount
        })
    }
}

/**
 * ag-grid rowDate
 */
export const setRowData = (amount: itemVO) => {
    return (dispatch:Dispatch<Action>) => {
        dispatch({
            type : ActionType.SETROWDATA,
            data : amount
        })
    }
}
