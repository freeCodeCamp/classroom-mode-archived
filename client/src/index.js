import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'mobx-react'
import StudentStore from './stores/StudentStore'

const Root = (
  <Provider StudentStore={StudentStore}>
    <App />
  </Provider>
);

ReactDOM.render(Root, document.getElementById('root'));
registerServiceWorker();
