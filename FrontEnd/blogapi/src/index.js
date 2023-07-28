import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './App';
import Header from './components/header';
import Footer from './components/footer';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import Single from './components/posts/single';
import Search from './components/posts/search';
import User from './User';
import Create from './components/user/createPost';
import Edit from './components/user/editPost';
import Delete from './components/user/deletePost';


const userName = localStorage.getItem('user_name');

const routing = (
  <Router>
    <React.StrictMode>
      <Header />
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path={`/${userName}`} component={User} />
        <Route exact path={`/${userName}/post/create`} component={Create} />
        <Route exact path={`/${userName}/post/edit/:id`} component={Edit} />
        <Route exact path={`/${userName}/post/delete/:id`} component={Delete} />

        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/post/:slug" component={Single} />
        <Route path="/search" component={Search} />
      </Switch>
      <Footer />
    </React.StrictMode>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
