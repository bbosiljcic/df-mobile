import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Card from './shared/Card';

class Home extends Component {
  constructor() {
    super();

    this.forums = [
      { id: 118, title: 'Canon - Allgemein' },
      { id: 96, title: 'Canon - Biete' },
      { id: 109, title: 'Sony - Biete' },
    ]
  }

  renderForums() {
    const { history } = this.props;

    return this.forums.map(f => (
      <Card key={f.id} onClick={() => { history.push(`/forum/${f.id}`); }}>
        <h4>{f.title}</h4>
      </Card>
    ));
  }

  render() {
    return (
      <div>
        {this.renderForums()}
      </div>
    );
  }
}


Home.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Home);

