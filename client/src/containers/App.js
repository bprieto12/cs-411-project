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
		loggedIn: true,
		userInfo: {
			userId: 1234,
			firstName: "User",
			lastName: "Name"
		}
	}

	handleModalBtnClick() {
		this.setState(prevState => {
			return {
				show: !prevState.show
			}
		})
	}

	handleLogIN(login) {
		this.setState({
			loggedIn: true
		})
	}

	handleLogOut() {
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
						updateLoginStatus={this.handleLogIN} 
						loggedIn={this.state.loggedIn}
						userInfo={this.state.userInfo}>
					<Switch>
						<Route path="/chargestationsearch">
							<HomeSearchPage />
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
