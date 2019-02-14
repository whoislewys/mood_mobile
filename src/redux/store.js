import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducer from './modules';

// const TOKEN = 'EXVbAWTqbGFl7BKuqUQv';
const URL = 'http://api.moodindustries.com/api/v1/';

const axiosConfig = {
  // interceptors: {
  //   request: [
  //     ({ getState, dispatch, getSourceAction }, req) => {
  //       console.log('Interception!!');
  //       console.log(req); // contains information about request object
  //       return req;
  //     },
  //   ],
  // },
};

// TODO: migrate to bearer token
const client = axios.create({
  baseURL: URL,
  responseType: 'json',
});

export default createStore(
  reducer,
  applyMiddleware(axiosMiddleware(client, axiosConfig), logger),
  applyMiddleware(thunk),
);
