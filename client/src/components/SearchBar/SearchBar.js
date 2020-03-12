import React, { Component } from 'react';
import styles from './SearchBar.module.css';

class SearchBar extends Component {
    state = {
        address: ""
    }
    render() {
        return ( 
            <div style={{width: "100%", overflow: "auto"}}>
                <input value={this.state.address} onChange={e => this.setState({address: e.target.value})} className={styles.FormInput} placeholder="Address" />
                <button onClick={() => this.props.onsearch(this.state.address)} className={styles.SearchBtn}>Search</button>
            </div>
        )
    }
}

export default SearchBar;