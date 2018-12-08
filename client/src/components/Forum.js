import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import { getForumById } from '../services/api';
import Topic from './forum/Topic';

export default class Forum extends Component {
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
      forums: [{}, {}, {}, {}, {}, {}],
      id: match.params.id || 154,
      page: match.params.page || 1,
      pageCount: 30,
    };
  }

  componentDidMount() {
    this.loadForum();
  }

  componentWillUpdate(nextProps) {
    const { match } = this.props;

    if (match.params.id !== nextProps.match.params.id) {
      this.state.id = nextProps.match.params.id;
      this.loadForum();
    }
  }


  async loadForum() {
    const { id, page } = this.state;
    const response = await getForumById(id, page);
    this.setState({ forums: response.data });
  }

  handlePageClick = async (data) => {
    const { id } = this.state;
    const { router } = this.context;
    const page = data.selected + 1;
    const response = await getForumById(id, page);
    this.setState({ forums: response.data, page }, () => {
      router.history.push(`/forum/${id}/${page}`);
      window.scrollTo(0, 0);
    });
  }

  renderTopics() {
    const { forums } = this.state;
    return forums.map(t => <Topic key={t.threadId} content={t} />);
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
          onPageChange={this.handlePageClick}
          activeClassName="active"
        />
      </div>
    );

    return (
      <div>
        {this.renderTopics()}
        {pagination}
      </div>
    );
  }
}
