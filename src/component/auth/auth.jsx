import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthRoute = ({ component: ComposedComponent, ...rest }) => {
  class AuthComponent extends React.Component {
    render() {
      // eslint-disable-next-line react/no-this-in-sfc
      const { isLogin, userinfo } = this.props;

      return (
        <Route
          {...rest}
          render={(props) => {
            /**
             * @todo 如果用户还没有登录则跳转到登录
             */
            return !isLogin ? (
              <Redirect
                to={{
                  pathname: `/sign/signin`,
                  state: { from: props.location },
                }}
              />
            ) : Number(userinfo.Status) !== 2 ? (
              /**
               * @todo 如果用户没有进行check则进行check
               */
              <Redirect
                to={{
                  pathname: `/sign/check`,
                  search: `?email=${userinfo.Email}&firstname=${
                    userinfo.FirstName
                  }&lastname=${userinfo.LastName}&organizationName=${
                    userinfo.Organization && userinfo.Organization.Name
                  }&organizationId=${
                    userinfo.Organization && userinfo.Organization._id
                  }`,
                  state: { from: props.location },
                }}
              />
            ) : Number(userinfo.Onboarding) !== 2 ? (
              <Redirect
                to={{
                  pathname: `/sign/check`,
                  search: `?renderType=Paperform`,
                  state: { from: props.location },
                }}
              />
            ) : (
              <ComposedComponent {...props} />
            );
          }}
        />
      );
    }
  }

  const AuthComponentContainer = connect((state) => {
    const rememberToken = state.sign.rememberToken;
    return {
      isLogin: rememberToken
        ? state.sign && state.sign.userinfo && state.sign.userinfo._id
        : state.signBlack &&
          state.signBlack.userinfo &&
          state.signBlack.userinfo._id,
      userinfo: rememberToken
        ? state.sign && state.sign.userinfo
        : state.signBlack && state.signBlack.userinfo,
    };
  })(AuthComponent);

  return <AuthComponentContainer />;
};

export default AuthRoute;
