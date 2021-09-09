import { createStore, applyMiddleware } from "redux";


import reducers from "./reducers/index.js";

const store = createStore(
  reducers
);

export default store;
//should be in the index.js below App.jsx
