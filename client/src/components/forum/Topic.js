import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from '../shared/Card';

export default class Topic extends Component {
  render() {
    const { content } = this.props;

    console.log('context', this.props);
    return (
      <Link to={`/topic/${content.threadId}`}>
        <Card>
          <div className="topic">
            <div className="topic__title">
              <h2>{content.title}</h2>
              <h3>{content.user}</h3>
            </div>
            <div className="info">
              <div className="info--reply">
                {`${content.replys} Antworten`}
              </div>
              <div className="info--right">
                <div className="info--hits">{content.hits}</div>
                <div className="info--time">{content.updateTime}</div>
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
