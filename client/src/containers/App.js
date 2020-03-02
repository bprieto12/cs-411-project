import React, { Component } from 'react';
import './App.css';
import Home from './Home/Home';
import Layout from '../components/Layout/Layout';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from 'react-router-dom';
import HomeSearchPage from './HomeSearchPage/HomeSearchPage';

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
			  	<Layout show={this.state.show} 
						handleLogIN={this.handleLogIN} 
						loggedIn={this.state.loggedIn}
						user_id={this.state.user_id}>
					<Switch>
						<Route path={"/chargestationsearch/" + this.state.user_id}>
							<HomeSearchPage user_id={this.state.user_id} />
						</Route>
						<Route path="/">
							<Home />
						</Route>
						
					</Switch>
		      	</Layout>
		    </div>
		  );
	}
}

export default App;
