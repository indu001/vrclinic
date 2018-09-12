import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/uielements/input';
import Button from '../../components/uielements/button';
import authAction from '../../redux/auth/actions';
import IntlMessages from '../../components/utility/intlMessages';
import ForgotStyleWrapper from './forgot.style';
import axios from 'axios';

const { login } = authAction;
console.log(authAction);
console.log(login);

class Forgot extends Component {
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
      <ForgotStyleWrapper className="isoForgotPasswordPage">
        <div className="isoFormContentWrapper">
          <div className="isoFormContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <IntlMessages id="page.forgetPassTitle" />
              </Link>
            </div>
            <div className="isoFormHeadText">
                <h3>
                    <IntlMessages id="page.forgetPassSubTitle"/>
                </h3>
                <p>
                   <IntlMessages id="page.forgetPassDescription"/>
                </p>
            </div>
            <div className="isoForgotForm">
              <div className="isoInputWrapper">
                <Input size="large" placeholder="Email" />
              </div>
              <div className="isoInputWrapper">
                <Button type="primary" onClick={this.handleLogin}>
                  <IntlMessages id="page.sendRequest" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ForgotStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.get('idToken') !== null ? true : true,
  }),
  { login }
)(Forgot);
