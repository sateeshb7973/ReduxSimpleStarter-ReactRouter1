import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// BrowserRouter interacts with history library and decides what exactly to do based on change in the url
// Route , the purpose of Route is to configure components based on url
// Switch takes a collection of Routers and it renders the 1st route that matches the current url
// In other words most specific url need to move to the top or what is the url that first matches to teh current url
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReduxPromise from 'redux-promise';


// In react router we are not user App component so commenting app here and removing app.js
// for reference i kept app.js as app_backup.js
//import App from './components/app';
import reducers from './reducers';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostShow from './components/post_show';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);



ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
    <div>
    <Switch>
    <Route path="/posts/new" component={PostsNew} />
    <Route path="/posts/:id" component={PostShow} />
    <Route path="/" component={PostsIndex} />
    </Switch>
    </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
