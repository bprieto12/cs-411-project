import React, { Component } from 'react';
import Modal from '../../components/Modal/Modal';
import styles from './HomeRegistrationModal.module.css';
import globalStyles from '../../core/GlobalStyles.module.css';
import { Link } from 'react-router-dom';

class HomeRegistrationModal extends Component {
    render() {
        return (
            <Modal onClose={this.props.onClose}
                   show={this.props.show}>
                <div className={[styles.Container, globalStyles.SansSerifFont].join(' ')}>
                    <p className={styles.Header}>Last Step!</p>
                    <p>Would you like to earn money by joining the grid?</p>
                    <Link to={"/chargestationsearch"}>
                        <p>Skip</p>
                    </Link>
                    <div>
                        <input className={styles.FormInput} placeholder="Street Address" />
                    </div>
                    <div styles={{width: "100%", overflow: "auto"}}>
                        <input className={styles.FormInput} style={{float: 'left', width: "31%", marginLeft: '0px'}} placeholder="County" />
                        <input className={styles.FormInput} style={{float: 'left', width: "31%", marginLeft: '20px'}} placeholder="zipcode" />
                        <input className={styles.FormInput} style={{float: 'left', width: "31%", marginLeft: '20px'}} placeholder="State" />
                    </div>
                    <Link to={"/chargestationsearch"}>
                        <button className={styles.FinishBtn}>
                            Finish
                        </button>
                    </Link>
                </div>
            </Modal>
        );
    }
}

export default HomeRegistrationModal;