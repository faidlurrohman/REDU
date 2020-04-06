const initialState = {
  loadingComment: false,
  //comment
  commentModal: false,
  commentEdit: false,
  //article
  articleModal: false,
  articleEdit: false,
};

export const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING':
      return {...state, loadingComment: action.payload};
    // comments
    case 'COMMENT_MODAL':
      return {...state, commentModal: action.payload};
    case 'COMMENT_EDIT_MODAL':
      return {...state, commentEdit: action.payload};
    // article
    case 'ARTICLE_MODAL':
      return {...state, articleModal: action.payload};
    case 'ARTICLE_EDIT_MODAL':
      return {...state, articleEdit: action.payload};
    default:
      return state;
  }
};
