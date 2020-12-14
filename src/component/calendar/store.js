import { useDispatch } from 'react-redux';

const initState = {
  data: {},
  visible: false,
};

export const CalendarActions = {
  show: 'show',
  hide: 'hide',
};

export function calendarReducer(state = initState, action) {
  switch (action.type) {
    case CalendarActions.show: {
      const { payload = {} } = action;
      return {
        ...state,
        visible: true,
        data: payload,
      };
    }
    case CalendarActions.hide: {
      return {
        ...state,
        visible: false,
        data: {},
      };
    }
    default: {
      return { ...state };
    }
  }
}

function useCalendar() {
  const dispatch = useDispatch();

  const showCalendar = (data) => {
    dispatch({
      type: CalendarActions.show,
      payload: data,
    });
  };

  const hideCalendar = (data) => {
    dispatch({ type: CalendarActions.hide });
  };

  return {
    showCalendar,
    hideCalendar,
  };
}

export default useCalendar;
