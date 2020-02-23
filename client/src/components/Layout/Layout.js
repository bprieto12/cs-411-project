import React from 'react';
import styles from './Layout.module.css';
import LoggedInHeader from '../Header/LoggedInHeader';
import HomePageHeader from '../Header/HomePageHeader';

const Layout = (props) => {
	const fin_style = props.show ? [styles.Layout, styles.blur].join(' ') : styles.Layout;
	const header = props.loggedIn ? <LoggedInHeader userFirstName={props.userInfo.firstName} userLastName={props.userInfo.lastName} /> : <HomePageHeader />
	return (
		<div className={fin_style}>
			{header}
			<div className={styles.Content}>{props.children}</div>
		</div>
	)
}

export default Layout;