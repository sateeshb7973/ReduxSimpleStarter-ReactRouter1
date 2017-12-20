import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import { Link } from 'react-router-dom';


class PostsIndex extends Component {

  // this method call immediatly when this component has shown in the dom
  // react calls this method automatically one time
  // react does not wait for any ajax calls to complete though we use the lifecycle methods
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return <li key={post.id} className="list-group-item">
      {post.title}
      </li>
    });
  }


  render() {
    return (
      <div>
      <div className="text-xs-right">
        <Link className="btn btn-primary" to="/posts/new">
          Add a Post
        </Link>
      </div>
      <h3>Posts</h3>
      <ul className="list-group">
        {this.renderPosts()}
      </ul>
      </div>
    );
  }

}


function mapStateToPRops(state) {
return { posts: state.posts }
}

// instead in writing mapStateToProps we can directly connect action dispatcher as shown below
// actually we will go to mapStateToProps when we need to handle some logic otherwise we can drictly connect like this
// we can still access fetchPosts in PostsIndex component by using this.props.fetchPosts
//export default connect(null, {fectchPosts : fectchPosts})(PostsIndex);

//es6 syntax of above
export default connect(mapStateToPRops, { fetchPosts })(PostsIndex);
