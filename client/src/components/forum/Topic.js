import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from '../shared/Card';

export default class Topic extends Component {
  render() {
    const { content } = this.props;

    return (
      <Link to={`/topic/${content.threadId}`}>
        <Card style={{ padding: 0 }}>
          <div className="topic">
            <div className="topic_user">
              <h3>{content.user}</h3>
                <div className="info--time">{content.updateTime}</div>
            </div>
            <div className="topic__title">
              <h2>{content.title}</h2>
            </div>
            <div className="info">
              <div className="info--reply">
                {content.replys}
              </div>
              <div className="info--right">
                <div className="info--hits">{content.hits}</div>
              </div>
            </div>

          </div>
        </Card>
      </Link>
    );
  }
}

Topic.propTypes = {
  content: PropTypes.object,
};
