import React, { Component } from 'react';
import { getForumById } from '../services/api';
import Topic from './forum/Topic';

export default class Forum extends Component {
  constructor() {
    super();
    this.state = {
      forums: [],
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
    // const response = await getForumById(154);
    this.setState({ forums: this.fakeData });
  }


  renderTopics() {
    const { forums } = this.state;
    return forums.map(t => <Topic key={t.threadId} content={t} />);
  }

  render() {
    return (
      <div>
        {this.renderTopics()}
      </div>
    );
  }
}
