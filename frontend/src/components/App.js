import React from 'react';
import { Router } from "@reach/router";
import { GoogleApiWrapper } from 'google-maps-react';

// shared
import Map from './Map';
import Navigation from './Navigation';

// content
// import About from './About';
// import Experience from './Experience';
import AddSale from './AddSale';

class App extends React.Component {

  render() {
    return (
      <div className="app-container">
        <Navigation/>
        <Router>
          {/* <About path="about"/>
          <Experience path="experience"/>
          <Contact path="contact"/> */}
          <AddSale path="add"/>
        </Router>
        <Map google={this.props.google}/>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.MAP_API_KEY,
})(App);
