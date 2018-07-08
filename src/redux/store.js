import { createStore } from 'redux';
import Reducer from './reducers/reducers.js'

const store = createStore(Reducer);

export default store;
