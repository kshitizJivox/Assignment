import {
  ADD,
  DELETE,
  REQUEST_SINGLE_TODO,
  REQUEST_TODO,
  SEARCH,
  STATUS_CHANGED,
  SUCCESS_TODO,
  UPDATE,
} from "./TodoActionType";

const initialState = {
  allTodo: [],
  todo: [],
  loading: false,
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
        allTodo: action.payload,
        todo: action.payload,
      };
    case SEARCH:
      return {
        ...state,
        todo: action.payload,
      };
    case ADD: {
      let temp = [...state.todo];
      temp.reverse();
      temp = [...temp, action.payload];
      temp.reverse();

      return {
        ...state,
        todo: temp,
        allTodo: temp,
      };
    }

    case UPDATE: {
      let temp = [...state.todo];
      let newTodo = [];

      temp.map((todo) => {
        if (todo.id == action.payload.id) {
          newTodo.push(action.payload);
        } else newTodo.push(todo);
      });

      return {
        ...state,
        todo: newTodo,
        allTodo: newTodo,
      };
    }

    case STATUS_CHANGED: {
      let temp = [...state.todo];
      console.log(action.payload);
      temp.map((todo) => {
        if (todo.id == action.payload.id) {
          todo.completed = action.payload.status;
        }
      });

      return {
        ...state,
        todo: temp,
        allTodo: temp,
      };
    }

    case DELETE: {
      let temp = [...state.todo];
      temp = temp.filter((todo) => todo.id != action.payload);
      return {
        ...state,
        todo: temp,
        allTodo: temp,
      };
    }

    default:
      return state;
  }
};
