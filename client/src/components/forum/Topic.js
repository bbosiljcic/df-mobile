import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Card from '../shared/Card';


class Topic extends Component {
  render() {
    const { content, history } = this.props;

    console.log('context', this.props);
    return (
      <Card onClick={() => { history.push(`/topic/${content.threadId}`); }}>
        <div className="topic">
          <div className="topic__title">
            <h2>{content.title}</h2>
            <h3>{content.user}</h3>
            <div className="replys">
              {`${content.replys} Antworten`}
            </div>
          </div>
          <div className="info">
            <div className="info--hits">{content.hits}</div>
            <div className="info--time">{content.updateTime}</div>
          </div>

        </div>
      </Card>
    );
  }
}

Topic.propTypes = {
  content: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(Topic);
