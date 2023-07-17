import { LOGIN, LOGIN_ERROR, LOGOUT, PREV_ROUTE } from "./LoginActionType";

const initialState = {
  auth: false,
  userData : {},
  error : "",
  prevRoute : "/"
};


const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
        return {
            ...state,
            auth: true,
            userData : action.payload
          };
    }

    case LOGOUT:
      localStorage.removeItem("userData")
      return {
        ...state,
        auth: false,
      };

    case LOGIN_ERROR:
        return{
            ...state,
            auth : false,
            error : action.payload
        }

    case PREV_ROUTE:
      return {
        ...state,
        prevRoute : action.payload
      }

    default : return state
  }
};

export default loginReducer