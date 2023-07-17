import { combineReducers } from "redux";
import loginReducer from "../component/Login/redux/LoginReducer";
import HomepageReducer from "../component/Homepage/redux/HomepageReducer";

const rootReducer = combineReducers({
    login : loginReducer,
    homepage : HomepageReducer
})

export default rootReducer