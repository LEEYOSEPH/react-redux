import * as React from 'react';
import ProductsSearchHeader from '../components/ProductsSearchHeader'
import ProductsSearchBody from '../components/ProductsSearchBody'
import ProductsSearchFooter from '../components/ProductsSearchFooter'

const App: React.FC = () => {
  return (<>
    <section className='wrap-section wrap-datagrid'>
      <ProductsSearchHeader/>
      <ProductsSearchBody/>
      <ProductsSearchFooter/>
    </section>
  </>);
};

export default App;
