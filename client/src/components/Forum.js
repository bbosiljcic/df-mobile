import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

import { getForumById } from '../services/api';
import Topic from './forum/Topic';

export default class Forum extends Component {
  constructor(props) {
    super();
    const { match } = props;

    console.log('Forum', this);
    this.state = {
      forums: [],
      id: match.params.id || 154,
      page: match.params.page || 1,
      pageCount: 30,
    };
    this.fakeData =  [
      {
        "threadId": "1928922",
        "title": "Weg von Nikon/DSRL? Nikon D5600 vs. Panasonic G81",
        "description": "Hallo zusammen, mit meiner Nikon D90 war ich grundsätzlich sehr zufrieden. In den letzten Jahren störte mich zunehmend die beschränkte Low-Light-Fähigkeit. Insbesondere seit unsere Tochter auf der Welt ist, wünsche ich mir bei schlechteren...",
        "userId": "502950",
        "user": "LinsenMarc",
        "updateTime": "09:12",
        "replys": "6",
        "hits": "269"
      },
      {
        "threadId": "1928005",
        "title": "Spiegellos oder Spiegel ist hier die Frage: Nikon Z6/7 vs. D850",
        "description": "Hallo zusammen, \n \nich brauche einmal eure Erfahrungswerte. Wie es der Titel schon sagt, plage ich mich mit einer Kaufentscheidung aber ich fange einmal von vorne an. \n \nKommend aus der Sport-Fotografie habe ich eine D300s (meine Einsteigerkamera)...",
        "userId": "259641",
        "user": "-MIK-",
        "updateTime": "15:21",
        "replys": "18",
        "hits": "1.064"
      }
    ]
  }


  componentDidMount() {
    this.loadForum();
  }

  async loadForum() {
    const { id, page } = this.state;
    const response = await getForumById(id, page);
    this.setState({ forums: response.data });
  }

  async handlePageClick(data) {
    const { id } = this.state;
    const page = data.selected;
    const response = await getForumById(id, page);
    this.setState({ forums: response.data, page }, () => {
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
          onPageChange={this.handlePageClick.bind(this)}
          activeClassName="active"
        />
      </div>
    );

    return (
      <div>
        {pagination}
        {this.renderTopics()}
        {pagination}
      </div>
    );
  }
}
