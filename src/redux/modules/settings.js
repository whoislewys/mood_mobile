import {
  DATA_TRACK_TOGGLE,
} from '../constants';

const initialState = {
  dataShouldBeTracked: true,
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case DATA_TRACK_TOGGLE:
      return { ...state, dataShouldBeTracked: !state.dataShouldBeTracked };
    default:
      return state;
  }
}

export function handleDataToggle(dataShouldBeTracked) {
  return {
    type: DATA_TRACK_TOGGLE,
    dataShouldBeTracked,
  };
}
