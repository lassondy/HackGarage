import React from "react";
import { InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from './CurrentLocation';


export class MapContainer extends React.Component {

  state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
  };

  onMarkerClick = (props, marker) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {

    return (
      <div className={"map"}>
      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
      >
        <Marker 
          onClick={this.onMarkerClick} 
          name={'current location'}
          options={{ icon: '/images/pin.svg',  scaledSize: { width: 12, height: 12 } }}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
          </InfoWindow>
        </CurrentLocation>
      </div>
    );
  }
}

export default MapContainer;
