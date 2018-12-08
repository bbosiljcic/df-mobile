import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from '../shared/Card';
import ViewsIcon from '../../assets/views.svg';
import ReplyIcon from '../../assets/reply.svg';
import SkeletonIcon from '../../assets/skeleton.svg';


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
              <div className="info--left">
                {content.replys}
                <img src={content.replys ? ReplyIcon : SkeletonIcon} className="icon reply--icon" alt="replys" />
              </div>
              <div className="info--right">
                <img src={content.hits ? ViewsIcon : SkeletonIcon} className="icon views--icon" alt="views" />
                {content.hits}
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
