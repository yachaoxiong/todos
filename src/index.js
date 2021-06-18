import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import App from './components/app';
import reducers from './reducers';
import 'antd/dist/antd.css';
import './index.css';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);
const appColor = localStorage.getItem('themeColor')
  ? ''
  : localStorage.setItem('themeColor', '#f8a488');

window.less
  .modifyVars({
    '@primary-color': localStorage.getItem('themeColor'),
  })
  .then(() => {
    console.log('color changed!', appColor);
  })
  .catch((error) => {
    console.error(error);
  });
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
