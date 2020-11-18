export const initState = {
  userinfo: {
    _id: '5fb4d85d194f21052f809d39',
  },
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
      return {
        ...state,
      };
  }
}
