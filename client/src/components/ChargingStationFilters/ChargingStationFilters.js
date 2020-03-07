import React, { Fragment } from 'react';
import styles from './ChargingStationFilters.module.css';

const ChargingStationFilters = props => {
    return (
        <Fragment>
            <button className={styles.FavoritesBtn}>My Favorites</button>
            <button className={styles.FavoritesBtn}>Sort by</button>
        </Fragment>
    );
}

export default ChargingStationFilters;