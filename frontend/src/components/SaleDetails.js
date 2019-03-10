import React from "react";

export class SaleDetails extends React.Component {



  render() {

    const { details } = this.props;

    return (      
      <div className={"sale-details"}>
        <div>
          <h3 className="heading-tertiary u-margin-bottom-small">{details.title}</h3>
          <p className="paragraph">
            {details.description}
          </p>
        </div>
      </div>   
    );
  }
}

export default SaleDetails;
