import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/logo.svg';
import Menu from './header/Menu';

export default class Header extends Component {
  render() {
    return (
      <header className="section section--header shadow">
        <div className="container">
          <Link className="logo-link" to="/">
            <img src={Logo} className="logo" alt="logo" />
          </Link>
          <Menu />
        </div>
      </header>
    );
  }
}
