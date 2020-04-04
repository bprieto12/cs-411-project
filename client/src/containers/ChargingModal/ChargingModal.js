import React, { Component } from 'react'
import styles from './ChargingModal.module.css';
import Modal from '../../components/Modal/Modal';
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faClock } from '@fortawesome/fontawesome-free-solid';

const fancyTimeFormat = (time) => {   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = (time % 60).toFixed(2);

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    if (mins < 10) {
        ret += "0" + mins + ":" + (secs < 10 ? "0" : "");
    } else {
        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    }
    
    ret += "" + secs;
    return ret;
}

class ChargingModal extends Component {
    state = {
        time_elapsed: 0,
        amount_due: 0
    }

    componentDidMount = () => {
        this.timer = setInterval(() => this.tick(), 60);
    }

    componenetWillUnmount = () => {
        clearInterval(this.timer);
    }

    tick = () => {
        if (this.props.show) {
            this.setState(prevState => {
                return {
                    time_elapsed: prevState.time_elapsed + 0.06,
                    amount_due: (prevState.time_elapsed + 0.06) * 0.02
                }
            })
        }
    }

    handleStopCharging = () => {
        console.log("in handleStopCharging")
        this.props.handleCheckOut(this.state.time_elapsed, this.state.amount_due);
    }

    render() {
        let addr = this.props.home ? this.props.home.street_addr + ", " + this.props.home.state + ", " + this.props.home.zipcode : null;
        return (
            <Modal show={this.props.show}>
                <div className={styles.Info}>
                    <p style={{color: "#186FAF", fontSize: "30px", marginBottom: 0}}>Now Charging</p>
                    <p style={{color: "#627D98", fontSize: "30px"}}>{addr}</p>
                    <div className={styles.Amounts}>
                        <div className={styles.Amount}>
                            <p><span className={styles.Icon}><FontAwesomeIcon icon="wallet" /></span><b><span style={{color: "#38BEC9"}}>$</span>{this.state.amount_due.toFixed(2)}</b></p>
                            <p style={{fontSize: "16px"}}>current amt. due</p>
                        </div>
                        <div className={styles.Amount}>     
                            <p><span className={styles.Icon}><FontAwesomeIcon icon="clock" /></span>{fancyTimeFormat(this.state.time_elapsed)}</p>
                            <p style={{fontSize: "16px"}}>min. elapsed</p>
                        </div>
                    </div>
                </div>
                <div onClick={() => this.handleStopCharging()} className={styles.StopChargingBtn}>
                    STOP CHARGING
                </div>
            </Modal>
        );
    }
}

export default ChargingModal;