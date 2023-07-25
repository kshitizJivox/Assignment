import {
  FAIL_ALBUM,
  REQUEST_ALBUM,
  SUCCESS_ALBUM,
  SEARCH_ALBUM,
  SEARCH_PHOTO,
  REQUEST_ALBUM_PHOTO,
} from "./AlbumActionType";

const initialState = {
  loading: false,
  albums: [], // total albums
  albumsPool : [],
  error: "",
  albumPhotoPool : [],
  albumPhoto: [],   // album displayed maybe be after search or default
};

const AlbumReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_ALBUM: {
      return {
        ...state,
        loading: true,
      };
    }
    case SUCCESS_ALBUM:
      return {
        ...state,
        loading: false,
        albums: action.payload,
        albumsPool : action.payload,
        error: "",
      };

    case FAIL_ALBUM:
      return {
        ...state,
        loading: false,
        albums: [],
        albumsPool : [],
        error: action.payload,
        albumPhoto: [],
        albumPhotoPool : []
      };

    case SEARCH_ALBUM:
      return {
        ...state,
        albums: action.payload,
      };

    case REQUEST_ALBUM_PHOTO:
      return {
        ...state,
        albumPhoto : action.payload,
        albumPhotoPool : action.payload
      }

    case SEARCH_PHOTO:
      return {
        ...state,
        albumPhoto : action.payload
      };

    default:
      return state;
  }
};

export default AlbumReducer;
