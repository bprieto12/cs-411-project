import React, { Component, Fragment } from 'react';
import styles from './SignUpForm.module.css';

const isValidEmail = email => {
    return email != null && email != '';
}

const isValidPassword = pwd => {
    return pwd != null && pwd != '';
}

const isValidName = name => {
    return name != null && name != '';
}

class SignUpForm extends Component {
    state = {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        error: false,
        first_name_error: false,
        last_name_error: false,
        email_error: false,
        pwd_error: false,
    }

    handleRegistrationAttempt = async () => {
        this.setState(
            {
                error: false,
                first_name_error: false,
                last_name_error: false,
                email_error: false,
                pwd_error: false
            }
        )
        let num_errors = 0;
        if (!isValidName(this.state.first_name)) {
            num_errors = 1;
            this.setState({first_name_error: true});
        }

        if (!isValidName(this.state.last_name)) {
            num_errors += 1;
            this.setState({last_name_error: true});
        }

        if (!isValidEmail(this.state.email)) {
            num_errors += 1;
            this.setState({email_error: true});
        }

        if (!isValidPassword(this.state.password)) {
            num_errors += 1;
            this.setState({pwd_error: true});
        }

        if (num_errors == 0) {
            const path = '/api/register/newUser?email=' + this.state.email + "&pwd=" + this.state.password;
            let response = await fetch(path, {method: 'POST'});
            if (response.ok) {
                let user = await response.json(); 
                this.props.showWelcomeModal(user.user_id);
            } else {
                this.setState({error: true});
            }
        } else {
            this.setState({error: true});
        }
    }

    render() {
        let errStyle = this.state.error ? {border: '1px solid red'} : {};
        let fnErrStyle = this.state.first_name_error ? {color: 'red'} : {display: 'none'};
        let lnErrStyle = this.state.last_name_error ? {color: 'red'} : {display: 'none'};
        let emailErrStyle = this.state.email_error ? {color: 'red'} : {display: 'none'};
        let pwdErrStyle = this.state.pwd_error ? {color: 'red'} : {display: 'none'};

        return (
            <Fragment>
                <p className={styles.NewAccountTitle}>Create New Account</p>
                <div className={styles.Names}>
                    <div className={styles.FirstName}>
                        <p style={fnErrStyle} data-testid="first-name-error">Invalid first name</p>
                        <input 
                            className={styles.FormInput} 
                            data-testid="first-name-input"
                            style={this.state.first_name_error ? errStyle : {}}
                            placeholder="First name"
                            value={this.state.first_name}
                            onChange={e => this.setState({first_name: e.target.value})} />
                    </div>
                    <div className={styles.LastName}>
                        <p style={lnErrStyle} id="last-name-error">Invalid last name</p>
                        <input 
                            className={styles.FormInput} 
                            data-testid="last-name-input"
                            style={this.state.last_name_error ? errStyle : {}}
                            placeholder="Last name"
                            value={this.state.last_night}
                            onChange={e => this.setState({last_name: e.target.value})} />
                    </div>
                </div>
                <div>
                    <p style={emailErrStyle} id="email-error">Invalid email</p>
                    <input 
                        className={[styles.FormInput, styles.FullWidth].join(' ')} 
                        style={this.state.email_error ? errStyle : {}}
                        id="email-input"
                        data-testid="email-input"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={e => this.setState({email: e.target.value})} />
                </div>
                <div>
                    <p style={pwdErrStyle} id="pwd-error">Invalid password</p>
                    <input 
                        className={[styles.FormInput, styles.FullWidth].join(' ')} 
                        style={this.state.pwd_error ? errStyle : {}}
                        id="password-input"
                        data-testid="password-input"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={e => this.setState({password: e.target.value})} />
                </div>
                <div>
                    <button className={styles.SignupBtn} 
                    onClick={() => this.handleRegistrationAttempt()}
                    >SIGN UP</button>
                </div>
            </Fragment>
        );
    }
}

export default SignUpForm;