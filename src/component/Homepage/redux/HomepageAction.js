import axios from "axios";
import {
  FAIL_POSTS,
  PAGINATED_POSTS,
  REQUEST_COMMENT,
  REQUEST_POSTS,
  REQUEST_SINGLE_POSTS,
  SEARCH,
  SUCCESS_POSTS,
} from "./HomepageActionType";

export const requestPostHandler = () => {
  return {
    type: REQUEST_POSTS,
  };
};

export const successPostHandler = (posts, postPerPages) => {
  return {
    type: SUCCESS_POSTS,
    payload : {
        postPerPages : postPerPages,
        posts : posts
    }
  };
};

export const failPostHandler = (error) => {
  return {
    type: FAIL_POSTS,
    payload: error,
  };
};

const succesComment = (comment, postId) => {
  return {
    type: REQUEST_COMMENT,
    payload: {
      comment: comment,
      postId: postId,
    },
  };
};

export const searchHandler = (searchValue, posts) => {
  let temp = [...posts];
  let toBeRenderedPosts = [];

  temp.map((post) => {
    if (post.title.includes(searchValue)) toBeRenderedPosts.push(post);
  });
  return {
    type: SEARCH,
    payload: toBeRenderedPosts,
  };
};

export const paginatedPostsHandler = (start, end) => {
    return {
        type : PAGINATED_POSTS,
        payload : {
            start : start,
            end : end
        }
    }
}

const singlePostHandler = (post) => {
  return {
    type : REQUEST_SINGLE_POSTS,
    payload : post
  }
}

export const requestingComments = (postId) => {
  return (dispatch) => {
    axios
      .get("https://jsonplaceholder.typicode.com/comments?postId=" + postId)
      .then((res) => {
        const comment = res.data;
        dispatch(succesComment(comment, postId));
      })
      .catch((error) => {
        const err = error.message;
      });
  };
};

export const requestingPosts = (postsPerPage) => {
  return (dispatch) => {
    dispatch(requestPostHandler());

    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        const posts = res.data;
        dispatch(successPostHandler(posts, postsPerPage));
      })
      .catch((error) => {
        const err = error.message;
        dispatch(failPostHandler(err));
      });
  };
};

export const requestingSinglePost = (postId) => {
  return (dispatch) => {
    dispatch(requestPostHandler())
    axios
      .get("https://jsonplaceholder.typicode.com/posts/" + postId)
      .then((res) => {
        const post = res.data;
        dispatch(singlePostHandler(post));
      })
  };
}
