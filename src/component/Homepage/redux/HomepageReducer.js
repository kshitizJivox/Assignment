import {
  FAIL_POSTS,
  PAGINATED_POSTS,
  REQUEST_COMMENT,
  REQUEST_POSTS,
  REQUEST_SINGLE_POSTS,
  SEARCH,
  SUCCESS_POSTS,
} from "./HomepageActionType";

const initialState = {
  loading: false, // For API fetch time
  posts: [], // Total posts from the API
  error: "", // Error in fetching
  toBeRenderedPosts: [], // Actual posts which are getting displayed
  paginatePost : [], // Stores the result of total posts / search result
  comment : {}, // comments of the posts
  singlePost : {} // single post details
};

const HomepageReducer = (state = initialState, action) => {
    switch (action.type) {
    case REQUEST_POSTS:
      {
        return {
          ...state,
          loading: true,
        };
      }
    case SUCCESS_POSTS:
      return {
        ...state,
        loading: false,
        posts: action.payload.posts,
        toBeRenderedPosts: action.payload.posts.slice(0, action.payload.postPerPages),
        paginatePost : action.payload.posts,
        error : ""
      };

    case FAIL_POSTS:
      return {
        ...state,
        loading: false,
        posts: [],
        error: action.payload,
        toBeRenderedPosts: [],
        paginatePost : []
      };

    case REQUEST_COMMENT: {
      let comment = {...state.comment}
      comment[action.payload.postId] = action.payload.comment

      return {
        ...state,
        comment : comment
      };
    }

    case SEARCH:
      return {
        ...state,
        paginatePost: action.payload,
      };

    case PAGINATED_POSTS: {
      const toBeRenderedPosts = state.paginatePost.slice(
        action.payload.start,
        action.payload.end
      );

      return {
        ...state,
        toBeRenderedPosts : toBeRenderedPosts
      }
    }

    case REQUEST_SINGLE_POSTS :
      return {
        ...state,
        loading : false,
        singlePost : action.payload
      }
    default:
      return state;
  }
};

export default HomepageReducer;
