import { ICellRendererParams } from 'ag-grid-community';
import { message } from 'antd'
import axios from 'axios';
import {useDispatch} from 'react-redux'
import {bindActionCreators} from 'redux'
import { actionCreators } from '../../../state'

    // ag-grid
    const RowDataClickComp = (e:ICellRendererParams) => {
        /**
         * react-redux
         */
        const dispatch = useDispatch();
        const {changeActiveKey,setRowData} = bindActionCreators(actionCreators,dispatch);

        /**
         * clickEvent
         */
        const btnClickEvent = () => {
            axios.get('/api/getItemId',
                    {params: {itemId: e.data.itemId}})
                .then(res => {
                    if(res.data.itemId === e.data.itemId)  return message.error("이미 등록된 상품입니다.");
                    setRowData(e.data);
                    changeActiveKey(2);
                })
                .catch(err => {console.log(err);
                } )
        }

        return (
            <>
            <button type='button' onClick={btnClickEvent} className='btn solid blue xxsmall'>선택</button>
            </>
        );
    }
export default RowDataClickComp;
