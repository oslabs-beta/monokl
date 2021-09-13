import { createStore } from 'redux';
import reducers from './reducers/index.js';

const store = createStore(reducers);

export default store; //should be in the index.js passed to Provider wrapper around App.jsx component
