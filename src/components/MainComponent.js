import React, {Component} from 'react';
// import { Navbar, NavbarBrand } from 'reactstrap';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect} from 'react-redux';
import About from './AboutComponent';
import { Connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { addComment, fetchCampsites } from '../redux/ActionCreators';

// get the state from from redux by setup the map state to props
// with take the state as an arguement

const mapStateToProps = state => {
	return { 
		// return campsites comments partnes and promotions arrays as props 
		campsites: state.campsites,
		comments: state.comments,
		partners: state.partners,
		promotions: state.promotions

	}
}


const mapDispatchToProps = {
	addComment: (campsiteId, rating, author, text) => (addComment(campsiteId, rating, author, text)),
    fetchCampsites: () => (fetchCampsites()),
	// this is tthe value for a function, we use the model name the setup for the entire form (feedbackForm in configureStore.js)
	// pass that reset feedback form function as a prop in (Route)
	resetFeedbackForm: () => (actions.reset('feedbackForm'))
};

// set the local state in App.js so we have data from campsites.js inside App.js
class Main extends Component {

	componentDidMount() {
        this.props.fetchCampsites();
    }

	render(){

		const HomePage = () => {
			return (
				<Home 
				campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
				campsitesLoading={this.props.campsites.isLoading}
				campsitesErrMess={this.props.campsites.errMess}
				promotion={this.props.promotions.filter(promotion => promotion.featured)[0]}
				partner={this.props.partners.filter(partner => partner.featured)[0]}

				/>
			);
		}

		const CampsiteWithId = ({match}) => {
            return (
                <CampsiteInfo 
				campsite={this.props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
				isLoading={this.props.campsites.isLoading}
				errMess={this.props.campsites.errMess}
				comments={this.props.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
				addComment={this.props.addComment}
                />
            );
        };  


		return (
			<div>
				<Header />
				<Switch>
					<Route path='/home' component={HomePage} />
					{/* render is for passing the this.state. */}
					<Route exact path='/directory' render={() => <Directory campsites={this.props.campsites} />} />
					<Route path='/directory/:campsiteId' component={CampsiteWithId} />
					<Route exact path='/contactus' render={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} /> } />
					{/* Update MainComponent to integrate the AboutComponent into the single page application. */}
					<Route exact path='/aboutus' render={() => <About partners={this.props.partners} />} />
					<Redirect to ='/Home' /> 
				</Switch>
				<Footer />
			</div>
		);
	};
}
// this export its for this entires file
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
