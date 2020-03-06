import React from 'react';
import styles from './UserCarSelector.module.css';
import fontawesome from '@fortawesome/fontawesome'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/fontawesome-free-solid';

const UserCarSelector = props => {
    let displayed_vehicles = null;
    if (props.userVehicles) {
        displayed_vehicles = props.userVehicles.map(vehicle => {
            return <UserCar 
                key={vehicle.lpn} 
                vehicle={vehicle}
                onClick={() => props.updateVehicleSelection(vehicle.lpn)} />
        });
    }
    return (
        <div className={styles.UserCarSelector}>
            <p style={{fontSize: 20, textAlign: 'left'}}><b>Current Car Used</b></p>
            {displayed_vehicles}
        </div>
    );
}

const UserCar = props => {
    let checkedBox = "";
    let checkBoxStyle = styles.CheckBoxUnselected;
    let boxStyle = styles.UserCarUnselected;
    if (props.vehicle && props.vehicle.isSelected) {
        checkedBox = <FontAwesomeIcon icon={faCheck} />;
        boxStyle = styles.UserCarSelected;
        checkBoxStyle = styles.CheckBoxSelected;
    }
    return (
        <div 
            className={[styles.UserCar, boxStyle].join(' ')}
            onClick={() => props.onClick()}>
            <div className={styles.Left}>
                <p style={{fontSize: 20}}>
                    <b>
                        {props.vehicle.year + ' ' + 
                        props.vehicle.make + ' ' +
                        props.vehicle.model}
                    </b>
                </p>
                <p style={{fontSize: 15}}>
                    LPN: {props.vehicle.lpn}
                </p>
            </div>
            <div className={[styles.Right, checkBoxStyle].join(' ')}>
                {checkedBox}
            </div>
        </div>
    );
}

export default UserCarSelector;