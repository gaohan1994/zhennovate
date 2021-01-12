import { useSelector, useDispatch } from 'react-redux';
import { Home_Actions } from '../store';

/**
 * 查询用户所做的action之后判断是否完成目标，如果完成了显示modal
 * @param {*} data
 */
const useHomeHooks = () => {
  const homeStore = useSelector((state) => state.homeStore);
  const dispatch = useDispatch();

  const receiveWeeklyGoalCallback = (data) => {
    const { endCount, planEndCount } = data;
    if (endCount === planEndCount) {
      if (homeStore.showWeeklyCompleteModal === false) {
        dispatch({
          type: Home_Actions.Show_Action_Weekly_Complete,
          payload: true,
        });
        showWeeklyCompleteModal();
      }
    }
  };

  const showWeeklyCompleteModal = () => {
    dispatch({
      type: Home_Actions.Show_Action_Weekly_Complete_Visible,
      payload: true,
    });
  };

  const hideWeeklyCompleteModal = () => {
    dispatch({
      type: Home_Actions.Show_Action_Weekly_Complete_Visible,
      payload: false,
    });
  };

  const toogleWeeklyCompleteModal = (visible) => {
    dispatch({
      type: Home_Actions.Show_Action_Weekly_Complete_Visible,
      payload: visible,
    });
  };

  return {
    homeStore,
    receiveWeeklyGoalCallback,
    showWeeklyCompleteModal,
    hideWeeklyCompleteModal,
    toogleWeeklyCompleteModal,
  };
};

export default useHomeHooks;
