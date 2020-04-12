import React, { Component } from 'react';
import './App.css';
import HomePage from '../pages/HomePage/HomePage';
import Layout from '../components/Layout/Layout';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from 'react-router-dom';
import SearchPage from '../pages/SearchPage/SearchPage';
import MyVehiclesPage from '../pages/MyVehiclesPage/MyVehiclesPage';
import TransactionsPage from '../pages/TransactionsPage/TransactionsPage';

class App extends Component {
	state = {
		show: false,
		loggedIn: false,
		user_id: null
	}

	handleModalBtnClick = () => {
		this.setState(prevState => {
			return {
				show: !prevState.show
			}
		})
	}

	handleLogIN = (id) => {
		console.log("logged in")
		this.setState({
			loggedIn: true,
			user_id: id
		})
	}

	handleLogOut = () => {
		this.setState({
			loggedIn: false
		})
	}

    // <button onClick={e => this.handleModalBtnClick()}>{modal_btn_text}</button>
	render() {
		let modal_btn_text = "Show Modal";

		if (this.state.show) {
			modal_btn_text = "Hide Modal";
		}

		return (
		    <div className="App">
				<Switch>
					<Route path="/transactions/:user_id">
						<TransactionsPage />
					</Route>
					<Route path="/chargestationsearch/:user_id">
						<SearchPage />
					</Route>
					<Route path="/myVehicles/:user_id">
						<MyVehiclesPage />
					</Route>
					<Route path="/">
						<HomePage />
					</Route>
				</Switch>
		    </div>
		  );
	}
}

export default App;
