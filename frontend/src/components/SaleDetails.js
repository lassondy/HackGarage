import React from "react";
import moment from 'moment';

export class SaleDetails extends React.Component {

  state = {
    seconds: '00',   // responsible for the seconds 
    minutes: ''  // responsible for the minutes
  };

  render() {

    const { details } = this.props;
    

    return (      
      <div className={"sale-details"}>
        <div>
          <h3 className="heading-tertiary u-margin-bottom-small">{details.title}</h3>
          <p className="paragraph">
            <span className="sale-details--address">Address: </span> {details.address}
            <br/>
            <span className="sale-details--time u-margin-bottom-small">
              {moment(details.startDate).format('MMMM Do YYYY, h:mm:ss a')} - 
              {moment(details.endDate).format('MMMM Do YYYY, h:mm:ss a')}
            </span>
            <br/>
            {details.description}        
          </p>
        </div>
      </div>   
    );
  }
}

export default SaleDetails;
