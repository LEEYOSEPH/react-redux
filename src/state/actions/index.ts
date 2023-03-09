import {ActionType} from '../action-types/index'
import { itemVO } from '../../pages/Products/layouts/ProductsLayouts'

interface ChangeActiveKey {
    type: ActionType.CHANGEACTIVEKEY,
    payload: number
}

interface SetRowData {
    type: ActionType.SETROWDATA,
    data: itemVO
}

export type Action = ChangeActiveKey | SetRowData;