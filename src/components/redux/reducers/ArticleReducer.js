const initialState = {
  //article
  allArticles: {},
  detailArticle: false,
  articleById: [],
  //search
  resultData: {},
  modalSearch: false,
  modalResult: false,
  loadingResult: false,
  tags: {},
};

export const ArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    //article
    case 'ALL_ARTICLE':
      return {...state, allArticles: action.payload};
    case 'DETAIL_ARTICLE':
      return {...state, detailArticle: action.payload};
    case 'ARTICLE_BY_ID':
      return {...state, articleById: action.payload};
    //search
    case 'RESULT_SEARCH':
      return {...state, resultData: action.payload};
    case 'MODAL_SEARCH_ARTICLE':
      return {...state, modalSearch: action.payload};
    case 'RESULT_LOADING':
      return {...state, loadingResult: action.payload};
    case 'MODAL_RESULT_ARTICLE':
      return {...state, modalResult: action.payload};
    case 'TAG_ARTICLE':
      return {...state, tags: action.payload};
    default:
      return state;
  }
};
