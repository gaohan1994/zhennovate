export const initState = {
  userinfo: {
    CreateAt: '2021-01-06T03:13:19.062Z',
    Email: 'Lauren@gmail.com',
    Name: 'Lauren',
    Password: '65903d7d1f12c888af536d7adb0d3df1',
    Status: '1',
    __v: 0,
    _id: '5ff52acf1430331764267a83',
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
      return state;
  }
}
