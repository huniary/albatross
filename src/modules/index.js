import { combineReducers } from 'redux';
import auth from '../modules/auth';
import loading from '../modules/loading';
import user from './user';
import write from './write';
import post from './post';
import postList from './postlist';
import replylist from './replylist';
import writereply from './writereply';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write,
  post,
  postList,
  replylist,
  writereply,
});

export default rootReducer;
