import React, { Component } from 'react';
import Modal from '../../components/Modal/Modal';
import styles from './WelcomeModal.module.css';

class WelcomeModal extends Component {
    state = {
        model_year: null,
        make: "",
        model: "",
        lpn: "",
        plugType: ""
    }

    onRegisterVehicle = () => {
        // const path = '/api/register/vehicle/' + this.props.user_id + '?' + 
        // fetch(path)
        
    }

    render() {
        let model_years = [<option>Model Year</option>]
        const current_year = new Date().getFullYear();
        for (let i = 0; i < 20; i++) {
            model_years.push(<option>{current_year - i}</option>)
        }

        return (
            <Modal onClose={this.props.onClose}
                   show={this.props.show}>
                <div className={styles.Container} data-testid="welcome-modal">
                    <h1>Welcome!</h1>
                    <p className={styles.Message}>A couple more steps and you're all set</p>
                    <p className={styles.Message}>First, let's register your car.<br />
                    <span style={{fontSize: "15px"}}>P.S. You can add as many cars as you'd like later.</span>
                    </p>
                    <input className={styles.FormInput} placeholder="License Plate Number" />
                    <select className={styles.FormSelect}>
                        {model_years}
                    </select>
                    <select className={styles.FormSelect}>
                        <option>Make Name</option>
                    </select>
                    <select className={styles.FormSelect}>
                        <option>Model Name</option>
                    </select>
                    <button style={{backgroundColor: "#C1C8E4", textAlign: "center"}} 
                            className={styles.FormInput}
                            onClick={() => this.onRegisterVehicle()} >
                        Next
                    </button>
                </div>
            </Modal>  
        );
    }
}

export default WelcomeModal;