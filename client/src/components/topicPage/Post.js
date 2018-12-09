import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import Card from '../shared/Card';


class Post extends Component {
  static propTypes = {
    content: PropTypes.object,
  };

  createMarkup() {
    const { content } = this.props;
    return { __html: `<div>${content.post}</div>` };
  }

  render() {
    const { content } = this.props;

    const postContent = content.post ? (
      <div className="post_content" dangerouslySetInnerHTML={this.createMarkup()} />
    ) : <div style={{ margin: '2rem 0 5rem' }}><Skeleton count={6} /></div>;

    return (
      <Card>
        <div className="post">
          {postContent}

          <div className="info">
            <div className="info--hits">{content.hits}</div>
            <div className="info--time">{content.time}</div>
          </div>

        </div>
      </Card>
    );
  }
}

export default withRouter(Post);
