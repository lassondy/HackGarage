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
import SaleDetails from './SaleDetails';

const data = [
  {
    _id: "01",
    title: "Marks Garage Sale",
    description: "I am going give away some old boxing stuff, lorem ipsum drugs",
    location: {
      latitude: 43.773620,
      longitude: -79.492140
    },
    endDate: "2019-03-12T02:20:55.923Z",
    startDate: "2019-03-10T02:22:55.923Z",
  },

  {
    _id: "02",
    title: "Josue's SPECIAL!!!",
    description: "I am going give away some old boxing stuff, lorem ipsum drugs",
    location: {
      latitude: 43.784200,
      longitude: -79.412840
    },
    endDate: "2019-03-15T02:20:55.923Z",
    startDate: "2019-03-10T02:22:55.923Z",
  }

];

class App extends React.Component {

  state = {
    selectedSaleItem: 0
  }

  setSaleItem = (idx) => {
    this.setState({ selectedSaleItem: idx});
  }

  render() {
    return (
      <div className="app-container">
        <div className="content">
          <Navigation/>
          <Router>
            {/* <About path="about"/>
            <Experience path="experience"/>
            <Contact path="contact"/> */}
            <AddSale path="add"/>
          </Router>
          <Map google={this.props.google} data={data} onMarkerClick={this.setSaleItem}/>
        </div>
        <SaleDetails
          details={data[this.state.selectedSaleItem]}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.MAP_API_KEY,
})(App);
