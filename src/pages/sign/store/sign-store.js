export const initState = {
  userinfo: {},
};

export const Action_Types = {
  Receive_Userinfo: 'Receive_Userinfo',
};

export function sign(state = initState, action) {
  switch (action.type) {
    case Action_Types.Receive_Userinfo: {
      const { payload } = action;
      return {
        ...state,
        userinfo: payload,
      };
    }
    default:
      return state;
  }
}
