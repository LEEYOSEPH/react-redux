import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'antd/dist/antd.css';
import './gsadp/css/common.css'
import './gsadp/css/layout.css';
import './gsadp/css/plugin.css';
import './gsadp/css/fonts/Pretendard/fonts.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {Provider} from 'react-redux'
import {store} from './state/store'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


