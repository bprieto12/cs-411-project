import React from 'react';
import styles from './Header.module.css';

const HomePageHeader = (props) => {
    return (
        <div className={styles.Header}>
            <div className={styles.Left}>OUTLET</div>
            <div className={styles.Right}>
                <div className={styles.Nav}>
                    <div className={styles.NavItem}><input className={styles.NavInput} placeholder="email" type="text" /></div>
                    <div className={styles.NavItem}><input className={styles.NavInput} placeholder="password" type="text" /></div>
                    <div className={styles.NavItem}><button className={styles.NavBtn}>Log in</button></div>
                </div>
            </div>
        </div>
    );
}

export default HomePageHeader;