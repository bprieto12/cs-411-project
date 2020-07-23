import React, { Component, Fragment } from 'react';
import styles from './HomePage.module.css';
import WelcomeModal from '../../containers/WelcomeModal/WelcomeModal';
import HomePageHeader from '../../components/Header/HomePageHeader';
import Layout from '../../components/Layout/Layout';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import HomeRegistrationModal from '../../containers/HomeRegistrationModal/HomeRegistrationModal';
import globalStyles from '../../core/GlobalStyles.module.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';

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
                                {/* <button onClick={() => axios.get("/api/testCookie")}>Check cookie</button> */}
                            </div>
                        </div>
                        <div className={styles.Right}>
                            <span style={{fontSize: 24, paddingBottom: 12}}>Try out the app with these demo credentials:</span>
                            <ul style={{listStyleType: "none", textAlign: "left", paddingInlineStart: 0}}>
                                <li><i>username: </i><b>glycettoqj@webs.com</b></li>
                                <li><i>password: </i><b>1N1JCIOO</b></li>
                            </ul>
                        </div>
                        {/* <div className={styles.Right}>
                            <SignUpForm showWelcomeModal={this.showWelcomeModal} />
                        </div>
                        <WelcomeModal onClose={this.hideWelcomeModal} 
                                    nextPanel={this.showHomeRegistrationModal}
                                    show={this.state.show_welcome}
                                    user_id={this.state.user_id} />
                        <HomeRegistrationModal onClose={this.showHomeRegistrationModal} 
                                            onRegister={this.showHomeSearchPage}
                                            show={this.state.show_home_registration} /> */}
                    </div>
                </Layout>
            </Fragment>
        );
    }
}

export default HomePage;