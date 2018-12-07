import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
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
      pageCount: null,

    };
  }

  componentDidMount() {
    this.loadForum();
  }

  async loadForum() {
    const { id, page } = this.state;
    const response = await getTopicById(id, page);
    this.setState({ posts: response.data.topics, pageCount: response.data.pages });
  }

  async handlePageClick(data) {
    const { id } = this.state;
    const page = data.selected;
    const response = await getTopicById(id, page);
    this.setState({ posts: response.data.topics, page, pageCount: response.data.pages }, () => {
      window.scrollTo(0, 0);
    });
  }


  renderPosts() {
    const { posts } = this.state;
    return posts.map(p => <Post key={p} content={p} />);
  }

  render() {
    const { pageCount } = this.state;

    const pagination = (
      <div className="pagination">
        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          breakLabel="..."
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={this.handlePageClick.bind(this)}
          activeClassName="active"
        />
      </div>
    );

    return (
      <div>
        {pagination}
        {this.renderPosts()}
        {pagination}
      </div>
    );
  }
}
