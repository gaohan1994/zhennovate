import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthRoute = ({ component: ComposedComponent, ...rest }) => {
  class AuthComponent extends React.Component {
    render() {
      // eslint-disable-next-line react/no-this-in-sfc
      const { isLogin } = this.props;
      return (
        <Route
          {...rest}
          render={(props) => {
            return !isLogin ? (
              <Redirect
                to={{
                  pathname: `/sign/signin`,
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
    };
  })(AuthComponent);

  return <AuthComponentContainer />;
};

export default AuthRoute;
