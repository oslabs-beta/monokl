import { combineReducers } from 'redux';
import mainReducers from './mainReducer.js';

export default combineReducers({ mainReducer: mainReducers });

