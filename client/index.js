import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import App from './App.jsx';
import './styles.css';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') // anchor for hanging react app
  );
