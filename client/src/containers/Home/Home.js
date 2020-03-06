import React, { Component } from 'react';
import styles from './Home.module.css';
import WelcomeModal from '../WelcomeModal/WelcomeModal';
import HomeRegistrationModal from '../HomeRegistrationModal/HomeRegistrationModal';
import globalStyles from '../../core/GlobalStyles.module.css';

class Home extends Component {
    state = {
        show_welcome: false,
        show_home_registration: false,
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        error: false,
        user_id: null
    }

    handleRegistrationAttempt = () => {
        const path = '/api/register/newUser?email=' + this.state.email + "&pwd=" + this.state.password;
        fetch(path, {method: 'POST'}).then(response => {
            return response.json();
        }).then(user => {
            this.showWelcomeModal(user.user_id);
        }).catch(err => {
            this.setState({error: true});
        })
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
        let errStyle = this.state.error ? {border: '1px solid red'} : {};

        return (
            <div className={styles.Home}>
                <div className={[styles.Left, globalStyles.SerifFont].join(' ')}>
                    <h1>Don't let range anxiety stop you from doing what you want!</h1>
                    <p>Come join the thousands of other EV drivers who have experienced the flexible and modern solution to EV charging</p> 
                </div>
                <div className={styles.Right}>
                    <p className={styles.NewAccountTitle}>Create New Account</p>
                    <div className={styles.Names}>
                        <div className={styles.FirstName}>
                            <input 
                                className={styles.FormInput} 
                                style={errStyle}
                                placeholder="First name"
                                value={this.state.first_name}
                                onChange={e => this.setState({first_name: e.target.value})} />
                        </div>
                        <div className={styles.LastName}>
                            <input 
                                className={styles.FormInput} 
                                style={errStyle}
                                placeholder="Last name"
                                value={this.state.last_night}
                                onChange={e => this.setState({last_name: e.target.value})} />
                        </div>
                    </div>
                    <div>
                        <input 
                            className={[styles.FormInput, styles.FullWidth].join(' ')} 
                            style={errStyle}
                            placeholder="Email"
                            value={this.state.email}
                            onChange={e => this.setState({email: e.target.value})} />
                    </div>
                    <div>
                        <input 
                            className={[styles.FormInput, styles.FullWidth].join(' ')} 
                            style={errStyle}
                            placeholder="Password"
                            value={this.state.password}
                            onChange={e => this.setState({password: e.target.value})} />
                    </div>
                    <div>
                        <button className={styles.SignupBtn} onClick={() => this.handleRegistrationAttempt()}>SIGN UP</button>
                    </div>
                </div>
                <WelcomeModal onClose={this.hideWelcomeModal} 
                              nextPanel={this.showHomeRegistrationModal}
                              show={this.state.show_welcome}
                              user_id={this.state.user_id} />
                <HomeRegistrationModal onClose={this.showHomeRegistrationModal} 
                                       onRegister={this.showHomeSearchPage}
                                       show={this.state.show_home_registration} />
            </div>
        );
    }
}

export default Home;