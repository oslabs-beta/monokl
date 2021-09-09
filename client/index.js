import React from "react";
import ReactDOM from "react-dom";

import App from "./App.jsx";
import "./styles.css";


// ReactDOM.render(<App />, document.getElementById("root"));


import store from './store.js';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

render(
    <Provider store={store}> 
      <App />
    </Provider>,
  document.getElementById('root') // anchor
  );
  