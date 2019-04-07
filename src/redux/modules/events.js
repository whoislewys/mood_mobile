import axios from 'axios';
import moment from 'moment';
import { colors } from '../../assets/styles';
import {
  LOAD_EVENTS,
  LOAD_EVENTS_SUCCESS,
  LOAD_EVENTS_FAILURE,
  EVENT_CAL_ID,
  GOOGLE_API_KEY,
} from '../constants';

const initialState = {
  events: [],
};

const getTime = (militaryHours, minutes) => {
  let civTime = '';
  const intMilitaryHours = parseInt(militaryHours, 10);
  const intCivHours = intMilitaryHours % 12;

  if (intMilitaryHours === intCivHours) {
    civTime = `${intCivHours.toString()}:${minutes}a`;
  } else {
    civTime = `${intCivHours.toString()}:${minutes}p`;
  }
  return civTime;
};

const monthNumToStr = (monthNum) => {
  let parsedMonthNum;
  if (monthNum[0] === 0) {
    parsedMonthNum = parseInt(monthNum[1], 10);
  } else {
    parsedMonthNum = parseInt(monthNum, 10);
  }
  if (parsedMonthNum >= 1 && parsedMonthNum <= 12) {
    const months = ['FUCK_LUM', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL',
      'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const evenOrOddMonth = parsedMonthNum % 2 === 0 ? 'even' : 'odd';
    return { month: months[parsedMonthNum], evenOrOddMonth };
  }
  return { month: '???', evenOrOddMonth: '???' };
};

function processEventObj(event) {
  const { month, evenOrOddMonth } = monthNumToStr(event.start.dateTime.split('-')[1]);
  const day = event.start.dateTime.split('-')[2].split('T')[0];
  const militaryHours = event.start.dateTime.split('T')[1].slice(0, 2);
  const minutes = event.start.dateTime.split('T')[1].slice(3, 5);
  const timeStr = getTime(militaryHours, minutes);
  const location = event.location;
  const timeAndPlace = `${timeStr}, ${location}`;

  let borderColor;
  if (evenOrOddMonth === 'even') {
    borderColor = colors.orange;
  } else {
    borderColor = colors.pink;
  }

  return {
    id: event.id,
    borderColor,
    summary: event.summary,
    month,
    day,
    timeAndPlace,
    htmlLink: event.htmlLink,
  };
}

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_EVENTS:
      return { ...state, loading: true };
      // return { ...state, events: action.payload.items };
    case LOAD_EVENTS_SUCCESS:
      const rawEvents = action.payload.data.items;
      const formattedEvents = rawEvents.map(processEventObj);
      return { ...state, events: formattedEvents };
    case LOAD_EVENTS_FAILURE:
      // TODO: return some kind of no events error
      return state;
    default:
      return { ...state };
  }
}

export function loadEvents() {
  const dateTimeStart = moment({ hour: 0 }).toISOString();
  return async (dispatch) => {
    dispatch({ type: LOAD_EVENTS });
    try {
      const eventsReq = await axios.get(`https://www.googleapis.com/calendar/v3/calendars/${EVENT_CAL_ID}/events`,
        {
          params: {
            key: GOOGLE_API_KEY,
            timeMin: dateTimeStart,
            singleEvents: 'true',
            orderBy: 'startTime',
          },
        });
      dispatch({type: LOAD_EVENTS_SUCCESS, payload: eventsReq});
    } catch (_) {
      dispatch({type: LOAD_EVENTS_FAILURE});
    }
  };
}
