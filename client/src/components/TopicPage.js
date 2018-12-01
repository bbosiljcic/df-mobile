import React, { Component } from 'react';
import { getTopicById } from '../services/api';
import Post from './topicPage/Post';

export default class TopicPage extends Component {
  constructor(props) {
    super();
    const { match } = props;

    this.state = {
      posts: [],
      id: match.params.id || 154,
      page: match.params.page || 1,
    };
  }

  componentDidMount() {
    this.loadForum();
  }

  async loadForum() {
    const { id, page } = this.state;
    const response = await getTopicById(id, page);
    this.setState({ posts: response.data.topics });
  }


  renderPosts() {
    const { posts } = this.state;
    return posts.map(p => <Post key={p} content={p} />);
  }

  render() {
    return (
      <div>
        {this.renderPosts()}
      </div>
    );
  }
}
