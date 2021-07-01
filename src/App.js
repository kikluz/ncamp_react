import React, {Component} from 'react';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import './App.css';


// Capture the return value 
const store = ConfigureStore();

class App extends Component {


	render(){
		return (
			// wrap with provder and give store as a attribute this makes the redux store available
			// to all components 
			<Provider store={store}>
				<BrowserRouter>
					<div className="App">
						<Main />
					</div>
				</BrowserRouter>
			</Provider>
			);
	}
}
// this export its for this entires file
export default App;
