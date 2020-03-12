import React, { Component, Fragment } from 'react';
import styles from './SearchPage.module.css';
import AvailableChargingHomes from '../../components/AvailableChargingHomes/AvailableChargingHomes';
import UserCarSelector from '../../components/UserCarSelector/UserCarSelector';
import SearchBar from '../../components/SearchBar/SearchBar';
import Layout from '../../components/Layout/Layout';
import LoggedInHeader from '../../components/Header/LoggedInHeader';
import ChargingStationFilters from '../../components/ChargingStationFilters/ChargingStationFilters';
import ChargingModal from '../../containers/ChargingModal/ChargingModal';

// const host_url = "http://" + window.location.href.split('/')[2];

class SearchPage extends Component {
    state = {
        available_charging_stations: null,
        onlyShowFavorites: false,
        sortBy: null,
        userVehicles: null,
        showModal: false
    }

    componentDidMount() {
        // get user vehicles
        // assign the userVehicleSelected to the default vehicle
        let paths = window.location.href.split('/');
        const user_id = paths[paths.length - 1];
        const path = "/api/userCars?user_id=" + user_id;
        fetch(path).then(response => {
            console.log(response);
            return response.json();
        }).then(userCars => {
            console.log(userCars);
            if (userCars) {
                userCars.map(vehicle => {
                    vehicle.isSelected = vehicle.isDefault == 1;
                });
                
                this.setState({
                    userVehicles: userCars
                });
            } else {
                this.setState({
                    userVehicles: null
                });
            }
        }).catch(err => {
            this.setState({userVehicles: null})
        })

        
    }

    onSearch = async (addr) => {
        // either get the geolocation from the IP or the address, then
        console.log(addr);
        let address_url = new URL("https://us1.locationiq.com/v1/search.php");
        address_url.searchParams.set("key", "32198d7df186da");
        address_url.searchParams.set("format", "json");
        address_url.searchParams.set("q", addr);
        
        let response = await fetch(address_url);
        
        if (response.ok) {
            let geo_data = await response.json();
            let search_path = "/api/search/homes?latitude=" + geo_data[0].lat + "&longitude=" + geo_data[0].lon;
            let search_response = await fetch(search_path);
            if (search_response.ok) {
                let nearby_homes = await search_response.json();
                console.log(nearby_homes);
                this.setState({available_charging_stations: nearby_homes})
            }
        }
    }

    onUserVehicleSelected = (selectedLPN) => {
        const vehiclesCopy = [...this.state.userVehicles];
        vehiclesCopy.map(vehicle => {
            vehicle.isSelected = (vehicle.Lpn == selectedLPN);
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
            <Fragment>
                <LoggedInHeader />
                <Layout>
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
                    <ChargingModal checkout={this.handleCheckOut}/>
                </Layout>
            </Fragment>
        );
    }
}

export default SearchPage;