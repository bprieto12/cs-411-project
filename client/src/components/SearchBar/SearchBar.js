import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar = props => {
    return ( 
        <div style={{width: "100%", overflow: "auto"}}>
            <input className={styles.FormInput} placeholder="Address" />
            <button onClick={() => props.onsearch()} className={styles.SearchBtn}>Search</button>
        </div>
    )
}

export default SearchBar;