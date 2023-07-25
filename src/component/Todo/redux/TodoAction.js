import axios from "axios";
import {
  ADD,
  REQUEST_TODO,
  SEARCH,
  STATUS_CHANGED,
  SUCCESS_TODO,
  UPDATE,
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

export const addTodo = (todo) => {
  return {
    type : ADD,
    payload : todo
  }
}

export const updateTodo = (todo) => {
  return {
    type : UPDATE,
    payload : todo
  }
}

export const todoStatusHandler = (e, todoId) => {
  return {
    type : STATUS_CHANGED,
    payload : {
      id : todoId,
      status : e.target.checked
    }
  }
}

export const requestTodo = (userId) => {
  return (dispatch) => {
    dispatch(fetchingTodo());

    axios.get("https://jsonplaceholder.typicode.com/user/" + userId + "/todos").then((res) => {
      dispatch(successTodo(res.data));
    });
  };
};
