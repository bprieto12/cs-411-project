import React, { Component } from 'react';
import Modal from '../../components/Modal/Modal';
import styles from "./TransactionCompleteModal.module.css";
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/fontawesome-free-solid';
import { faStar as regularStar} from '@fortawesome/fontawesome-free-regular';

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

const Stars = props => {
    return (
        <div>
            <div className={styles.StarIcon}>
                <FontAwesomeIcon icon={regularStar} />
            </div>
            <div className={styles.StarIcon}>
                <FontAwesomeIcon icon={regularStar} />
            </div>
            <div className={styles.StarIcon}>
                <FontAwesomeIcon icon={regularStar} />
            </div>
            <div className={styles.StarIcon}>
                <FontAwesomeIcon icon={regularStar} />
            </div>
            <div className={styles.StarIcon}>
                <FontAwesomeIcon icon={regularStar} />
            </div>
        </div>
    )
}

class TransactionCompleteModal extends Component {
    render() {
        return (
            <Modal show={this.props.show}>
                <div className={styles.Info}>
                    <p style={{color: "#14919B", fontSize: "35px", padding: "48px 24px 0px 24px", margin: 0}}>Take that global warming!</p>
                    <div className={styles.Amounts}>
                        <div className={styles.Amount}>
                            <p><span className={styles.Icon}><FontAwesomeIcon icon="wallet" /></span><b><span style={{color: "#2CB1BC"}}>$</span>{this.props.amount_due.toFixed(2)}</b></p>
                            <p style={{fontSize: "16px"}}>current amt. due</p>
                        </div>
                        <div className={styles.Amount}>     
                            <p><span className={styles.Icon}><FontAwesomeIcon icon="clock" /></span>{fancyTimeFormat(this.props.time_elapsed)}</p>
                            <p style={{fontSize: "16px"}}>min. elapsed</p>
                        </div>
                    </div>
                    <div className={styles.Rating}>
                        <p>How would you rate your experience?</p>
                        <Stars />
                    </div>
                    <div className={styles.FinishBtn}>
                        FINISH
                    </div>
                </div>
            </Modal>
        );
    }
}

export default TransactionCompleteModal;