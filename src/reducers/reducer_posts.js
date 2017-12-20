import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POST:
      // const post = action.payload.data;
      // const newState = { ...state };
      // newState[post.id] = post;
      // return newState;
      // below return is es6 syntax
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_POSTS:
      //console.log(action.payload.data);
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }

}
