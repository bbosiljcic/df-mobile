import React, { Component } from 'react';
import Router from '../Router';

export default class Content extends Component {
  render() {
    return (
      <main className="section section--content">
        <div className="container">
          <Router />
        </div>
      </main>
    );
  }
}
