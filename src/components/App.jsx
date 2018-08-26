import React from 'react';
import { BrowserRouter,Route } from 'react-router-dom';
import {connect} from 'react-redux';

import Head from './Head';
import Listings from './containers/Listings';
import Customize from './containers/Customize';

class App extends React.Component {
  render(){
    return(
      <BrowserRouter>
        <div className="main-container">
          <Head />
          <Route exact path="/" component={Listings}/>
          <Route exact path="/customize/:id" component={Customize}/>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
