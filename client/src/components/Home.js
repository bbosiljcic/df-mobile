import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Card from './shared/Card';
import { getForumList } from '../services/api';

export default class Home extends Component {
  constructor() {
    super();

    this.forums = getForumList();
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
