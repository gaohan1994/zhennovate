import { useSelector, useDispatch } from 'react-redux';
import { Home_Actions } from '../store';
import moment from 'moment';

/**
 * 查询用户所做的action之后判断是否完成目标，如果完成了显示modal
 * @param {*} data
 */
const useHomeHooks = () => {
  const homeStore = useSelector((state) => state.homeStore);
  const dispatch = useDispatch();

  // 废弃
  const receiveWeeklyGoalCallback = (data) => {
    const { endCount, planEndCount } = data;
    if (endCount === planEndCount) {
      if (homeStore.showWeeklyCompleteModal === false) {
        showWeeklyCompleteModal();
      }
    }
  };

  // 获取是否显示过complete modal的token
  const getCheckCompleteModalTimeToken = (store) => {
    const { completeModalInfo, week } = store || homeStore;
    const { weekStart, weekEnd } = week;

    if (!weekStart) {
      return true;
    }

    console.log('completeModalInfo', homeStore.completeModalInfo);
    const { showCompleteModalTime } = completeModalInfo;

    // 没有上次显示过的时间 说明没显示过
    if (!showCompleteModalTime) {
      return false;
    }
    /**
     * @param token
     * 上次显示时间否在当周内
     */
    const token = moment(showCompleteModalTime).isBetween(
      moment(weekStart),
      moment(weekEnd),
    );

    // 如果上次显示时间在本周时间内，则显示过，返回false
    if (token) {
      return true;
    }

    // 如果上次显示时间不在本周时间内，则未显示过，返回true
    return false;
  };

  /**
   * @todo
   *
   * B情况介绍：
   * 用户设定了一星期完成2个action的目标。目标达到，首页weekly goal的圈圈转满。用户看到一个庆祝的动画。用户看完并关掉此动画。
   * 用户想提高对自己的挑战，于是把这星期的目标调成4个action.
   * 这时：
   * 首页weekly goal的圈圈从满变成不满。显示2/4，因为用户刚完成了2个action也算在内。
   * 当用户在同一周实现了另外2个action的时候，首页weekly goal的圈圈转满。用户将可以再一次看到庆祝的动画。用户看完并关掉此动画。
   * 如果用户没有在同一周实现另外2个action，那么用户是看不到动画的。
   * 当下一周来临时，weekly goal的圈圈将重新从零开始。目标保留用户最后一次的设定。
   */
  const changeWeeklyGoalValueCallback = (prevValue, nextValue) => {
    console.log('[prevValue]', prevValue);
    console.log('[nextValue]', nextValue);
    if (nextValue <= prevValue) {
      return;
    }

    dispatch({
      type: Home_Actions.Receive_CompleteModalInfo,
      payload: {}
    })
    return;
  };

  // 显示周目标modal，如果已经显示过则不再显示
  const showWeeklyCompleteModal = () => {
    // const token = getCheckCompleteModalTimeToken();

    // if (token) {
    //   return;
    // }
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
    getCheckCompleteModalTimeToken,
    changeWeeklyGoalValueCallback,
  };
};

export default useHomeHooks;
