import React from "react";
import moment from 'moment';

export class SaleDetails extends React.Component {

  state = {
    seconds: '00',   // responsible for the seconds 
    minutes: ''  // responsible for the minutes
  };

  render() {

    const { details, deselectItem } = this.props;
    

    return (      
      <div className={"sale-details"}>
        <span className="sale-details__close" onClick={deselectItem}>&times;</span>
        <h3 className="heading-tertiary u-margin-bottom-small">{details.title}</h3>
        <p className="paragraph">
          <span className="sale-details__address">Address: </span> {details.address}
          <br/>
          <span className="sale-details__time u-margin-bottom-small">
            {moment(details.startDate).format('MMMM Do YYYY, h:mm:ss a')}
            &mdash;
            {moment(details.endDate).format('MMMM Do YYYY, h:mm:ss a')}
          </span>
          <br/>
          {details.description}        
        </p>
      </div>   
    );
  }
}

export default SaleDetails;
