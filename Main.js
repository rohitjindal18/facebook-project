import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './Components/App.js';

import store from './store/store.js';
import { Provider } from 'react-redux';

injectTapEventPlugin();

class AppMain extends React.Component {
  render(){
      return(
        <MuiThemeProvider>
        	<Provider store={store}>
          		<App {...this.props}/>
          	</Provider>
        </MuiThemeProvider>
      );
  }
};


ReactDOM.render(<AppMain/>, document.getElementById("root-div"));
