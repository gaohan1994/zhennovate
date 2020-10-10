export const initState = {
  visible: false,
};

export const ACTION_TYPES_COMMON = {
  CHANGE_PAPERFORM_MODAL_VISIBLE: 'CHANGE_PAPERFORM_MODAL_VISIBLE',
};

export function paperformModal(state = initState, action) {
  switch (action.type) {
    case ACTION_TYPES_COMMON.CHANGE_PAPERFORM_MODAL_VISIBLE: {
      const { payload } = action;
      return {
        ...state,
        visible: payload,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
