import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Card from './shared/Card';

export default class Home extends Component {
  constructor() {
    super();

    this.forums = [
      { id: 118, title: 'Canon - Allgemein' },
      { id: 96, title: 'Canon - Biete' },
      { id: 109, title: 'Sony - Biete' },
    ];
  }

  renderForums() {
    return this.forums.map(f => (
      <Link to={`/forum/${f.id}`}>
        <Card key={f.id}>
          <h4>{f.title}</h4>
        </Card>
      </Link>
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
