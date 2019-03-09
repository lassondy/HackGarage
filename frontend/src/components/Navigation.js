import React from "react";
import { Link } from "@reach/router";
// import PropTypes from 'prop-types';

const Navigation = () => {
  
  const navItems = [
    {title: 'About', path: 'about'},
  ];

  return (
    <nav className="sidebar">
      <ul className="side-nav">
        {navItems.map((item) => (
          <li className="side-nav__item" key={item.path}>
            <Link to={item.path} className="side-nav__link">
              {item.title}
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
