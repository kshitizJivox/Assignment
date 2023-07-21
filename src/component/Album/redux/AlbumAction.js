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

export const successAlbumHandler = (albums) => {
  return {
    type: SUCCESS_ALBUM,
    payload: albums,
  };
};

export const failAlbumHandler = (error) => {
  return {
    type: FAIL_ALBUM,
    payload: error,
  };
};

export const searchHandler = (val, albums) => {
  let temp = [];

  albums.map((album) => {
    let resultAlbum = [];
    album.map((task) => {
      if (task.title.includes(val)) resultAlbum.push(task);
    });

    if(resultAlbum.length != 0)
        temp.push(resultAlbum);
  });

  return {
    type: SEARCH,
    payload: temp,
  };
};

const singleAlbumHandler = (album) => {
  return {
    type: REQUEST_SINGLE_ALBUM,
    payload: album,
  };
};

export const requestingAlbum = () => {
  return (dispatch) => {
    dispatch(requestAlbumHandler());

    axios
      .get(`https://jsonplaceholder.typicode.com/albums`)
      .then((res) => {
        const albums = res.data;
        let userId = res.data[0].userId;
        let temp = [];
        let newAlbum = [];

        albums.map((album) => {
          if (album.userId == userId) {
            temp.push(album);
          } else {
            userId = album.userId;
            newAlbum.push(temp);
            temp = [];
            temp.push(album);
          }
        });

        newAlbum.push(temp);
        dispatch(successAlbumHandler(newAlbum));
      })
      .catch((error) => {
        const err = error.message;
        dispatch(failAlbumHandler(err));
      });
  };
};

export const requestingSingleAlbum = (albumId) => {
  return (dispatch) => {
    dispatch(requestAlbumHandler());
    axios
      .get(`https://jsonplaceholder.typicode.com/photos?albumId=` + albumId)
      .then((res) => {
        const post = res.data;
        dispatch(singleAlbumHandler(post));
      });
  };
};
