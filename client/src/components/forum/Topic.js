import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import Card from '../shared/Card';
import ViewsIcon from '../../assets/views.svg';
import ReplyIcon from '../../assets/reply.svg';

export default class Topic extends Component {
  render() {
    const { content } = this.props;

    const replyIcon = content.replys ? (
      <img src={ReplyIcon} className="icon reply--icon" alt="replys" />
    ) : null;

    const viewsIcon = content.hits ? (
      <img src={ViewsIcon} className="icon view--icon" alt="views" />
    ) : null;

    return (

      <Link to={`/topic/${content.threadId}`}>
        <Card style={{ padding: 0 }}>
          <div className="topic">
            <div className="topic_user">
              <h3>{content.user || <Skeleton />}</h3>
              <div className="info--time">{content.updateTime}</div>
            </div>
            <div className="topic__title">
              <h2>{content.title || <Skeleton width="80%" />}</h2>
            </div>
            <div className="info">
              <div className="info--left">
                {content.replys || <Skeleton />}
                {replyIcon}
              </div>
              <div className="info--right">
                {viewsIcon}
                {content.hits || <Skeleton /> }
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
