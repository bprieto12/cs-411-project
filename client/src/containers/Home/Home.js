import React, { Component } from 'react';
import styles from './Home.module.css';
import WelcomeModal from '../WelcomeModal/WelcomeModal';
import HomeRegistrationModal from '../HomeRegistrationModal/HomeRegistrationModal';
import globalStyles from '../../core/GlobalStyles.module.css';

class Home extends Component {
    state = {
        show_welcome: false,
        show_home_registration: false
    }

    showWelcomeModal = e => {
		this.setState({
			show_welcome: !this.state.show_welcome
		})
    }

    showHomeRegistrationModal = e => {
        this.setState({
            show_welcome: false,
			show_home_registration: !this.state.show_home_registration
		})
    }

    render() {
        return (
            <div className={styles.Home}>
                <div className={[styles.Left, globalStyles.SerifFont].join(' ')}>
                    <h1>Don't let range anxiety stop you from doing what you want!</h1>
                    <p>Come join the thousands of other EV drivers who have experienced the flexible and modern solution to EV charging</p> 
                    <div className={styles.Card}>
                        hello
                    </div>
                </div>
                <div className={styles.Right}>
                    <p className={styles.NewAccountTitle}>Create New Account</p>
                    <div className={styles.Names}>
                        <div className={styles.FirstName}>
                            <input className={styles.FormInput} placeholder="First name" />
                        </div>
                        <div className={styles.LastName}>
                            <input className={styles.FormInput} placeholder="Last name" />
                        </div>
                    </div>
                    <div>
                        <input className={[styles.FormInput, styles.FullWidth].join(' ')} placeholder="Email" />
                    </div>
                    <div>
                        <input className={[styles.FormInput, styles.FullWidth].join(' ')} placeholder="Password" />
                    </div>
                    <div>
                        <button className={styles.SignupBtn} onClick={() => this.showWelcomeModal()}>SIGN UP</button>
                    </div>
                </div>
                <WelcomeModal onClose={this.showWelcomeModal} 
                              onComplete={this.showHomeRegistrationModal}
                              show={this.state.show_welcome} />
                <HomeRegistrationModal onClose={this.showHomeRegistrationModal} 
                                       onComplete={this.showHomeSearchPage}
                                       show={this.state.show_home_registration} />
            </div>
        );
    }
}

export default Home;