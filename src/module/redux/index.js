import { combineReducers } from 'redux';
import { paperformModal } from '@/component/paperform-modal/store';
import { sign } from '@/pages/sign/store/sign-store';
import { calendarReducer } from '@/component/calendar/store';

export const reducer = combineReducers({
  paperformModal,
  sign,
  calendar: calendarReducer,
});
