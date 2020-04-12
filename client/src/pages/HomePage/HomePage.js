import React, { Component, Fragment } from 'react';
import styles from './HomePage.module.css';
import WelcomeModal from '../../containers/WelcomeModal/WelcomeModal';
import HomePageHeader from '../../components/Header/HomePageHeader';
import Layout from '../../components/Layout/Layout';
import HomeRegistrationModal from '../../containers/HomeRegistrationModal/HomeRegistrationModal';
import globalStyles from '../../core/GlobalStyles.module.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

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
        console.log('new version');
        return (
            <Fragment>
                <p className={styles.NewAccountTitle}>Create New Account</p>
                <div className={styles.Names}>
                    <div className={styles.FirstName}>
                        <p style={fnErrStyle}>Invalid first name</p>
                        <input 
                            className={styles.FormInput} 
                            style={this.state.first_name_error ? errStyle : {}}
                            placeholder="First name"
                            value={this.state.first_name}
                            onChange={e => this.setState({first_name: e.target.value})} />
                    </div>
                    <div className={styles.LastName}>
                        <p style={lnErrStyle}>Invalid last name</p>
                        <input 
                            className={styles.FormInput} 
                            style={this.state.last_name_error ? errStyle : {}}
                            placeholder="Last name"
                            value={this.state.last_night}
                            onChange={e => this.setState({last_name: e.target.value})} />
                    </div>
                </div>
                <div>
                    <p style={emailErrStyle}>Invalid email</p>
                    <input 
                        className={[styles.FormInput, styles.FullWidth].join(' ')} 
                        style={this.state.email_error ? errStyle : {}}
                        placeholder="Email"
                        value={this.state.email}
                        onChange={e => this.setState({email: e.target.value})} />
                </div>
                <div>
                    <p style={pwdErrStyle}>Invalid password</p>
                    <input 
                        className={[styles.FormInput, styles.FullWidth].join(' ')} 
                        style={this.state.pwd_error ? errStyle : {}}
                        placeholder="Password"
                        value={this.state.password}
                        onChange={e => this.setState({password: e.target.value})} />
                </div>
                <div>
                    <button className={styles.SignupBtn} onClick={() => this.handleRegistrationAttempt()}>SIGN UP</button>
                </div>
            </Fragment>
        );
    }
}

class HomePage extends Component {
    state = {
        show_welcome: false,
        show_home_registration: false,
        user_id: null
    }

    showWelcomeModal = (user_id) => {
		this.setState({
            user_id: user_id,
			show_welcome: true
		})
    }

    hideWelcomeModal = () => {
        this.setState({
            show_welcome: false
        })
    }

    showHomeRegistrationModal = () => {
        this.setState({
            show_welcome: false,
			show_home_registration: !this.state.show_home_registration
		})
    }

    render() {
        return (
            <Fragment>
                <HomePageHeader />
                <Layout>
                    <div className={styles.Home}>
                        <div className={[styles.Left, globalStyles.SerifFont].join(' ')}>
                            
                            {/* <Map center={[33.826350,-117.841490]} zoom={13}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <Marker position={[33.826350,-117.841490]}>
                                <Popup>
                                    Home. <br /> base
                                </Popup>
                                </Marker>
                            </Map> */}
                            <div style={{width: '25em'}}> 
                                <h1>Don't let range anxiety stop you from doing what you want!</h1>
                                <p>Come join the thousands of other EV drivers who have experienced the flexible and modern solution to EV charging</p> 
                            </div>
                        </div>
                        <div className={styles.Right}>
                            <SignUpForm showWelcomeModal={this.showWelcomeModal} />
                        </div>
                        <WelcomeModal onClose={this.hideWelcomeModal} 
                                    nextPanel={this.showHomeRegistrationModal}
                                    show={this.state.show_welcome}
                                    user_id={this.state.user_id} />
                        <HomeRegistrationModal onClose={this.showHomeRegistrationModal} 
                                            onRegister={this.showHomeSearchPage}
                                            show={this.state.show_home_registration} />
                    </div>
                </Layout>
            </Fragment>
        );
    }
}

export default HomePage;