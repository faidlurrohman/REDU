import {combineReducers} from 'redux';
import {AuthReducer} from './AuthReducer';
import {StoryReducer} from './StoryReducer';
import {CommentReducer} from './CommentReducer';
import {ArticleReducer} from './ArticleReducer';

export default combineReducers({
  auth: AuthReducer,
  story: StoryReducer,
  article: ArticleReducer,
  comment: CommentReducer,
});
