import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Card from './shared/Card';

export default class Home extends Component {
  constructor() {
    super();

    this.forums = [
      { id: 96, title: 'Canon - Biete' },
      { id: 114, title: 'Zubehör - Biete' },
      { id: 109, title: 'Sony - Biete' },
      { id: 118, title: 'Canon - Allgemein' },
      { id: 12, title: 'Canon - Objektive' },
      { id: 103, title: 'Canon - Zubehör' },
      { id: 258, title: 'Canon - EOS R' },
    ];
  }

  renderForums() {
    return this.forums.map(f => (
      <Link key={f.id} to={`/forum/${f.id}`}>
        <Card>
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
