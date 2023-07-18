import { combineReducers } from "redux";
import loginReducer from "../component/Login/redux/LoginReducer";
import HomepageReducer from "../component/Homepage/redux/HomepageReducer";
import AlbumReducer from "../component/Album/redux/AlbumReducer";

const rootReducer = combineReducers({
    login : loginReducer,
    homepage : HomepageReducer,
    album : AlbumReducer
})

export default rootReducer