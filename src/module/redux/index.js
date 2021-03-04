import { combineReducers } from 'redux';
import { paperformModal } from '@/component/paperform-modal/store';
import { sign, signBlackStore } from '@/pages/sign/store/sign-store';
import { calendarReducer } from '@/component/calendar/store';
import { homeStore } from '@/pages/index/home/store';
import { programReducer } from '@/pages/index/program/hooks';

export const reducer = combineReducers({
  paperformModal,
  sign,
  signBlack: signBlackStore,
  calendar: calendarReducer,
  homeStore: homeStore,
  programs: programReducer,
});
