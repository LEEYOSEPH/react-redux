import {Collapse} from 'antd'
import ProductsSearchLayout from './ProductsSearchLayout';
import AddRegist from '../components/AddRegist';
import {useSelector} from 'react-redux'
import {State} from '../../../state'


export interface itemVO {
    itemId : number,
    itemNo : string,
    itemName : string
}

const App:React.FC = () => {
    
    /**
     * antd Collapse
     */
    const {Panel} = Collapse;
    const activeKey = useSelector((state: State)=> state.activeKey);

    return (
    <Collapse accordion activeKey={activeKey}>
        <Panel header="Step 1. 상품 검색 및 상품 선택" key="1">
            {/* 상품 검색 및 상품 선택 컴포넌트*/}
            <ProductsSearchLayout />
        </Panel>
        <Panel header="Step 2. 광고 등록" key="2">
            {/* 광고 등록 컴포넌트 */}
            <AddRegist/>
        </Panel>
    </Collapse>
    );
};
export default App;
