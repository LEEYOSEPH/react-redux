import {useEffect, useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import { Select, Modal,Button, message } from 'antd';
import {useSelector} from 'react-redux'
import {State} from '../../../state'
import 'react-tooltip/dist/react-tooltip.css';
import EmptyGridLayout from '../layouts/EmptyGirdLayout';
import axios from 'axios';
import { ColDef, ICellRendererParams } from 'ag-grid-community';

const App: React.FC = () => {
    const { Option } = Select;

    /**
     * useState
     */
    // 모달창
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenAd, setIsModalOpenAd] = useState(false);
    //광고그룹
    const [adgroupName, setAdgroupName] = useState<string>('');
    const [adgroupNameList, setAdgroupNameList] = useState<Array<[]>>([]);
    const [adgroupId, setAdgroupId] = useState<number>();
    //키워드
    const [rowData, setRowData] = useState<any[]>([]);
    const [kwdName, setKwdName] = useState<string>('');
    const [bidCost, setBidCost] = useState<number|string>();
    const [changeBidCost, setChangeBidCost] = useState<number|string>();

    /**
    * usetEffect
    */
    // 광고그룹 리스트 조회
    useEffect(() => {
        axios.get('/api/adgroup')
        .then(res => setAdgroupNameList(res.data)
        )
        .catch(err => console.log(err)
        )
    }, [adgroupName]);

    // 키워드 입찰가 동기 처리
    useEffect(() => {
        console.log(rowData);
    },[rowData])

    /**
     * react-redux 
     */
    const getSelectRowData = useSelector((state: State)=> state.rowData);

    /**
     * onChangeEvnet
     */
    const keyWordOnChange = (e:React.ChangeEvent<HTMLInputElement>) => setKwdName(e.target.value);
    const bidCostOnChange = (e:React.ChangeEvent<HTMLInputElement>) => setBidCost(e.target.valueAsNumber);
    const changebidCostOnChange = (e:React.ChangeEvent<HTMLInputElement>) => setChangeBidCost(e.target.valueAsNumber);
    const adGroupNameOnChange = (e:React.ChangeEvent<HTMLInputElement>) => setAdgroupName(e.target.value);
    /**
     * onClickEvent
     */
    
    // 광고 등록
    const onClickAdEvent = () => {
        if(adgroupId === undefined) {
            message.error('광고그룹 선택을 해주세요')
            return;
        }
        let kwds:any = [];
        rowData.map(e => {return kwds.push({kwdName:e.kwdName,bidCost:e.bidCost})});
        // requestbody
        const data = {  itemId:getSelectRowData.itemId,
                        adgroupId:adgroupId,
                        kwds
        };
        axios.post('/api/postAd',
                    JSON.stringify(data),
                    {headers: { "Content-Type": `application/json`}}
        )
        .then(message.success('저장 성공'))
        .catch(err => {console.log(err);
        })
    }

    // 입찰 설정
    const onClickChangeBidCostEvent = () => {
        let cost  = changeBidCost;
        cost = String(cost);
        if( cost[cost.length -1] !== '0') return message.error('끝자리');
        if( parseInt(cost) < 90 ) return  message.error("90원 이상");
        if( parseInt(cost) > 90000 ) return message.error("90000이상");
        const data = rowData.map(e => {
            e.bidCost = changeBidCost
            return e;
        });
        setRowData(data);
    }

    /**
     * ag-grid
     */
    const RowDataDeleteComp = (e:ICellRendererParams) => {
        const kwds = e.data;
        const btnClickEvent = () => {
            setRowData(rowData.filter(e => e.kwdName !== kwds.kwdName));
        }
        return (
            <>
            <button type='button' onClick={btnClickEvent} className='btn solid blue xxsmall'>삭제</button>
            </>
        );
    }
    const columnDefs: ColDef[] = ([
        { headerName: '키워드명', field: 'kwdName', cellStyle: { textAlign: 'left'} },
        { headerName: '키워드 입찰가', field: 'bidCost', cellStyle: { textAlign: 'left'} },
        { headerName: '키워드 삭제', field:'deleteKeyWord', cellRenderer:RowDataDeleteComp, cellStyle: { textAlign: 'center'}}
    ]);

    /**
     * antd Modal 키워드 등록
    */
    const showModal = () => setIsModalOpen(true);
    const handleOk = () => {
        let cost  = bidCost;
        cost = String(cost);
        const existYn = rowData.filter((e => e.kwdName === kwdName)).length > 0 ? true : false;
        if( cost[cost.length -1] !== '0') return message.error('끝자리');
        if( parseInt(cost) < 90 ) return  message.error("90원 이상");
        if( parseInt(cost) > 90000 ) return message.error("90000이상");
        if(existYn || kwdName !== ''){
            setRowData([...rowData,{ kwdName, bidCost}]);
            setBidCost(0);
            setKwdName('');
            setIsModalOpen(false);
        }else{return message.error('키워드명 확인하세요'); }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setBidCost(0);
        setKwdName('');
    };

    /**
     * antd Modal 광고 그룹 등록
    */
    const showModalAdGroup = () => setIsModalOpenAd(true);
    const handleOkAd = () => {
        if(adgroupName === '') return message.error("광고그룹을 입력하세요");
        axios.post('/api/adgroup'
                    ,{adgroupName:adgroupName}
        )
        .then(() => {
            setAdgroupName('');
            setIsModalOpenAd(false);
        })
        .catch(err =>{console.log(err);
        })
        
    }
    const handleCancelAd = () => {
        setAdgroupName('');
        setIsModalOpenAd(false);
    };
return (
    <>
    <section className='wrap-section wrap-tbl'>
        <div className='box-header'>
            <div className='box-left'><h2 className="fz-20 fw-med fc-10">광고 등록 할 선택된 상품</h2></div>
        </div>
        <div className='box-body'>
            <div className='tbl'>
                <dl className='vertical col-two'>
                    <dt><div className='dt-inner'><span className='fz-16 fw-med fc-7'>상품번호</span> </div></dt>
                    <dd><div className='form-group'><span className='comp-txt'><span className='table'><span className='table-cell'><b className="fz-16 fc-5">{getSelectRowData.itemNo}</b></span></span></span></div></dd>
                    <dt><div className='dt-inner'><span className='fz-16 fw-med fc-7'>상품명</span> </div></dt>
                    <dd><div className='form-group'><span className='comp-txt'><span className='table'><span className='table-cell'><b className="fz-16 fc-5">{getSelectRowData.itemName}</b></span></span></span></div></dd>
                </dl>
            </div>
        </div>
    </section>
    <section className='wrap-section wrap-tbl'>
        <div className='box-header'><div className='box-left'><h2 className="fz-20 fw-med fc-10">광고 등록</h2><i className="txt-essential">필수</i> </div></div>
        <div className='box-body'>
            <div className='tbl'>
                <dl>
                    <dt><div className="dt-inner"><span className="fz-16 fw-med fc-7">그룹 선택<i className="txt-essential"></i></span></div></dt>
                    <dd>
                        <div className="form-group">
                        <Select
                            style={{ width: 150 }}
                            placeholder="광고그룹을 선택하세요"
                            onChange={(value) => {setAdgroupId(value);}} 
                        >   
                            {adgroupNameList.map((ad: any) => {
                                return <Option value={ad.adgroupId}>{ad.adgroupName}</Option>
                            })}
                        </Select>
                        <button type='button' className='btn outline blue btn-ico --ico-txt' onClick={showModalAdGroup}><i className="ico IcoGuide"></i>신규그룹생성</button>
                        </div>
                    </dd>    
                </dl>
                <dl>
                    <dt>
                        <div className='dt-inner'>
                            <span className='fz-16 fw-med fc-7'>키워드 직접 추가 <br/> (선택)</span>
                        </div>
                    </dt>
                    <dd>
                        <div className='form-group'>
                            <section className='comp-accordion'>
                                <input type="checkbox" id='inp-check-05'className='accordion-header' />
                                <label htmlFor="inp-check-05">키워드 직접 추가하기</label>
                                <div className='accordion-body'>
                                    <section className='wrap-section wrap-tbl'>
                                        <div className='box-body'>
                                            <div className='tbl'>
                                                <dl>
                                                    <dt>
                                                        <div className='dt-inner'><span className="fz-16 fw-med fc-7">입찰 설정</span></div>
                                                    </dt>
                                                    <dd>
                                                        <div className='form-group'>
                                                        </div>
                                                        <div className='form-group'>
                                                            <div className='comp-radio'>
                                                                <input type="radio" id="inp-radio-02" name="inp-radio-g01" value="allKeyword" checked/>
                                                                <label htmlFor="inp-radio-02"></label>
                                                                <div className='box-label'>
                                                                    모든 키워드를
                                                                    <div className='input-group w-200'>
                                                                        <div className='inner-input-group'>
                                                                            <input type="number" id="allKwdBidCost" name="allKwdBidCost" className="tf-comm tf-num" placeholder="" value={changeBidCost} onChange={changebidCostOnChange} />
                                                                            <button type='button' className='btn btn-reset'></button>
                                                                            <span className="unit-text">원</span>
                                                                        </div>
                                                                    </div>
                                                                    으로 입찰 합니다.
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                        <div className='box-footer'>
                                            <div className='box-center'>
                                                <button type="button" className="btn solid blue" onClick={onClickChangeBidCostEvent}>입찰 적용</button>
                                            </div>
                                        </div>
                                    </section>
                                    <section className='wrap-section wrap-datagrid'>
                                        <div className='box-header'>
                                            <div className='box-left'>
                                                <h2 className="fz-18 fw-med fc-10">키워드 리스트</h2>
                                                <span className="fz-14 fw-med fc-5">입력된 키워드 갯수 (0 / 100)</span>
                                            </div>
                                            <div className='box-right'>
                                                <button type="button" className="btn outline blue btn-ico --ico-txt small" onClick={showModal}>
                                                    <i className="ico ico-download IcoGuide"></i>키워드 추가
                                                </button>
                                                <button type="button" className="btn outline gray small">연관 키워드 검색</button>
                                            </div>
                                        </div>
                                        <div className='box-body'>
                                        <div className='ag-grid-empty'>
                                            <div className="ag-theme-alpine" style={{height: 700}}>
                                                <AgGridReact 
                                                    noRowsOverlayComponent ={EmptyGridLayout}
                                                rowData={rowData}
                                                columnDefs={columnDefs}
                                                defaultColDef={{flex: 1, sortable:true, filter: true}}
                                                paginationAutoPageSize={true}
                                                pagination={true}
                                                rowHeight={70}
                                                rowSelection={'multiple'}
                                                />
                                            </div>
                                            </div>
                                            </div>
                                            <div className='box-footer'>
                                                <div className='box-left'></div>
                                                <div className='box-right'></div>
                                            </div>
                                    </section>
                                    <section className='wrap-section wrap-help'>
                                        <div className='box-header'>
                                            <div className='box-left'>
                                                <h2 className="fz-18 fw-med fc-10">도움말</h2>
                                            </div>
                                            <ul className='box-body'>
                                                <li className='item-help'><i className="bullet-01"></i><span className="fz-14 fc-7">키워드를 직접 추가하는 경우 해당 키워드는 쎈PICK AI+ 노출에서 제외되며 할인 혜택도 중단됩니다.</span></li>
                                                <li className='item-help'><i className="bullet-01"></i><span className="fz-14 fc-7">직접 추가한 키워드 외에도 카테고리 / 상품상세 / 키워드 페이지에 쎈PICK AI+를 통해 광고가 노출될 수 있습니다.</span></li>
                                                <li className='item-help'><i className="bullet-01"></i><span className="fz-14 fc-7">검색 결과의 광고 노출 순위는 입력하신 입찰가와 상품별 품질지수를 종합 평가하여 결정됩니다.</span></li>
                                                <li className='item-help'><i className="bullet-01"></i><span className="fz-14 fc-7">입력하신 입찰가를 넘지 않는 금액에서 최종 클릭당 과금액이 결정되며, 경쟁 상황에 따라 최종 클릭 당 과금액은 변동될 수 있습니다.</span></li>
                                                <li className='item-help'><i className="bullet-01"></i><span className="fz-14 fc-7">키워드 월 예상성과는 평균 수치에 기반한 데이터로 실제 광고 성과와 다를 수 있습니다.</span></li>
                                            </ul>
                                        </div>
                                    </section>
                                </div>
                            </section>
                        </div>
                    </dd>
                </dl>
            </div>
        </div>
        <div className='box-footer'>
            <div className='box-center'>
                <button type='button' className='btn solid blue xlarge' onClick={onClickAdEvent}>광고등록</button>
            </div>
        </div>
    </section>
    <Modal title="광고그룹 추가" width={800}  
            open={isModalOpenAd} 
            onOk={handleOkAd} 
            onCancel={handleCancelAd}
            footer={[
            <Button key="back" onClick={handleCancelAd}>취소</Button>,
            <Button key="submit" type="primary"onClick={handleOkAd}>광고그룹 등록</Button>
            ]}
    >
        <section className='wrap-section wrap-tbl'>
            <div className='box-body'>
                <div className='tbl'>
                    <dl>
                        <dt>
                            <div className='dt-inner'>
                                <span className="fz-16 fw-med fc-7">광고그룹 추가<i className="txt-essential"></i></span>
                            </div>
                        </dt>
                        <dd>
                            <div className='form-group'>
                                <div className='input-group'>
                                    <div className='inner-input-group'>
                                        <input className="tf-comm" type="text" id="adGroupName" name="adGroupName" value={adgroupName} onChange={adGroupNameOnChange}/>
                                    </div>
                                    <p className="txt-validation">체크 / 에러 문구 내용 영역</p>
                                </div>
                            </div>
                        </dd>
                    </dl>
                </div>
            </div>
        </section>
    </Modal>
    <Modal title="키워드 추가" width={800}  
            open={isModalOpen} 
            onOk={handleOk} 
            onCancel={handleCancel}
            footer={[
            <Button key="back" onClick={handleCancel}>취소</Button>,
            <Button key="submit" type="primary"onClick={e =>handleOk()}>키워드 등록</Button>
            ]}
        >
        <section className='wrap-section wrap-tbl'>
            <div className='box-body'>
                <div className='tbl'>
                    <dl>
                        <dt>
                            <div className='dt-inner'>
                                <span className="fz-16 fw-med fc-7">키워드명 입력<i className="txt-essential"></i></span>
                            </div>
                        </dt>
                        <dd>
                            <div className='form-group'>
                                <div className='input-group'>
                                    <div className='inner-input-group'>
                                        <input className="tf-comm" type="text" id="addKwdName" name="addKwdName" value={kwdName} onChange={keyWordOnChange}/>
                                    </div>
                                    <p className="txt-validation">체크 / 에러 문구 내용 영역</p>
                                </div>
                            </div>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            <div className='dt-inner'>
                                <span className="fz-16 fw-med fc-7">입찰가 입력<i className="txt-essential"></i></span>
                            </div>
                        </dt>
                        <dd>
                            <div className='form-group'>
                                <div className='input-group'>
                                    <div className='inner-input-group'>
                                        <input className="tf-comm" type="number" id="addKwdBidCost" name="addKwdBidCost" value={bidCost} onChange={bidCostOnChange}/>
                                    </div>
                                    <p className='txt-validation'>체크 / 에러 문구 내용 영역</p>
                                </div>
                            </div>
                        </dd>
                    </dl>
                </div>
            </div>
        </section>
    </Modal>
    </>
);
};

export default App;
