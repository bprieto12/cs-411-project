import React from "react";
import styles from "./AvailableChargingHomes.module.css";

const AvailableHomeBox = props => {
    const distance = props.home.distance + " mi";
    return (
        <div className={styles.AvailableHomeBox}>
            <div className={styles.DistanceBox}>
                <div className={styles.Distance}>{distance}</div>
            </div>
            <div className={styles.HomeDetails}>
                <p className={styles.Address}>{props.home.address + ", " + props.home.zipcode + ", " + props.home.state}</p>
                <p>Rating: {props.home.rating_stars}</p>
                <button className={styles.ChargeBtn}>Start Charging</button>
            </div>
        </div>
    )
}

const AvailableChargingHomes = props => {
    let homes = null;
    if (props.available_homes) {
        homes = props.available_homes.map(home => {
            return <AvailableHomeBox key={home.address} home={home} />;
        })
    }

    return (
        <div>
            {homes}
        </div>
    );
}

export default AvailableChargingHomes;