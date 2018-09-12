import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';

import App from './containers/App/App';
import asyncComponent from './helpers/AsyncFunc';

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props => isLoggedIn
      ? <Component {...props} />
      : <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location },
          }}
        />}
  />
);
const PublicRoutes = ({ history, isLoggedIn }) => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Route
          exact
          path={'/'}
          component={asyncComponent(() => import('./pages/signin/signin'))}
        />
        <Route
          exact
          path={'/signin'}
          component={asyncComponent(() => import('./pages/signin/signin'))}
        />
          <Route
          exact
          path={'/signup'}
          component={asyncComponent(() => import('./pages/signup/signup'))}
        />
         <Route
          exact
          path={'/forgot'}
          component={asyncComponent(() => import('./pages/forgot/forgot'))}
        />
          <Route
          exact
          path={'/reset'}
          component={asyncComponent(() => import('./pages/resetpassword/resetpassword'))}
        />
        <RestrictedRoute
          path="/dashboard"
          component={App}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </ConnectedRouter>
  );
};

export default connect(state => ({
  isLoggedIn: state.Auth.get('idToken') !== null,
}))(PublicRoutes);
