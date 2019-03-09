import React, { Fragment } from 'react';
// import { Router } from "@reach/router";

// shared
import Header from './Header';
import Map from './Map';

// content
// import About from './About';
// import Experience from './Experience';
// import Contact from './Contact';

export default class App extends React.Component {

  render() {
    return (
      <Fragment>
        <Header/>
        {/* <Router> */}
          {/* <About path="about"/>
          <Experience path="experience"/>
          <Contact path="contact"/> */}
        {/* </Router> */}
        <Map/>
      </Fragment>
    );
  }
}
