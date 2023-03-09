import {combineReducers} from 'redux';
import activeKeyReducer from './activeKeyReducer';
import rowDataReducer  from './rowDataReducer';

const reducers = combineReducers({
    activeKey : activeKeyReducer,
    rowData : rowDataReducer
})

export default reducers;

export type State = ReturnType<typeof reducers> 