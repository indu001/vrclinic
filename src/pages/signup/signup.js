import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/uielements/input';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import authAction from '../../redux/auth/actions';
import IntlMessages from '../../components/utility/intlMessages';
import SignUpStyleWrapper from './signup.style';
import axios from 'axios';

const { login } = authAction;

class SignUp extends Component {
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
      <SignUpStyleWrapper className="isoSignUpPage">
        <div className="isoSignUpContentWrapper">
          <div className="isoSignUpContent">
            <div className="isoLogoWrapper">
              <Link to="/">
                <IntlMessages id="page.signUpTitle" />
              </Link>
            </div>

            <div className="isoSignUpForm">
            <div className="isoInputWrapper">
                <Input  size="large" type="text" placeholder="Username"/>
            </div>
            <div className="isoInputWrapper">
            <Input  size="large" placeholder="Email" type="text" />
            </div>
             <div className="isoInputWrapper">
             <Input size="large" type="password" placeholder="Password" />
             </div>
              <div className="isoInputWrapper">
                <Input size="large" type="password" placeholder=" ConfirmPassword" />
              </div>

              <div className="isoInputWrapper">
                <Checkbox>
                  <IntlMessages id="page.signUpTermsConditions" />
                </Checkbox>
              </div>
              <div className="isoInputWrapper">
                <Button type="primary" onClick={this.handleLogin}>
                  <IntlMessages id="page.signUpButton" />
                </Button>
              </div>
    
              <div className="isoCenterComponent isoHelperWrapper">
                <Link to="/signin">
                  <IntlMessages id="page.signUpAlreadyAccount" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SignUpStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.get('idToken') !== null ? true : true,
  }),
  { login }
)(SignUp);
