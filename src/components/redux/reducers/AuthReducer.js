const initialState = {
  loadingProfile: false,
  //register
  registerLoading: false,
  registerStatus: false,
  registerModal: false,
  //login
  loginLoading: false,
  loginStatus: false,
  loginModal: false,
  //user
  userToken: 'guest',
  userData: {},
  modalPhotos: false,
  loadingEdit: false,
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_PROFILE':
      return {...state, loadingProfile: action.payload};
    //register
    case 'REGISTER_LOADING':
      return {...state, registerLoading: action.payload};
    case 'REGISTER_SUCCESS':
      return {...state, registerStatus: action.payload};
    case 'REGISTER_MODAL':
      return {...state, registerModal: action.payload};
    //login
    case 'LOGIN_LOADING':
      return {...state, loginLoading: action.payload};
    case 'LOGIN_SUCCESS':
      return {...state, loginStatus: action.payload};
    case 'LOGIN_MODAL':
      return {...state, loginModal: action.payload};
    //token
    case 'TOKEN':
      return {...state, userToken: action.payload};
    case 'USER_DATA':
      return {...state, userData: action.payload};
    case 'PHOTOS_MODAL':
      return {...state, modalPhotos: action.payload};
    case 'LOADING_EDIT':
      return {...state, loadingEdit: action.payload};
    default:
      return state;
  }
};
