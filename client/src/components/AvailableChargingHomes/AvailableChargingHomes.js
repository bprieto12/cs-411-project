import React from "react";
import styles from "./AvailableChargingHomes.module.css";
import { noAuto } from "@fortawesome/fontawesome";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/fontawesome-free-solid';
import { faStar as regularStar} from '@fortawesome/fontawesome-free-regular';

const AvailableHomeBox = props => {
    const distance = props.home.distance_miles + " mi";
    let hotspot_flag = null;
    if (props.home.is_hotspot) {
        hotspot_flag = <div className={styles.topRightIcon}>Busy Location!</div>;
    }
    let stars = null;
    if (props.home.avg_rating) {
        stars = [1, 2, 3, 4, 5].map(starNum => {
            if (props.home.avg_rating >= starNum) {
                return <FontAwesomeIcon style={{color: "#E9B949", display: 'inline-block'}} icon={solidStar} />
                      
            } else {
                return <FontAwesomeIcon style={{color: "#E9B949", display: 'inline-block'}} icon={regularStar} />
                    
            }
        })
    }
    let review_count = null;
    if (props.home.num_reviews) {
        review_count = <div style={{display: 'inline-block', paddingLeft: "12px"}}>{(props.home.num_reviews + " review(s)")}</div> 
    }

    let review_summary = null;
    if (review_count == null || stars == null) {
        review_summary = <p><i>Brand New Home!</i></p>
    } else {
        review_summary = <p>{stars}{review_count}</p>
    }
    return (
        <div className={styles.AvailableHomeBox}>
            <div className={styles.DistanceBox}>
                <div className={styles.Distance}>{distance}</div>
            </div>
            <div className={styles.HomeDetails}>
                <p className={styles.Address}>{props.home.street_addr + ", " + props.home.zipcode + ", " + props.home.state}</p>
                {review_summary}
                <button onClick={() => props.handleStart(props.home)} className={styles.ChargeBtn}>Start Charging</button>
            </div>
            {hotspot_flag}
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