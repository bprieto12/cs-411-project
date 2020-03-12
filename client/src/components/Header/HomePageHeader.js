import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styles from './Header.module.css';

class HomePageHeader extends Component {
    state = {
        email: "",
        password: "",
        user_id: null,
        logInSuccessful: false,
        error: false
    }

    handleSignInAttempt = () => {
        const path = '/api/userLogin?email=' + this.state.email + "&pwd=" + this.state.password;
        fetch(path).then(response => {
            console.log(response);
            return response.json();
        }).then(user => {
            console.log("user id: " + user[0].user_id)
            this.setState({logInSuccessful: true, user_id: user[0].user_id});
        }).catch(err => {
            this.setState({error: true, user_id: null});
        });
    }
    
    render() {
        if (this.state.logInSuccessful) {
            return <Redirect push to={"/chargestationsearch/" + this.state.user_id} />
        }

        const errStyle = this.state.error ? {border: '1px solid red'} : {};

        return (
            <div className={styles.Header}>
                <div className={styles.Left}>outlet</div>
                <div className={styles.Right}>
                    <div className={styles.Nav}>
                        <div className={styles.NavItem}>
                            <input 
                                className={styles.NavInput}
                                style={errStyle}
                                placeholder="email" 
                                type="text"
                                value={this.state.email}
                                onChange={e => this.setState({email: e.target.value, error: false})}
                            />
                        </div>
                        <div className={styles.NavItem}>
                            <input 
                                className={styles.NavInput} 
                                style={errStyle}
                                placeholder="password" 
                                type="text"
                                value={this.state.password}
                                onChange={e => this.setState({password: e.target.value, error: false})}
                            />
                        </div>
                        <div className={styles.NavItem}>
                            <button 
                                className={styles.NavBtn}
                                onClick={() => this.handleSignInAttempt()}>Log in</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePageHeader;