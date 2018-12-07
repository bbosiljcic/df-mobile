import React, { Component } from 'react';

import Site from './layout/Site';
import Header from './layout/Header';
import Content from './layout/Content';
import Footer from './layout/Footer';

export default class Layout extends Component {
  render() {
    return (
      <Site>
        <Header />
        <Content />
        {/* <Footer /> */}
      </Site>
    );
  }
}
