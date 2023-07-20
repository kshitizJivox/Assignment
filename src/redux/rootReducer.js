import { combineReducers } from "redux";
import loginReducer from "../component/Login/redux/LoginReducer";
import HomepageReducer from "../component/Homepage/redux/HomepageReducer";
import AlbumReducer from "../component/Album/redux/AlbumReducer";
import { TodoReducer } from "../component/Todo/redux/TodoReducer";

const rootReducer = combineReducers({
    login : loginReducer,
    homepage : HomepageReducer,
    album : AlbumReducer,
    todo : TodoReducer
})

export default rootReducer