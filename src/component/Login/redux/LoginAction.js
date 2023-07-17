import axios from "axios";
import { LOGIN, LOGIN_ERROR, LOGOUT, PREV_ROUTE } from "./LoginActionType";

export const loginHandler = (data) => {
  localStorage.setItem("auth", true)
  return {
    type: LOGIN,
    payload: data,
  };
};

export const logoutHandler = () => {
  localStorage.setItem("auth", false)
  return {
    type: LOGOUT,
  };
};

const loginErrorHandler = (error) => {
  localStorage.setItem("auth", false)
    return {
        type : LOGIN_ERROR,
        payload : error
    }
}

export const prevRoute = (route) => {
  return {
    type : PREV_ROUTE,
    payload : route
  }
}

export const fetchingUserData = (inData) => {
  return (dispatch) => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        let auth = false;
        let userData = {};

        res.data.every((user) => {
          if (inData.username == user.email && inData.pass == user.username) {
            auth = true;
            userData = {...user};
            return false;
          }

          return true
        });

        if(auth)
            dispatch(loginHandler(userData))
        else
            dispatch(loginErrorHandler("*Invalid email or password. Please enter username as password."))
      })
      .catch((error) => {
        const err = error.message;
      });
  };
};
