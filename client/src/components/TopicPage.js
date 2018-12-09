import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { getTopicById } from '../services/api';
import Post from './topicPage/Post';

export default class TopicPage extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  static propTypes = {
    match: PropTypes.object,
  };

  constructor(props) {
    super();
    const { match } = props;

    this.state = {
      posts: [{}, {}, {}],
      id: match.params.id || 154,
      page: match.params.page || 1,
      pageCount: 1,

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

  handlePageClick = async (data) => {
    const { id } = this.state;
    const { router } = this.context;
    const page = data.selected + 1;
    const response = await getTopicById(id, page);
    this.setState({ posts: response.data.topics, page, pageCount: response.data.pages }, () => {
      router.history.push(`/topic/${id}/${page}`);
      window.scrollTo(0, 0);
    });
  }


  renderPosts() {
    const { posts } = this.state;
    return posts.map(p => <Post key={p} content={p} />);
  }

  render() {
    const { pageCount } = this.state;

    const pagination = pageCount > 1 ? (
      <div className="pagination">
        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          breakLabel="..."
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={this.handlePageClick}
          activeClassName="active"
        />
      </div>
    ) : null;

    return (
      <div>
        {this.renderPosts()}
        {pagination}
      </div>
    );
  }
}
