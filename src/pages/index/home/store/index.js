import moment from 'moment';

export const initState = {
  weeklyCompleteModalVisible: false,
  week: {},
  completeModalInfo: {},
};

export const Home_Actions = {
  Show_Action_Weekly_Complete_Visible: 'Show_Action_Weekly_Complete_Visible',
  Receive_Week_Start: 'Receive_Week_Start',
};

export function homeStore(state = initState, action) {
  switch (action.type) {
    case Home_Actions.Receive_Week_Start: {
      const { weekStart } = action.payload;
      const start = moment(weekStart).format('YYYY-MM-DD');
      const weekEnd = moment(start).add(7, 'days').format('YYYY-MM-DD');
      return {
        ...state,
        week: {
          weekStart: start,
          weekEnd,
        },
      };
    }

    case Home_Actions.Show_Action_Weekly_Complete_Visible: {
      const { payload } = action;
      // 如果显示modal记录显示时间
      const showCompleteModalTime = moment().format('YYYY-MM-DD');
      return {
        ...state,
        weeklyCompleteModalVisible: payload,
        completeModalInfo: {
          ...state.completeModalInfo,
          showCompleteModalTime: showCompleteModalTime,
        },
      };
    }
    default:
      return {
        ...state,
      };
  }
}
