import React from 'react';
import Aux from '../../hoc/Aux';
import styles from './ChargingStationFilters.module.css';

const ChargingStationFilters = props => {
    return (
        <Aux>
            <button className={styles.FavoritesBtn}>My Favorites</button>
            <button className={styles.FavoritesBtn}>Sort by</button>
        </Aux>
    );
}

export default ChargingStationFilters;