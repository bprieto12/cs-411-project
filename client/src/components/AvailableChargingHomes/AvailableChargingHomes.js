import React from "react";
import styles from "./AvailableChargingHomes.module.css";
import { noAuto } from "@fortawesome/fontawesome";

const AvailableHomeBox = props => {
    const distance = props.home.distance_miles + " mi";
    return (
        <div className={styles.AvailableHomeBox}>
            <div className={styles.DistanceBox}>
                <div className={styles.Distance}>{distance}</div>
            </div>
            <div className={styles.HomeDetails}>
                <p className={styles.Address}>{props.home.street_addr + ", " + props.home.zipcode + ", " + props.home.state}</p>
                <p>Rating: {props.home.avg_rating}</p>
                <button onClick={() => props.handleStart(props.home)} className={styles.ChargeBtn}>Start Charging</button>
            </div>
        </div>
    )
}

const AvailableChargingHomes = props => {
    let homes = null;
    let homeClasses = [];
    if (props.available_homes) {
        homes = props.available_homes.map(home => {
            return <AvailableHomeBox 
                            handleStart={props.checkin}
                            key={home.street_addr} 
                            home={home} />;
        })
        homeClasses = [styles.HomeContainer, styles.fade].join(" ");
    } else {
        homes = "No homes available";
        homeClasses = styles.HomeContainer;
    }

    return (
        <div>
            <p className={styles.AvailablePrompt}>Available Now</p>
            <div className={homeClasses}>
                {homes}
            </div>
        </div>
    );
}

export default AvailableChargingHomes;