import React, { PureComponent } from 'react';

import Site from './layout/Site';
import Header from './layout/Header';
import Content from './layout/Content';
import Footer from './layout/Footer';

export default class Layout extends PureComponent {
  render() {
    return (
      <Site>
        <Header />
        <Content />
        <Footer />
      </Site>
    );
  }
}
