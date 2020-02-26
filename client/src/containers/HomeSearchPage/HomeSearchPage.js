import React, { Component } from 'react';
import styles from './HomeSearchPage.module.css';
import AvailableChargingHomes from '../../components/AvailableChargingHomes/AvailableChargingHomes';
import UserCarSelector from '../../components/UserCarSelector/UserCarSelector';
import SearchBar from '../../components/SearchBar/SearchBar';
import ChargingStationFilters from '../../components/ChargingStationFilters/ChargingStationFilters';
//import axios from 'axios';

class HomeSearchPage extends Component {
    state = {
        available_charging_stations: null,
        user_location: "",
        onlyShowFavorites: false,
        sortBy: null,
        userVehicles: null,
        userVehicleSelected: null
    }

    componentDidMount() {
        // get user vehicles
        // assign the userVehicleSelected to the default vehicle
        
        //axios.get('')
        const userVehicles = [
            {
                vehicleid: 1234,
                lpn: '3VER720',
                year: 2008,
                make: 'Toyota',
                model: 'Prius',
                plugType: 'Type A',
                isDefault: true
            },
            {
                vehicleid: 2224,
                lpn: '8WRS230',
                year: 2018,
                make: 'Tesla',
                model: 'Model S',
                plugType: 'Type B',
                isDefault: false
            },
            {
                vehicleid: 3333,
                lpn: '5WER234',
                year: 2010,
                make: 'Chevrolet',
                model: 'Bolt',
                plugType: 'Type A',
                isDefault: false
            }
        ];

        const selectedVehicle = userVehicles.filter(vehicle => vehicle.isDefault);
        this.setState({
            userVehicleSelected: selectedVehicle,
            userVehicles: userVehicles
        });
    }

    onSearch = () => {
        console.log("here")
        const homes = [
            {
                address: "2291 N Glennwood St",
                zipcode: 92865,
                favorite: 0,
                distance: 2.1,
                rating_stars: 4
            },
            {
                address: "23414 N Dians St",
                zipcode: 92865,
                favorite: 0,
                distance: 3.1,
                rating_stars: 4
            },
            {
                address: "114 W Commonwealth St",
                zipcode: 92849,
                favorite: 0,
                distance: 2.1,
                rating_stars: 4
            }
        ]
        this.setState({available_charging_stations: homes}); 
    }

    onUserVehicleSelected = (vehicle) => {
        this.setState({userVehicleSelected: vehicle});
    }

    handleFavoritesClick = () => {
        this.setState((prevState, prevProps) => {
            return {onlyShowFavorites: !prevState.onlyShowFavorites}
        })
    }

    handleSortSelection = (type) => {
        this.setState({sortBy: type});
    }
    
    render() {
        return (
            <div>
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
                        available_homes={this.state.available_charging_stations}
                        onlyShowFavorites={this.state.onlyShowFavorites}
                        sortBy={this.state.sortBy} 
                    />
                </div>
            </div>
        );
    }
}

export default HomeSearchPage;