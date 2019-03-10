import React from "react";
import { Marker } from 'google-maps-react';
import CurrentLocation from './CurrentLocation';


export class MapContainer extends React.Component {



  render() {

    const { data, onMarkerClick, google, selectedSaleItem } = this.props;
    let markerIcons = [];

    data.forEach((saleDetails, idx) => {
      if (idx == selectedSaleItem) {
        markerIcons.push('/images/selectedpin.svg');
      } else {
        markerIcons.push('/images/pin.svg');
      }
    });

    return (
      <div className={"map"}>
      <CurrentLocation
        centerAroundCurrentLocation
        google={google}
      >
        {data.map((sale, idx) => 
          (<Marker 
              key={sale._id}
              options={{ icon: markerIcons[idx] }}
              onClick={() => onMarkerClick(idx)}
              position={{ lat: sale.location.latitude, lng: sale.location.longitude }}
          />)
        )}

        </CurrentLocation>
      </div>
    );
  }
}

export default MapContainer;
