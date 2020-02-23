import React from 'react';
import styles from './Header.module.css';

const Header = (props) => {
    return (
        <div className={styles.Header}>
            <div>OUTLET</div>
            <div>
                <input />
                <input />
            </div>
        </div>
    );
}

export default Header;