import React from "react";
import { Link } from "@reach/router";
// import PropTypes from 'prop-types';

const Navigation = () => {
  
  const navItems = [
    {title: 'Filter', path: 'filter', icon: 'icon-filter'},
    {title: 'Add Sale', path: 'add', icon: 'icon-calendar-plus-o'},
  ];

  return (
    <nav className="sidebar">
      <ul className="side-nav">
        {navItems.map((item) => (
          <li className="side-nav__item" key={item.path}>          
            <Link to={item.path} className="side-nav__link">
              <svg className="side-nav__icon">
                  <use xlinkHref={`/images/sprite.svg#${item.icon}`}></use>
              </svg>
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Navigation.propTypes = {
};

export default Navigation;
