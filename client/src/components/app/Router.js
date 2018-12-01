import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home';
import Forum from '../Forum';
import Topic from '../Topic';
import User from '../User';

const Router = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/forum/:id/:page" component={Forum} />
    <Route path="/forum/:id" component={Forum} />
    <Route path="/forum" component={Forum} />

    <Route path="/topic" component={Topic} />
    <Route path="/user" component={User} />
  </Switch>
);

export default Router;
