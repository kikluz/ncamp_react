import React, {Component} from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Directory from './components/DirectoryComponent';
import './App.css';
// import CAMPSITES array to this file
import {CAMPSITES} from './shared/campsites';
// set the local state in App.js so we have data from campsites.js inside App.js
class App extends Component {
	constructor(props){
		super(props);
			this.state = {
				campsites: CAMPSITES
			};
	}

	render(){
		return (
			<div className="App">

				<Navbar dark color="primary">
					<div className="container">
						<NavbarBrand href="/">NuCamp</NavbarBrand>
					</div>
				</Navbar>
			{/*Passing down as props to the Directory component*/}
				<Directory campsites={this.state.campsites} />

			</div>
			);
	}
}
// this export its for this entires file
export default App;
