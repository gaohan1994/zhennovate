export const initState = {
  showWeeklyCompleteModal: false,
  weeklyCompleteModalVisible: false,
};

export const Home_Actions = {
  Show_Action_Weekly_Complete: 'Show_Action_Weekly_Complete',
  Show_Action_Weekly_Complete_Visible: 'Show_Action_Weekly_Complete_Visible',
};

export function homeStore(state = initState, action) {
  switch (action.type) {
    case Home_Actions.Show_Action_Weekly_Complete: {
      const { payload } = action;
      return {
        ...state,
        showWeeklyCompleteModal: payload,
      };
    }
    case Home_Actions.Show_Action_Weekly_Complete_Visible: {
      const { payload } = action;
      return {
        ...state,
        weeklyCompleteModalVisible: payload,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
