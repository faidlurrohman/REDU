import Axios from 'axios';
import {Keyboard, Share} from 'react-native';
import Toast from 'react-native-simple-toast';

export const setModalCreate = value => {
  return dispatch => {
    dispatch({type: 'CREATE_MODAL', payload: value});
  };
};

export const setModalMore = value => {
  return dispatch => {
    dispatch({type: 'MORE_MODAL', payload: value});
  };
};

export const setModalEdit = value => {
  return dispatch => {
    dispatch({type: 'EDIT_MODAL', payload: value});
  };
};

export const checkCommentFocus = value => {
  return dispatch => {
    if (value === true) {
      dispatch({type: 'DETAIL_FOCUS', payload: true});
    } else {
      dispatch({type: 'DETAIL_FOCUS', payload: false});
    }
  };
};

export const setModalDetail = value => {
  return dispatch => {
    dispatch({type: 'DETAIL_MODAL', payload: value});
    if (value === false) {
      dispatch({type: 'DETAIL_FOCUS', payload: false});
    }
  };
};

export const allStory = () => {
  return async dispatch => {
    try {
      const resAllStory = await Axios.get(
        `https://ga5-redu-be.herokuapp.com/api/v1/story/viewsAll`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // console.log('all story', resAllStory.data);
      dispatch({type: 'ALL_STORY', payload: resAllStory.data.data.docs});
      dispatch({type: 'LOADING_HOME', payload: false});
      if (resAllStory.data.data.hasNextPage === true) {
        // console.log(resAllStory.data.data.hasNextPage);
        dispatch({
          type: 'MORE_ALL_STORY',
          payload: resAllStory.data.data.hasNextPage,
        });
        // console.log(resAllStory.data.data.nextPage);
        dispatch({
          type: 'PAGE_ALL_STORY',
          payload: resAllStory.data.data.nextPage,
        });
      } else {
        dispatch({type: 'MORE_ALL_STORY', payload: false});
      }
    } catch (e) {
      dispatch({type: 'LOADING_HOME', payload: false});
      console.log(e);
    }
  };
};

export const moreAllStory = moreStory => {
  return async dispatch => {
    try {
      const resMoreAllStory = await Axios.get(
        `https://ga5-redu-be.herokuapp.com/api/v1/story/viewsAll?page=${moreStory}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // console.log('more all story', resMoreAllStory.data);
      dispatch({
        type: 'ADD_MORE_ALL_STORY',
        payload: resMoreAllStory.data.data.docs,
      });
      if (resMoreAllStory.data.data.hasNextPage === true) {
        // console.log(resMoreAllStory.data.data.hasNextPage);
        dispatch({
          type: 'MORE_ALL_STORY',
          payload: resMoreAllStory.data.data.hasNextPage,
        });
        // console.log(resMoreAllStory.data.data.nextPage);
        dispatch({
          type: 'PAGE_ALL_STORY',
          payload: resMoreAllStory.data.data.nextPage,
        });
      } else {
        dispatch({type: 'MORE_ALL_STORY', payload: false});
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const storyByUser = token => {
  return async dispatch => {
    try {
      dispatch({type: 'LOADING_PROFILE', payload: true});
      const resStoryByUser = await Axios.get(
        `https://ga5-redu-be.herokuapp.com/api/v1/story/views?page=1`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: JSON.parse(token),
          },
        },
      );
      // console.log('story by user', resStoryByUser.data);
      dispatch({type: 'USER_STORY', payload: resStoryByUser.data.data.docs});
      dispatch({type: 'LOADING_PROFILE', payload: false});
      if (resStoryByUser.data.data.hasNextPage === true) {
        // console.log(resStoryByUser.data.data.hasNextPage);
        dispatch({
          type: 'MORE_USER_STORY',
          payload: resStoryByUser.data.data.hasNextPage,
        });
        // console.log(resStoryByUser.data.data.nextPage);
        dispatch({
          type: 'PAGE_USER_STORY',
          payload: resStoryByUser.data.data.nextPage,
        });
      } else {
        dispatch({type: 'MORE_USER_STORY', payload: false});
      }
    } catch (e) {
      console.log(e);
      dispatch({type: 'LOADING_PROFILE', payload: false});
    }
  };
};

export const moreUserStory = (token, moreUserStory) => {
  return async dispatch => {
    try {
      const resMoreUserStory = await Axios.get(
        `https://ga5-redu-be.herokuapp.com/api/v1/story/views?page=${moreUserStory}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: JSON.parse(token),
          },
        },
      );
      // console.log('more user story', resMoreUserStory.data);
      dispatch({
        type: 'ADD_MORE_USER_STORY',
        payload: resMoreUserStory.data.data.docs,
      });
      if (resMoreUserStory.data.data.hasNextPage === true) {
        // console.log(resMoreUserStory.data.data.hasNextPage);
        dispatch({
          type: 'MORE_USER_STORY',
          payload: resMoreUserStory.data.data.hasNextPage,
        });
        // console.log(resMoreUserStory.data.data.nextPage);
        dispatch({
          type: 'PAGE_USER_STORY',
          payload: resMoreUserStory.data.data.nextPage,
        });
      } else {
        dispatch({type: 'MORE_USER_STORY', payload: false});
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const createStory = (
  token,
  title,
  body,
  location,
  latitude,
  longitude,
  category,
  image,
) => {
  return async dispatch => {
    try {
      Keyboard.dismiss();
      dispatch({type: 'CREATE_LOADING', payload: true});
      if (image !== null) {
        const createStory = new FormData();
        createStory.append('title', title);
        createStory.append('body', body);
        createStory.append('category', category);
        createStory.append('location', location);
        createStory.append('lat', latitude);
        createStory.append('long', longitude);
        createStory.append('image', {
          name: image.uri.split('/').pop(),
          type: image.mime,
          uri: image.uri,
        });
        const resImageStory = await Axios.post(
          `https://ga5-redu-be.herokuapp.com/api/v1/story`,
          createStory,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: JSON.parse(token),
            },
          },
        );
        // console.log('create story with image', resImageStory.data);
        dispatch(storyByUser(token));
        dispatch(allStory());
        Toast.show(`${resImageStory.data.message}!`);
        dispatch({type: 'CREATE_LOADING', payload: false});
        dispatch({type: 'CREATE_MODAL', payload: false});
      } else {
        const resCreateStory = await Axios.post(
          `https://ga5-redu-be.herokuapp.com/api/v1/story`,
          {
            title: title,
            body: body,
            category: category,
            location: location,
            lat: latitude,
            long: longitude,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: JSON.parse(token),
            },
          },
        );
        // console.log('create story without image', resCreateStory.data);
        dispatch(storyByUser(token));
        dispatch(allStory());
        Toast.show(`${resCreateStory.data.message}!`);
        dispatch({type: 'CREATE_LOADING', payload: false});
        dispatch({type: 'CREATE_MODAL', payload: false});
      }
    } catch (e) {
      console.log(e);
      Toast.show(`Failed create story!`);
      dispatch({type: 'CREATE_LOADING', payload: false});
    }
  };
};

export const getCategory = () => {
  return async dispatch => {
    try {
      const resGetCategory = await Axios.get(
        `https://ga5-redu-be.herokuapp.com/api/v1/category`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // console.log('get category', resGetCategory.data.data);
      dispatch({type: 'CATEGORY', payload: resGetCategory.data.data});
    } catch (e) {
      console.log(e);
    }
  };
};

export const storyById = idStory => {
  return async dispatch => {
    try {
      const resStoryById = await Axios.get(
        `https://ga5-redu-be.herokuapp.com/api/v1/story/get?id=${idStory}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // console.log('get story by id', resStoryById.data.data);
      dispatch({type: 'DETAIL_STORY', payload: resStoryById.data.data});
    } catch (e) {
      console.log(e);
    }
  };
};

export const likeStory = (idStory, token) => {
  return async dispatch => {
    try {
      const resLikeStory = await Axios({
        method: 'post',
        url: `https://ga5-redu-be.herokuapp.com/api/v1/story/like?storyId=${idStory}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: JSON.parse(token),
        },
      });
      // console.log('like story', resLikeStory);
      dispatch(allStory());
      dispatch(storyById(idStory));
    } catch (e) {
      console.log(e);
    }
  };
};

export const shareStory = (author, location, title, body) => {
  return async dispatch => {
    try {
      const resShare = await Share.share({
        message: `${author} in ${location}. he went to shared about '${title}', ${body}`,
      });
      // console.log(resShare);
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteStory = (token, idStory) => {
  return async dispatch => {
    try {
      const getIdCategory = await Axios.get(
        `https://ga5-redu-be.herokuapp.com/api/v1/story/get?id=${idStory}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const resDeleteStory = await Axios.delete(
        `https://ga5-redu-be.herokuapp.com/api/v1/story/delete?id=${idStory}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: JSON.parse(token),
          },
        },
      );
      // console.log('delete story', resDeleteStory.data);
      dispatch(allStory());
      dispatch(storyByUser(token));
      dispatch(storyByCategory(getIdCategory.data.data[0].category._id));
      dispatch({type: 'DETAIL_MODAL', payload: false});
      dispatch({type: 'MORE_MODAL', payload: false});
      Toast.show(`${resDeleteStory.data.message}!`);
    } catch (e) {
      console.log(e);
    }
  };
};

export const editStory = (
  token,
  defaultImage,
  editTitle,
  editCategory,
  editDesc,
  editLocation,
  editLat,
  editLong,
  editImage,
  idStory,
) => {
  return async dispatch => {
    try {
      Keyboard.dismiss();
      dispatch({type: 'LOADING_EDIT', payload: true});
      if (defaultImage !== editImage) {
        const editForm = new FormData();
        editForm.append('title', editTitle);
        editForm.append('body', editDesc);
        editForm.append('category', editCategory);
        editForm.append('location', editLocation);
        editForm.append('lat', editLat);
        editForm.append('long', editLong);
        editForm.append('image', {
          name: editImage.uri.split('/').pop(),
          type: editImage.mime,
          uri: editImage.uri,
        });
        const resEditWithImage = await Axios.put(
          `https://ga5-redu-be.herokuapp.com/api/v1/story/update?id=${idStory}`,
          editForm,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: JSON.parse(token),
            },
          },
        );
        // console.log('edit story with change image', resEditWithImage.data);
        dispatch(allStory());
        dispatch(storyById(idStory));
        dispatch(storyByUser(token));
        dispatch(storyByCategory(editCategory));
        Toast.show(`${resEditWithImage.data.message}!`);
        dispatch({type: 'EDIT_MODAL', payload: false});
        dispatch({type: 'MORE_MODAL', payload: false});
        dispatch({type: 'LOADING_EDIT', payload: false});
      } else {
        const editForm = new FormData();
        editForm.append('title', editTitle);
        editForm.append('body', editDesc);
        editForm.append('category', editCategory);
        editForm.append('location', editLocation);
        editForm.append('lat', editLat);
        editForm.append('long', editLong);
        const resEditWithoutImage = await Axios.put(
          `https://ga5-redu-be.herokuapp.com/api/v1/story/update?id=${idStory}`,
          editForm,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: JSON.parse(token),
            },
          },
        );
        // console.log(
        //   'edit story without change image',
        //   resEditWithoutImage.data,
        // );
        dispatch(allStory());
        dispatch(storyById(idStory));
        dispatch(storyByUser(token));
        dispatch(storyByCategory(editCategory));
        Toast.show(`${resEditWithoutImage.data.message}!`);
        dispatch({type: 'EDIT_MODAL', payload: false});
        dispatch({type: 'MORE_MODAL', payload: false});
        dispatch({type: 'LOADING_EDIT', payload: false});
      }
    } catch (e) {
      Toast.show(`Failed edit story!`);
      dispatch({type: 'LOADING_EDIT', payload: false});
      console.log(e);
    }
  };
};

export const storyByCategory = idCategory => {
  return async dispatch => {
    try {
      const resFilterCategory = await Axios.get(
        `https://ga5-redu-be.herokuapp.com/api/v1/story/filter?page=1&category=${idCategory}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // console.log(resFilterCategory.data.data.docs);
      dispatch({
        type: 'STORY_BY_CATEGORY',
        payload: resFilterCategory.data.data.docs,
      });
    } catch (e) {
      dispatch({type: 'STORY_BY_CATEGORY', payload: null});
      // console.log(e);
    }
  };
};
