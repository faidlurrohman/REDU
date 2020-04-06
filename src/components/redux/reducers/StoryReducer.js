const initialState = {
  loadingHome: false,
  //allstory
  allStory: {},
  moreAll: false,
  pageAll: 0,
  //user story
  userStory: {},
  moreUserStory: false,
  pageUserStory: 0,
  //create story
  modalCreate: false,
  loadingCreate: false,
  categoryCreate: {},
  //detail story
  modalDetail: false,
  modalMore: false,
  modalDelete: false,
  detailStory: {},
  commentFocus: false,
  //edit story
  modalEdit: false,
  loadingEditStory: false,
  //filter category:
  storyCategory: null,
};

export const StoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_HOME':
      return {...state, loadingHome: action.payload};
    //all story
    case 'ALL_STORY':
      return {...state, allStory: action.payload};
    case 'MORE_ALL_STORY':
      return {...state, moreAll: action.payload};
    case 'PAGE_ALL_STORY':
      return {...state, pageAll: action.payload};
    case 'ADD_MORE_ALL_STORY':
      return {...state, allStory: [...state.allStory, ...action.payload]};
    //story user
    case 'USER_STORY':
      return {...state, userStory: action.payload};
    case 'MORE_USER_STORY':
      return {...state, moreUserStory: action.payload};
    case 'PAGE_USER_STORY':
      return {...state, pageUserStory: action.payload};
    case 'ADD_MORE_USER_STORY':
      return {...state, userStory: [...state.userStory, ...action.payload]};
    //create story
    case 'CREATE_MODAL':
      return {...state, modalCreate: action.payload};
    case 'CREATE_LOADING':
      return {...state, loadingCreate: action.payload};
    case 'CATEGORY':
      return {...state, categoryCreate: action.payload};
    //detail story
    case 'DETAIL_MODAL':
      return {...state, modalDetail: action.payload};
    case 'MORE_MODAL':
      return {...state, modalMore: action.payload};
    case 'DELETE_MODAL':
      return {...state, modalDelete: action.payload};
    case 'DETAIL_FOCUS':
      return {...state, commentFocus: action.payload};
    case 'DETAIL_STORY':
      return {...state, detailStory: action.payload};
    //edit story
    case 'EDIT_MODAL':
      return {...state, modalEdit: action.payload};
    case 'LOADING_EDIT':
      return {...state, loadingEditStory: action.payload};
    //filter category
    case 'STORY_BY_CATEGORY':
      return {...state, storyCategory: action.payload};
    default:
      return state;
  }
};
