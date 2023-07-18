import {
    FAIL_ALBUM,
    PAGINATED_ALBUM,
    REQUEST_COMMENT,
    REQUEST_ALBUM,
    REQUEST_SINGLE_ALBUM,
    SEARCH,
    SUCCESS_ALBUM,
  } from "./AlbumActionType";
  
  const initialState = {
    loading: false,
    albums: [],
    error: "",
    toBeRenderedAlbums: [],
    albumPool : [],
    comment : {},
    singleAlbum : {}
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
          albums: action.payload.albums,
          toBeRenderedAlbums: action.payload.albums.slice(0, action.payload.albumsPerPages),
          albumPool : action.payload.albums,
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
          albumPool: action.payload,
        };
  
      case PAGINATED_ALBUM: {
        const toBeRenderedAlbums = state.albumPool.slice(
          action.payload.start,
          action.payload.end
        );
  
        return {
          ...state,
          toBeRenderedAlbums : toBeRenderedAlbums
        }
      }
  
      case REQUEST_SINGLE_ALBUM :
        return {
          ...state,
          loading : false,
          singleAlbum : action.payload
        }
      default:
        return state;
    }
  };
  
  export default AlbumReducer;
  