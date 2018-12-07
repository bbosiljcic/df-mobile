import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '../../../../assets/menu.svg';
import CloseIcon from '../../../../assets/close.svg';

import { getForumList } from '../../../../services/api';

export default class Menu extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
    };

    this.forums = getForumList();
  }

  renderMenuItems = () => {
    const items = this.forums.map((f) => {
      return (
        <Link class="menu--item" key={f.id} to={`/forum/${f.id}`}>
          {f.title}
        </Link>);
    });

    return items;
  }

  render() {
    const { open } = this.state;
    const height = this.forums.length * 50;
    return (
      <div className="menu">
        <div className="menu--icons">
          <a className="menu--link" onClick={() => { this.setState({ open: !open }) }}>
            <img src={open ? CloseIcon : MenuIcon} className="menu--icon" alt="menu" />
          </a>
        </div>
        <div className="menu--items" style={{ height: open ? height : 0 }}>
          {this.renderMenuItems()}
        </div>
      </div>
    );
  }
}
