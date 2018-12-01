import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Card from '../shared/Card';


class Post extends Component {
  createMarkup() {
    const { content } = this.props;
    return { __html: `<div>${content.post}</div>` };
  }

  render() {
    const { content } = this.props;

    console.log('context', this.props);
    return (
      <Card>
        <div className="post">
          <div className="post_content" dangerouslySetInnerHTML={this.createMarkup()} />

          <div className="info">
            <div className="info--hits">{content.hits}</div>
            <div className="info--time">{content.time}</div>
          </div>

        </div>
      </Card>
    );
  }
}

Post.propTypes = {
  content: PropTypes.object,
  // history: PropTypes.object,
};

export default withRouter(Post);
