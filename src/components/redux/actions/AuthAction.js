import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {Keyboard} from 'react-native';
import Toast from 'react-native-simple-toast';

import {storyByUser, getCategory} from './StoryAction';
import {getAllArticle} from './ArticleAction';

export const setModalRegister = value => {
  return dispatch => {
    dispatch({type: 'REGISTER_MODAL', payload: value});
  };
};

export const setModalLogin = value => {
  return dispatch => {
    dispatch({type: 'LOGIN_MODAL', payload: value});
  };
};

export const setModalEdit = value => {
  return dispatch => {
    dispatch({type: 'EDIT_MODAL', payload: value});
  };
};

export const setModalPhotos = value => {
  return dispatch => {
    dispatch({type: 'PHOTOS_MODAL', payload: value});
  };
};

export const setCredential = value => {
  return async dispatch => {
    const tokenGuest = await AsyncStorage.setItem('@token', value);
    if (tokenGuest) {
      dispatch({type: 'TOKEN', payload: value});
    }
  };
};

export const getCredential = () => {
  return async dispatch => {
    try {
      const retGetCred = await AsyncStorage.getItem('@token');
      if (retGetCred !== 'guest' && retGetCred !== null) {
        dispatch({type: 'LOADING_HOME', payload: true});
        dispatch({type: 'LOADING_PROFILE', payload: true});
        dispatch({type: 'TOKEN', payload: retGetCred});
        dispatch(getAllArticle());
        dispatch(getCategory());
        dispatch(currentUser(retGetCred));
        dispatch(storyByUser(retGetCred));
      } else {
        dispatch({type: 'LOADING_HOME', payload: true});
        dispatch({type: 'TOKEN', payload: 'guest'});
        dispatch(getAllArticle());
        dispatch(getCategory());
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteCredential = () => {
  return async dispatch => {
    dispatch({type: 'LOADING_EDIT', payload: true});
    await AsyncStorage.clear();
    dispatch({type: 'TOKEN', payload: 'guest'});
    dispatch({type: 'USER_DATA', payload: {}});
    dispatch({type: 'LOGIN_SUCCESS', payload: false});
    dispatch({type: 'LOGIN_MODAL', payload: false});
    dispatch({type: 'REGISTER_SUCCESS', payload: false});
    dispatch({type: 'REGISTER_MODAL', payload: false});
    dispatch({type: 'LOADING_EDIT', payload: false});
  };
};

export const register = (
  fullname,
  username,
  email,
  password,
  passwordConfirmation,
) => {
  return async dispatch => {
    try {
      Keyboard.dismiss();
      dispatch({type: 'REGISTER_LOADING', payload: true});
      const resRegister = await Axios.post(
        `https://ga5-redu-be.herokuapp.com/api/v1/users`,
        {
          name: fullname,
          username: username,
          email: email,
          password: password,
          password_confirmation: passwordConfirmation,
        },
        {
          headers: {'Content-Type': 'application/json'},
        },
      );
      // console.log('success register', resRegister.data);
      await AsyncStorage.setItem(
        '@token',
        JSON.stringify(resRegister.data.data.token),
      );
      dispatch({type: 'REGISTER_SUCCESS', payload: true});
      dispatch({type: 'REGISTER_LOADING', payload: false});
    } catch (e) {
      dispatch({type: 'REGISTER_SUCCESS', payload: false});
      dispatch({type: 'REGISTER_LOADING', payload: false});
      dispatch({type: 'REGISTER_MODAL', payload: true});
      console.log(e);
    }
  };
};

export const login = (username, password) => {
  return async dispatch => {
    try {
      Keyboard.dismiss();
      dispatch({type: 'LOGIN_LOADING', payload: true});
      const resLogin = await Axios.post(
        `https://ga5-redu-be.herokuapp.com/api/v1/auth`,
        {
          username: username,
          password: password,
        },
        {
          headers: {'Content-Type': 'application/json'},
        },
      );
      // console.log('success login', resLogin.data);
      await AsyncStorage.setItem(
        '@token',
        JSON.stringify(resLogin.data.data.token),
      );
      dispatch({type: 'LOGIN_SUCCESS', payload: true});
      dispatch({type: 'LOGIN_LOADING', payload: false});
    } catch (e) {
      dispatch({type: 'LOGIN_SUCCESS', payload: false});
      dispatch({type: 'LOGIN_LOADING', payload: false});
      dispatch({type: 'LOGIN_MODAL', payload: true});
      console.log(e);
    }
  };
};

export const currentUser = token => {
  return async dispatch => {
    try {
      const resCurrent = await Axios.get(
        `https://ga5-redu-be.herokuapp.com/api/v1/users`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: JSON.parse(token),
          },
        },
      );
      // console.log(resCurrent.data);
      dispatch({type: 'USER_DATA', payload: resCurrent.data.data});
    } catch (e) {
      dispatch({type: 'LOADING_PROFILE', payload: false});
      console.log(e);
    }
  };
};

export const editUser = (token, editImage, editFullname, editBio) => {
  return async dispatch => {
    try {
      Keyboard.dismiss();
      dispatch({type: 'LOADING_EDIT', payload: true});
      if (editImage !== null) {
        const formImage = new FormData();
        formImage.append('name', editFullname);
        if (editBio !== undefined) {
          formImage.append('bio', editBio);
        }
        formImage.append('image', {
          name: editImage.uri.split('/').pop(),
          type: editImage.mime,
          uri: editImage.uri,
        });
        const resEditWithImage = await Axios.put(
          `https://ga5-redu-be.herokuapp.com/api/v1/users`,
          formImage,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: JSON.parse(token),
            },
          },
        );
        // console.log('edit image with image', resEditWithImage.data);
        dispatch(currentUser(token));
        dispatch({type: 'LOADING_EDIT', payload: false});
        Toast.show(`${resEditWithImage.data.message}!`);
      } else {
        const formWithoutImage = new FormData();
        formWithoutImage.append('name', editFullname);
        if (editBio !== undefined) {
          formWithoutImage.append('bio', editBio);
        }
        const resEdit = await Axios.put(
          `https://ga5-redu-be.herokuapp.com/api/v1/users`,
          formWithoutImage,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: JSON.parse(token),
            },
          },
        );
        // console.log('edit image without image', resEdit.data);
        dispatch(currentUser(token));
        dispatch({type: 'LOADING_EDIT', payload: false});
        Toast.show(`${resEdit.data.message}!`);
      }
    } catch (e) {
      dispatch({type: 'LOADING_EDIT', payload: false});
      Toast.show(`Failed edit profile!`);
      console.log(e);
    }
  };
};
