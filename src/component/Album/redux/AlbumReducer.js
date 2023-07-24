import {
    FAIL_ALBUM,
    REQUEST_ALBUM,
    REQUEST_SINGLE_ALBUM,
    SUCCESS_ALBUM,
    SEARCH_ALBUM,
    SEARCH_PHOTO,
  } from "./AlbumActionType";
  
  const initialState = {
    loading: false,
    albums: [],
    error: "",
    toBeRenderedAlbums: [],
    albumPool : [],
    singleAlbum : [],
    renderSingleAlbum : []
  };
  
  const AlbumReducer = (state = initialState, action) => {
      switch (action.type) {
      case REQUEST_ALBUM:
        {
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
          toBeRenderedAlbums: action.payload,
          albumPool : action.payload,
          error : ""
        };
  
      case FAIL_ALBUM:
        return {
          ...state,
          loading: false,
          albums: [],
          error: action.payload,
          toBeRenderedAlbums: [],
          albumPool : []
        };
  
      case SEARCH_ALBUM:
        return {
          ...state,
          albumPool: action.payload,
          toBeRenderedAlbums : action.payload
        };

        case SEARCH_PHOTO:
        return {
          ...state,
          renderSingleAlbum : action.payload
        };
  
      case REQUEST_SINGLE_ALBUM :
        return {
          ...state,
          loading : false,
          singleAlbum : action.payload,
          renderSingleAlbum : action.payload
        }
      default:
        return state;
    }
  };
  
  export default AlbumReducer;
  