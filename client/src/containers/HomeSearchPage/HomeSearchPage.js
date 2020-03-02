import React, { Component } from 'react';
import styles from './HomeSearchPage.module.css';
import AvailableChargingHomes from '../../components/AvailableChargingHomes/AvailableChargingHomes';
import UserCarSelector from '../../components/UserCarSelector/UserCarSelector';
import SearchBar from '../../components/SearchBar/SearchBar';
import ChargingStationFilters from '../../components/ChargingStationFilters/ChargingStationFilters';
import ChargingModal from '../ChargingModal/ChargingModal';
import Aux from '../../hoc/Aux';

// const host_url = "http://" + window.location.href.split('/')[2];

class HomeSearchPage extends Component {
    state = {
        available_charging_stations: null,
        user_location: "",
        onlyShowFavorites: false,
        sortBy: null,
        userVehicles: null,
        showModal: false
    }

    componentDidMount() {
        // get user vehicles
        // assign the userVehicleSelected to the default vehicle
        
        fetch("/api/userCars").then(response => {
            console.log(response);
            return response.json();
        }).then(userCars => {
            userCars.map(vehicle => {
                vehicle.isSelected = vehicle.isDefault;
            });
            console.log(userCars);
            this.setState({
                userVehicles: userCars
            });
        })

        
    }

    onSearch = () => {
        fetch("/api/homes").then(response => {
            return response.json();
        }).then(homes => {
            this.setState({available_charging_stations: homes});
        }).catch(err => {
            console.log(err);
        });

        fetch("/api/ip").then(response => {
            return response.json();
        }).then(ip => {
            console.log(ip);
        })
    }

    onUserVehicleSelected = (selectedLPN) => {
        const vehiclesCopy = [...this.state.userVehicles];
        vehiclesCopy.map(vehicle => {
            vehicle.isSelected = (vehicle.lpn == selectedLPN);
        });
        this.setState({userVehicles: vehiclesCopy});
    }

    handleFavoritesClick = () => {
        this.setState((prevState, prevProps) => {
            return {onlyShowFavorites: !prevState.onlyShowFavorites}
        })
    }

    handleSortSelection = (type) => {
        this.setState({sortBy: type});
    }

    handleCheckIn = () => {
        this.setState({showModal: true});
    }

    handleCheckOut = () => {
        this.setState({showModal: false});
    }
    
    render() {
        return (
            <Aux>
                <div className={styles.PageStyles}>
                    <div className={styles.LeftPanel}>
                        <UserCarSelector
                            userVehicles={this.state.userVehicles}
                            updateVehicleSelection={this.onUserVehicleSelected} 
                        />
                    </div>
                    <div className={styles.RightPanel}>
                        <p className={styles.BigPrompt}>Enter your location</p>
                        <SearchBar onsearch={this.onSearch} />
                        <ChargingStationFilters 
                            onUseFavorites={this.handleFavoritesClick} 
                            onUpdateSort={this.handleSortSelection}
                        />
                        <AvailableChargingHomes
                            checkin={this.handleCheckIn}
                            available_homes={this.state.available_charging_stations}
                            onlyShowFavorites={this.state.onlyShowFavorites}
                            sortBy={this.state.sortBy} 
                        />
                    </div>
                </div>
                <ChargingModal  
                    checkout={this.handleCheckOut}/>
            </Aux>
        );
    }
}

export default HomeSearchPage;