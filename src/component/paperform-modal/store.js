export const initState = {
  visible: false,
  data: {},
  moduleData: {},
};

export const ACTION_TYPES_COMMON = {
  CHANGE_PAPERFORM_MODAL_VISIBLE: 'CHANGE_PAPERFORM_MODAL_VISIBLE',
};

export function paperformModal(state = initState, action) {
  switch (action.type) {
    case ACTION_TYPES_COMMON.CHANGE_PAPERFORM_MODAL_VISIBLE: {
      const { payload } = action;
      const { visible, data = {}, moduleData = {} } = payload;
      return {
        ...state,
        visible,
        data,
        moduleData,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
