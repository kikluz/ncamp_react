import React, {Component} from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import { CAMPSITES } from '../shared/campsites';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

// set the local state in App.js so we have data from campsites.js inside App.js
class Main extends Component {
	constructor(props){
		super(props);
			this.state = {
				campsites: CAMPSITES,
                selectedCampsite: null
			};
	}

    // method for click on
    onCampsiteSelect(campsiteId){
    this.setState({selectedCampsite: campsiteId});
  }


	render(){
		return (
			<div>
				<Header />
				<Directory campsites={this.state.campsites} onClick={campsiteId => this.onCampsiteSelect(campsiteId)} />
				<CampsiteInfo campsite={this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsite)[0]} />
				<Footer />
			</div>
			);
	};
}
// this export its for this entires file
export default Main;
