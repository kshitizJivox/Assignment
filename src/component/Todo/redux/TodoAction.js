import axios from "axios";
import {
  REQUEST_TODO,
  SEARCH,
  SUCCESS_TODO,
} from "./TodoActionType";

export const fetchingTodo = () => {
  return {
    type: REQUEST_TODO,
  };
};

export const successTodo = (todo) => {
  return {
    type: SUCCESS_TODO,
    payload: todo,
  };
};

export const searchResultHandler = (val, todo) => {
  let temp = [];

  todo.map((userTodo) => {
    if (userTodo.title.includes(val)){
      temp.push(userTodo);
    }
  });
  
  return {
    type: SEARCH,
    payload: temp,
  };
};

export const requestTodo = (userId) => {
  return (dispatch) => {
    dispatch(fetchingTodo());

    axios.get("https://jsonplaceholder.typicode.com/user/" + userId + "/todos").then((res) => {
      dispatch(successTodo(res.data));
    });
  };
};

export const addTodo = (userId, todoData) => {
  return (dispatch) => {
    dispatch(fetchingTodo());

    
  };
};
