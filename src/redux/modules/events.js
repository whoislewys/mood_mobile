// type variable
import moment from 'moment';
import { colors } from '../../assets/styles';

const LOAD_EVENTS = 'events/LOAD';
const LOAD_EVENTS_SUCCESS = 'events/LOAD_SUCCESS';
const EVENT_CAL_ID = 'ghd4v0jfbsr5hjoe3isfjtt62s@group.calendar.google.com';
const GOOGLE_API_KEY = 'AIzaSyBBpspRcmIZc9XqVj3Xk6r227t1s02nnuQ';
// const clientID = '177472004471-tktd6itgn2h4vn2of9gskvl600mcjlko.apps.googleusercontent.com';
// const clientScrt = 'UoCupdbDxBoBhVnBEVNgpSuq';

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

export default function events(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_EVENTS:
      return { ...state, loading: true };
      // return { ...state, events: action.payload.items };
    case LOAD_EVENTS_SUCCESS:
      const rawEvents = action.payload.data.items;
      const formattedEvents = rawEvents.map(processEventObj);
      return { ...state, events: formattedEvents };
    default:
      return { ...state };
  }
}

export function loadEvents() {
  const dateTimeStart = moment().toISOString();
  return {
    type: LOAD_EVENTS,
    payload: {
      request: {
        url: `https://www.googleapis.com/calendar/v3/calendars/${EVENT_CAL_ID}/events`,
        params: {
          key: GOOGLE_API_KEY,
          timeMin: dateTimeStart,
          singleEvents: 'true',
          orderBy: 'startTime',
        },
      },
    },
  };
}
