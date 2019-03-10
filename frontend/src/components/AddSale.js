import React from 'react';
import { Link } from "@reach/router";
import { DateRangePicker } from 'react-dates';
import {  navigate } from "@reach/router"

class AddSale extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  handleChange = (event) => this.setState({ [event.target.name]: event.target.value });
  
  saveSale = (event) => {
    event.preventDefault();
    this.setState({ btnDisabled: true });

    let { endDate, startDate, startTime, endTime } = { ...this.state };

    if (!endDate || !startDate) {
      this.setState({ btnDisabled: false });
      alert('Must provide start and end date!');
      return;
    }
    
    let startTimeArr = startTime.split(':');
    let endTimeArr = endTime.split(':');

    startDate.set({hours: startTimeArr[0], minutes: startTimeArr[1]});
    startDate = startDate.toDate();

    endDate.set({hours: endTimeArr[0], minutes: endTimeArr[1]});
    endDate = endDate.toDate();

    let data = {
      title: this.state.title,
      description: this.state.description,
      address: this.state.location,
      location: {},
      startDate: startDate,
      endDate: endDate,
    };
    
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({'address': this.state.location}, (results, status) => {
      if (status === 'OK') {
        data['location'] = results[0].geometry.location;
        console.log(results[0].geometry.location)
        console.log(JSON.stringify(data));

        
        fetch('https://httpbin.org/post', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).then(function(res){ return res.json(); })
        .then(function(respDate) {
          console.log( JSON.stringify( respDate )); 
          navigate('/');
        });
        
    
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }

      this.setState({ btnDisabled: false });
    });
  }

  render() {
    
   return (
    <div className="popup" id="popup">
      <div className="popup__content">

        <div className="popup__right">
            <Link to={'/'} className="popup__close">&times;</Link>
            
            <h2 className="heading-secondary u-margin-bottom-small">Add New</h2>
            <h3 className="heading-tertiary u-margin-bottom-small">Publish your garage sale</h3>

            <form className="form" onSubmit={this.saveSale}>
              <div className="form__group u-margin-bottom-small">
                <DateRangePicker
                  startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                  startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                  endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                  endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                  onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                  focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                  onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                />
              </div>
              <div className="form__group form__group--inline">
                <div className="form__inline-item">
                  <input 
                    onChange={this.handleChange}
                    type="time" 
                    className="form__input"
                    name="startTime"
                    id="startTime"
                    required
                  />
                  <label htmlFor="startTime" className="form__label">Start Time</label>
                </div>
                <div className="form__inline-item">

                  <input 
                    onChange={this.handleChange}
                    type="time" 
                    className="form__input"
                    name="endTime"
                    id="endTime"
                    required
                  />
                  <label htmlFor="endTime" className="form__label">End Time</label>
                </div>
              </div>
              <div className="form__group">
                  <input 
                    onChange={this.handleChange}
                    type="text" 
                    className="form__input"
                    placeholder="Title"
                    id="title"
                    name="title"
                    required
                  />
                  <label htmlFor="title" className="form__label">Title</label>
              </div>
              <div className="form__group">
                  <input
                    type="text" 
                    className="form__input" 
                    onChange={this.handleChange}
                    placeholder="Location" 
                    id="location" 
                    name="location"
                    required
                    />
                  <label htmlFor="location" className="form__label">Location</label>
              </div>

              <div className="form__group">
                  <textarea type="description" 
                    className="form__input" 
                    placeholder="Sale Description" 
                    id="description" 
                    onChange={this.handleChange}
                    name="description"
                    required/>
                  <label htmlFor="description" className="form__label">Sale Description</label>
              </div>

              <div className="form__group">
              <button className="btn btn--green" disabled={this.state.btnDisabled}>Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
   );
 }
}


export default AddSale;

AddSale.defaultProps = {

};
