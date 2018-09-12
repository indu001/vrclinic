import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/uielements/input';
import Button from '../../components/uielements/button';
import authAction from '../../redux/auth/actions';
import IntlMessages from '../../components/utility/intlMessages';
import ResetStyleWrapper from './resetpassword.style';
import axios from 'axios';

const { login } = authAction;
console.log(authAction);
console.log(login);

class ResetPassword extends Component {
  state = {
    redirectToReferrer: false,
    email:'',
    passw:''
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }
  handleLogin = () => {
    // const { login } = this.props;
    login();
    axios.post('http://localhost:3001/', {
      logemail:'user@abc.com',
      logpassword:'abc'

    }).then((response) => {
      console.log(response);
      this.props.history.push('/dashboard');
    })
    .catch((err) => {
      console.log(err)
    })
  };
  render() {
    const from = { pathname: '/dashboard' };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <ResetStyleWrapper className="isoResetPasswordPage">
        <div className="isoResetContentWrapper">
          <div className="isoFormContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <IntlMessages id="page.resetPassTitle" />
              </Link>
            </div>
            <div className="isoFormHeadText">
                <h3>
                    <IntlMessages id="page.resetPassSubTitle"/>
                </h3>
                <p>
                   <IntlMessages id="page.resetPassDescription"/>
                </p>
            </div>
            <div className="isoResetForm">
            <div className="isoInputWrapper">
                <Input size="large" type="password" placeholder="Password" />
              </div>
              <div className="isoInputWrapper">
                <Input size="large" type="password" placeholder=" Confirm Password" />
              </div>
              <div className="isoInputWrapper">
                <Button type="primary" onClick={this.handleLogin}>
                  <IntlMessages id="page.sendRequest" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ResetStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.get('idToken') !== null ? true : true,
  }),
  { login }
)(ResetPassword);
