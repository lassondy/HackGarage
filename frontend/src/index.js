/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';

// COMPONENTS
import App from './components/App';

// STYLES
import 'normalize.css';
import './styles/main.scss';
import sprite from './images/sprite.svg';
import pin from './images/pin.svg'
import house from './images/house.svg'

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';


ReactDOM.render(<App/>, document.getElementById('app'));
