import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

class Login extends Component {
    state = { 
        email: '',
        password: '',
        errorMessage: '',
        emailInvalid: false,
        passwordInvalid: false
    }

    componentWillMount = () => {
        firebase.auth().signOut();
    }

    handleLogin = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
            if (this.props.location.pathname === '/login') {
                this.props.history.push('/');
            }
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            this._setError(errorCode.indexOf('password') > -1 ? 'password' : 'email', errorMessage);
        });
    }

    _setError(field, message) {
        this.setState({ 
            [field + 'Invalid']: true,
            [field === 'email' ? 'passwordInvalid' : 'emailInvalid']: false,
            errorMessage: message
        });
    }

    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    handleKeyUp = (e) => {
        if ((e.which || e.keyCode) === 13) {
            this.handleLogin();
        }
    }

    render() {
        const { emailInvalid, passwordInvalid, errorMessage } = this.state;

        return (
            <section className="login">
                <h2 className="login-header">Sign in</h2>
                <form className="login-form">
                    <div>
                        <label>Email</label>
                        <InputText className={ emailInvalid ? 'error' : '' } value={ this.state.email } onChange={ this.handleEmailChange } onKeyUp={ this.handleKeyUp } />
                        { emailInvalid && <div className="error">{ errorMessage }</div> }
                    </div>
                    <div>
                        <label>Password</label>
                        <Password className={ passwordInvalid ? 'error' : '' } value={ this.state.password } onChange={ this.handlePasswordChange } onKeyUp={ this.handleKeyUp } />
                        { passwordInvalid && <div className="error">{ errorMessage }</div> }
                    </div>
                    <div className="login-button">
                        <Button type="button" label="Login" onClick={ this.handleLogin }></Button>
                    </div>
                </form>
            </section>
        );
    }
}
 
export default withRouter(Login);