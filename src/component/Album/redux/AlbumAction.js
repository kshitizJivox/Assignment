import axios from "axios";
import {
  FAIL_ALBUM,
  REQUEST_ALBUM,
  REQUEST_ALBUM_PHOTO,
  SEARCH_ALBUM,
  SEARCH_PHOTO,
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

export const searchAlbumHandler = (val, albums) => {
  let temp = [];

  albums.map((album) => {
    if (album.title.includes(val)) temp.push(album);
  });

  return {
    type: SEARCH_ALBUM,
    payload: temp,
  };
};

const successAlbumPhotoHandler = (data) => {
  return {
    type: REQUEST_ALBUM_PHOTO,
    payload: data,
  };
};

export const searchPhotoHandler = (val, photos) => {
  let resPhoto = [];

  photos.map((photo) => {
    if (photo.title.includes(val)) resPhoto.push(photo);
  });

  return {
    type: SEARCH_PHOTO,
    payload: resPhoto,
  };
};

export const requestingAlbum = (userId) => {
  return (dispatch) => {
    dispatch(requestAlbumHandler());

    axios
      .get(`https://jsonplaceholder.typicode.com/user/${userId}/albums`)
      .then((res) => {
        dispatch(successAlbumHandler(res.data));
      })
      .catch((error) => {
        const err = error.message;
        dispatch(failAlbumHandler(err));
      });
  };
};

export const requestingAlbumPhotos = (albumId) => {
  return (dispatch) => {
    dispatch(requestAlbumHandler());

    axios
      .get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
      .then((res) => {
        dispatch(successAlbumPhotoHandler(res.data));
      })
      .catch((error) => {
        const err = error.message;
        // dispatch(failAlbumHandler(err));
      });
  };
};
