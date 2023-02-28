import React from 'react';
import ProductsLayout from './pages/Products/layouts/ProductsLayouts';


function App() {
  return (
    <div className="App">
      <div className='wrap'>
          <aside className='sidebar'></aside>
          <div className='content'>
              <div className='content-header'>
                  <h2 className="fz-24 fw-smbold fc-10">광고 등록</h2>
              </div>
              <div className='content-body'>
                  <div className='container-fluid'>
                    <div className='row'>
                      <div className='col col-12'>
                        <ProductsLayout/>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}

export default App;
