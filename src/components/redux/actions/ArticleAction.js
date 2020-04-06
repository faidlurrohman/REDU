import Axios from 'axios';
import {Share} from 'react-native';
import {allStory} from './StoryAction';

export const showModalSearch = value => {
  return async dispatch => {
    dispatch({type: 'MODAL_SEARCH_ARTICLE', payload: value});
  };
};
export const showModalResult = value => {
  return async dispatch => {
    dispatch({type: 'MODAL_RESULT_ARTICLE', payload: value});
  };
};

export const showDetailArticle = value => {
  return async dispatch => {
    dispatch({type: 'DETAIL_ARTICLE', payload: value});
  };
};

export const getAllArticle = () => {
  return async dispatch => {
    try {
      const resAllArticle = await Axios.get(
        `https://ga5-redu-be.herokuapp.com/api/v1/articles`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // console.log('all article', resAllArticle.data);
      dispatch(allStory());
      dispatch({type: 'ALL_ARTICLE', payload: resAllArticle.data.data.docs});
    } catch (e) {
      console.log('get all article', e);
    }
  };
};

export const articleById = idArticle => {
  return async dispatch => {
    try {
      const resArticleById = await Axios.get(
        `https://ga5-redu-be.herokuapp.com/api/v1/articles/view?articleId=${idArticle}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // console.log('get article by id', resArticleById.data);
      dispatch({type: 'ARTICLE_BY_ID', payload: resArticleById.data.data});
    } catch (e) {
      console.log('get article by id', e);
    }
  };
};

export const shareArticle = (title, body) => {
  return async dispatch => {
    try {
      const resShareArticle = await Share.share({
        message: `hello there, i wanna to share about '${title}', ${body}`,
      });
      // console.log(resShareArticle);
    } catch (e) {
      console.log(e);
    }
  };
};

export const likeArticle = (articleId, token) => {
  return async dispatch => {
    try {
      const resLikeArticle = await Axios({
        method: 'post',
        url: `https://ga5-redu-be.herokuapp.com/api/v1/articles/like?articleId=${articleId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: JSON.parse(token),
        },
      });
      // console.log('like story', resLikeArticle);
      dispatch(getAllArticle());
      dispatch(articleById(articleId));
    } catch (e) {
      console.log(e);
    }
  };
};

export const getTagArticle = () => {
  return async dispatch => {
    try {
      const resTagArticle = await Axios.get(
        `https://ga5-redu-be.herokuapp.com/api/v1/tags`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // console.log('tag article', resTagArticle.data);
      dispatch({type: 'TAG_ARTICLE', payload: resTagArticle.data.data});
    } catch (e) {
      console.log('get tag article', e);
    }
  };
};

export const getResultByTag = idTag => {
  return async dispatch => {
    try {
      dispatch({type: 'RESULT_LOADING', payload: true});
      const resByTag = await Axios.get(
        `https://ga5-redu-be.herokuapp.com/api/v1/articles/tag?tagId=${idTag}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // console.log('by tag article', resByTag.data.data.docs);
      dispatch({type: 'RESULT_LOADING', payload: false});
      dispatch({type: 'RESULT_SEARCH', payload: resByTag.data.data.docs});
    } catch (e) {
      dispatch({type: 'RESULT_LOADING', payload: false});
      dispatch({type: 'MODAL_RESULT_ARTICLE', payload: false});
      console.log('get by tag', e);
    }
  };
};
