import React, {Component} from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import { CAMPSITES } from '../shared/campsites';
import { COMMENTS } from '../shared/comments';
import { PARTNERS } from '../shared/partners';
import { PROMOTIONS } from '../shared/promotions';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';


// set the local state in App.js so we have data from campsites.js inside App.js
class Main extends Component {
	constructor(props){
		super(props);
			this.state = {
				campsites: CAMPSITES,
				comments: COMMENTS,
				partners: PARTNERS,
				promotions: PROMOTIONS,
			};
	}

	render(){

		const HomePage = () => {
			return (
				<Home 
					campsite={this.state.campsites.filter(campsite => campsite.featured)[0]}
					promotion={this.state.promotions.filter(promotion => promotion.featured)[0]}
					partner={this.state.partners.filter(partner => partner.featured)[0]}

				/>
			);
		}


		return (
			<div>
				<Header />
				<Switch>
					<Route path='/home' component={HomePage} />
					<Route exact path='/directory' render={() => <Directory campsites={this.state.campsites} />} />
					<Route exact path='/contactus' component={Contact} />
					<Redirect to ='/Home' /> 
				</Switch>
				<Footer />
			</div>
		);
	};
}
// this export its for this entires file
export default Main;
