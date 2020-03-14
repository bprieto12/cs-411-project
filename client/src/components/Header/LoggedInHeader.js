import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const LoggedInHeader = (props) => {
    return (
        <div className={styles.Header}>
            <div className={styles.Left}>OUTLET</div>
            <div className={styles.Right}>
                <div className={styles.Nav}>
                    <Link to={"/chargestationsearch/" + props.user_id}>
                        <div className={styles.NavItem}>Home</div>
                    </Link>
                    <Link to={"/myVehicles/" + props.user_id}>
                        <div className={styles.NavItem}>My Cars</div>
                    </Link>
                    <div className={styles.NavItem}>My Homes</div>
                    {/* <div className={[styles.NavItem, styles.Icon].join(' ')}>{props.userFirstName[0] + props.userLastName[0]}</div> */}
                </div>
            </div>
        </div>
    );
}

export default LoggedInHeader;