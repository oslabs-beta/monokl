import { createStore, applyMiddleware } from "redux";
//step3&4, npm install redux-thunk, then import
import thunk from "redux-thunk";
import reducers from "./reducers/index.js";

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
//should be in the index.js below App.jsx
