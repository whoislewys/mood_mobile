import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// import { updateCurrentTrack } from './middlewares/update-current-track';

import reducer from './modules';

export default createStore(
  reducer,
  applyMiddleware(thunk, logger),
);
