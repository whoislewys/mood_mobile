const DATA_TRACK_TOGGLE = 'settings/DATA_TRACK_TOGGLE';

const initialState = {
  dataShouldBeTracked: true,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case DATA_TRACK_TOGGLE:
      return { ...state, dataShouldBeTracked: action.dataShouldBeTracked };
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
