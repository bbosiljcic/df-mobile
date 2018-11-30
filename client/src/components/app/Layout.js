import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Header from './layout/Header';
import Content from './layout/Content';
import Footer from './layout/Footer';

export default class Layout extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div>
        <Header />
        <Content>
          {children}
        </Content>
        <Footer />
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node,
};
