import React, { Component } from 'react';
import styles from './HomeSearchPage.module.css';
import AvailableChargingHomes from '../../components/AvailableChargingHomes/AvailableChargingHomes';

class HomeSearchPage extends Component {
    state = {
        available_homes: null
    }

    onSearch() {
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
        this.setState({available_homes: homes}); 
    }

    render() {
        return (
            <div>
                <div className={styles.LeftPanel}>
                    <div className={styles.SortBox}>
                        Sort
                    </div>
                </div>
                <div className={styles.RightPanel}>
                    <p className={styles.BigPrompt}>Enter your location</p>
                    <div style={{width: "100%", overflow: "auto"}}>
                        <input className={styles.FormInput} placeholder="Address" />
                        <button onClick={() => this.onSearch()} className={styles.SearchBtn}>Search</button>
                    </div>
                    <button className={styles.FavoritesBtn}>My Favorites</button>
                    <p className={styles.AvailablePrompt}>Available Now</p>
                    <AvailableChargingHomes available_homes={this.state.available_homes} />
                </div>
            </div>
        );
    }
}

export default HomeSearchPage;