import React, { Component } from 'react';
import PropTypes from 'prop-types'

import Header from './layout/Header'
import Content from './layout/Content'
import Footer from './layout/Footer'

export default class Layout extends Component {
  render() {
    return (
        <div>
            <Header />
            <Content>
                {this.props.children}
            </Content>
            <Footer />
        </div>
    )
  }
}
