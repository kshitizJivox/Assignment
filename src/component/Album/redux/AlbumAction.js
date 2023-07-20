import axios from "axios";
import {
  FAIL_ALBUM,
  PAGINATED_ALBUM,
  REQUEST_COMMENT,
  REQUEST_ALBUM,
  REQUEST_SINGLE_ALBUM,
  SEARCH,
  SUCCESS_ALBUM,
} from "./AlbumActionType";

export const requestAlbumHandler = () => {
  return {
    type: REQUEST_ALBUM,
  };
};

export const successAlbumHandler = (albums, albumsPerPages) => {
  return {
    type: SUCCESS_ALBUM,
    payload: {
      albumsPerPages: albumsPerPages,
      albums: albums,
    },
  };
};

export const failAlbumHandler = (error) => {
  return {
    type: FAIL_ALBUM,
    payload: error,
  };
};

const succesComment = (comment, albumId) => {
  return {
    type: REQUEST_COMMENT,
    payload: {
      comment: comment,
      albumId: albumId,
    },
  };
};

export const searchHandler = (searchValue, albums) => {
  let temp = [...albums];
  let toBeRenderedAlbums = [];

  temp.map((album) => {
    if (album.title.includes(searchValue)) toBeRenderedAlbums.push(album);
  });
  return {
    type: SEARCH,
    payload: toBeRenderedAlbums,
  };
};

const singleAlbumHandler = (album) => {
  return {
    type: REQUEST_SINGLE_ALBUM,
    payload: album,
  };
};

export const requestingAlbum = (start, albumsPerPage) => {
  return (dispatch) => {
    dispatch(requestAlbumHandler());
        
    // console.log("[start]", start);
    axios
      .get(`https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${albumsPerPage}`)
      .then((res) => {
        const albums = res.data;
        let albumId = res.data[0].albumId;
        let albumArray = [];
        let newAlbum = [];

        albums.map((album) => {
          if (album.albumId == albumId) {
            albumArray.push(album);
          } else {
            albumId = album.albumId;
            newAlbum.push(albumArray);
            albumArray = [];
            albumArray.push(album);
          }
        });

        newAlbum.push(albumArray)
          dispatch(successAlbumHandler(newAlbum, albumsPerPage));
      })
      .catch((error) => {
        const err = error.message;
        dispatch(failAlbumHandler(err));
      });
  };
};

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

export const requestingSingleAlbum = (postId) => {
  return (dispatch) => {
    dispatch(requestAlbumHandler());
    axios
      .get("https://jsonplaceholder.typicode.com/posts/" + postId)
      .then((res) => {
        const post = res.data;
        dispatch(singleAlbumHandler(post));
      });
  };
};
