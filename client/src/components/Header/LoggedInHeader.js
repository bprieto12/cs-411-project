import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const LoggedInHeader = (props) => {
    let paths = window.location.href.split('/');
    let window_user_id = paths[paths.length - 1];
    let user_id = props.user_id ? props.user_id : window_user_id;
    return (
        <div className={styles.Header}>
            <div className={styles.Left}><b>outlet</b></div>
            <div className={styles.Right}>
                <div className={styles.Nav}>
                    <Link to={"/chargestationsearch/" + user_id} className={styles.link}>
                        <div>Home</div>
                    </Link>
                    <Link to={"/myVehicles/" + user_id} className={styles.link}>
                        <div>My Cars</div>
                    </Link>
                    {/* <Link to={"chargestationsearch/" + user_id} className={styles.link}>
                        <div>My Homes</div>
                    </Link> */}
                    <Link to={"/transactions/" + user_id} className={styles.link}>
                        <div>Transactions</div>
                    </Link>
                    {/* <div className={[styles.NavItem, styles.Icon].join(' ')}>{props.userFirstName[0] + props.userLastName[0]}</div> */}
                </div>
            </div>
        </div>
    );
}

export default LoggedInHeader;