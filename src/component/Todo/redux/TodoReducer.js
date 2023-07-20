import {
  REQUEST_SINGLE_TODO,
  REQUEST_TODO,
  SEARCH,
  SUCCESS_TODO,
} from "./TodoActionType";

const initialState = {
  allTodo: [],
  todo: [],
  loading: false,
  userTodo: [],
};

export const TodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_TODO:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS_TODO:
      return {
        ...state,
        loading: false,
        allTodo : action.payload,
        todo: action.payload
      };
    case REQUEST_SINGLE_TODO:
      return {
        ...state,
        userTodo: action.payload,
        loading: false,
      };
    case SEARCH:
      return {
        ...state,
        todo: action.payload,
      };
    default:
      return state;
  }
};
