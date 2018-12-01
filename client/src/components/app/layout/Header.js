import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <header className="section section--header shadow">
        <div className="container">
          <Link to="/"><h1>df-mobile</h1></Link>
        </div>
      </header>
    );
  }
}
