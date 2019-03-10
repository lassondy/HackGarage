import React from "react";
import { Marker } from 'google-maps-react';
import CurrentLocation from './CurrentLocation';


export class MapContainer extends React.Component {

  state = {
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
  };

  onMarkerClick = (marker) =>
    this.setState({
      selectedMarker: marker
    });


  render() {

    return (
      <div className={"map"}>
      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
      >
        {this.props.data.map((sale, idx) => 
          (<Marker 
              key={sale._id}
              options={{ icon: '/images/pin.svg' }}
              onClick={() => this.props.onMarkerClick(idx)}
              position={{ lat: sale.location.latitude, lng: sale.location.longitude }}
          />)
        )}

        </CurrentLocation>
      </div>
    );
  }
}

export default MapContainer;
