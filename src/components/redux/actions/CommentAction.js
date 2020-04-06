import Axios from 'axios';
import {Keyboard} from 'react-native';
import Toast from 'react-native-simple-toast';

import {storyById, allStory} from './StoryAction';
import {articleById} from './ArticleAction';

export const setModalComment = value => {
  return dispatch => {
    dispatch({type: 'COMMENT_MODAL', payload: value});
  };
};

export const setModalEditComment = value => {
  return dispatch => {
    dispatch({type: 'COMMENT_EDIT_MODAL', payload: value});
  };
};

export const setModalArticle = value => {
  return dispatch => {
    dispatch({type: 'ARTICLE_MODAL', payload: value});
  };
};

export const setModalEditArticle = value => {
  return dispatch => {
    dispatch({type: 'ARTICLE_EDIT_MODAL', payload: value});
  };
};

export const commentStory = (token, body, idStory) => {
  return async dispatch => {
    try {
      Keyboard.dismiss();
      const resCommentStory = await Axios.post(
        `https://ga5-redu-be.herokuapp.com/api/v1/comments?originId=${idStory}`,
        {
          message: body,
          origin: 'Story',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: JSON.parse(token),
          },
        },
      );
      console.log('comment story', resCommentStory.data);
      dispatch(allStory());
      dispatch(storyById(idStory));
      Toast.show(`${resCommentStory.data.message}!`);
    } catch (e) {
      console.log(e);
    }
  };
};

export const editComment = (token, idComment, messageComment, idStory) => {
  return async dispatch => {
    try {
      const resEditComment = await Axios.put(
        `https://ga5-redu-be.herokuapp.com/api/v1/comments?commentId=${idComment}`,
        {
          message: messageComment,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: JSON.parse(token),
          },
        },
      );
      // console.log('edit comment', resEditComment.data);
      dispatch(storyById(idStory));
      Toast.show(`${resEditComment.data.message}!`);
      dispatch({type: 'COMMENT_EDIT_MODAL', payload: false});
      dispatch({type: 'COMMENT_MODAL', payload: false});
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteComment = (token, idComment, idStory) => {
  return async dispatch => {
    try {
      const resDeleteComment = await Axios.delete(
        `https://ga5-redu-be.herokuapp.com/api/v1/comments?commentId=${idComment}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: JSON.parse(token),
          },
        },
      );
      // console.log('delete comment', resDeleteComment.data);
      dispatch(storyById(idStory));
      Toast.show(`${resDeleteComment.data.message}!`);
      dispatch({type: 'COMMENT_MODAL', payload: false});
    } catch (e) {
      console.log(e);
    }
  };
};

export const commentArticle = (token, body, idArticle) => {
  return async dispatch => {
    try {
      Keyboard.dismiss();
      const resCommentArticle = await Axios.post(
        `https://ga5-redu-be.herokuapp.com/api/v1/comments?originId=${idArticle}`,
        {
          message: body,
          origin: 'Article',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: JSON.parse(token),
          },
        },
      );
      // console.log('comment story', resCommentStory.data);
      dispatch(articleById(idArticle));
      Toast.show(`${resCommentArticle.data.message}!`);
    } catch (e) {
      console.log(e);
    }
  };
};

export const editCommentArticle = (
  token,
  idCommentArticle,
  messageCommentArticle,
  idArticle,
) => {
  return async dispatch => {
    try {
      const resEditCommentArticle = await Axios.put(
        `https://ga5-redu-be.herokuapp.com/api/v1/comments?commentId=${idCommentArticle}`,
        {
          message: messageCommentArticle,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: JSON.parse(token),
          },
        },
      );
      // console.log('edit comment', resEditCommentArticle.data);
      dispatch(articleById(idArticle));
      Toast.show(`${resEditCommentArticle.data.message}!`);
      dispatch({type: 'ARTICLE_EDIT_MODAL', payload: false});
      dispatch({type: 'ARTICLE_MODAL', payload: false});
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteCommentArticle = (token, idCommentArticle, idArticle) => {
  return async dispatch => {
    try {
      const resDeleteCommentArticle = await Axios.delete(
        `https://ga5-redu-be.herokuapp.com/api/v1/comments?commentId=${idCommentArticle}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: JSON.parse(token),
          },
        },
      );
      // console.log('delete comment', resDeleteCommentArticle.data);
      dispatch(articleById(idArticle));
      Toast.show(`${resDeleteCommentArticle.data.message}!`);
      dispatch({type: 'ARTICLE_MODAL', payload: false});
    } catch (e) {
      console.log(e);
    }
  };
};
