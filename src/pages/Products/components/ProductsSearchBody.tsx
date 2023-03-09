import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import RowDataClickComp  from './RowDataClickComp'
import EmptyGridLayout from '../layouts/EmptyGirdLayout';
import axios from 'axios';
import { ColDef } from 'ag-grid-community';

const App: React.FC= () => {
    
    /**
     * 검색창
     */
    const [text, setText] = useState<string>('');
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => setText(e.target.value);

    /**
     * ag-grid
     */
    const [rowDatas, setRowDatas] = useState<any[]>([]);
    const columnDefs: ColDef[] =([
        { headerName: '상품ID', field: 'itemId',cellStyle: { textAlign: 'left'} },
        { headerName: '상품번호', field: 'itemNo',cellStyle: { textAlign: 'left'} },
        { headerName: '상품명', field:'itemName',cellStyle: { textAlign: 'left'} },
        { headerName: '상품선택', field:'itemSelect', cellRenderer: RowDataClickComp,cellStyle: { textAlign: 'center'}}
    ]);

    /**
     * Click Event
     */
    const btnClickEvent = () => {
        // 선택 조건 조회 버튼을 클릭 하면 데이터 조회 이벤트
        const data = {itemName: text}
        axios.post('/api/searchItemLists',data)
        .then(res => {
            const data = res.data;
            setRowDatas(data);
        })
        .catch(err => {
            console.log(err);
        })
        setText('');
    }
    
    return (
    <>
    {/* 검색 박스 시작 */}
    <div className='box-filter-area'>
        <div className='comp-filter vertical'>
            <div className='box-body'>
                <div className='filter-icon-area'><i className="ico ico-filter"></i></div>
                <div className='filter-content'>
                    <div className='filter-row'>
                        <div className='filter-group'>
                            <div className='filter-label'><p className="fz-16 fw-med fc-7">검색어</p></div>
                            <div className='filter-box'>
                                <div className='filter-col'>
                                    <div className='input-group'>
                                        <div className='inner-input-group'>
                                            <input type="text" id="searchText" name="searchText" className="tf-comm" placeholder="상품명을 입력해주세요." onChange={onChange} value={text} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='filter-inquire'>
                    <button type='button' className='btn outline blue btn-ico --icotxt' onClick={btnClickEvent}>
                        <i className="ico"></i>
                        선택 조건 조회
                    </button>
                </div>
            </div>
        </div>
    </div>
    {/* 검색 박스 끝 */}
    {/* 데이터 그리드 시작  */}
    <div className='box-body'>
        <div className='ag-grid-empty'>
            <div className="ag-theme-alpine" style={{height: 700}}>
                <AgGridReact 
                noRowsOverlayComponent ={EmptyGridLayout}
                rowData={rowDatas}
                columnDefs={columnDefs}
                defaultColDef={{flex: 1, sortable:true}}
                paginationAutoPageSize={true}
                pagination={true}
                rowHeight={70}
                rowSelection={'single'}
                />
            </div>
        </div>
    </div>
    {/* 데이터 그리드 끝 */}
    </>
);
};

export default App;
