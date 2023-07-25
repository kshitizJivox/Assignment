import { useLocation } from "react-router-dom";
import { addTodo, updateTodo } from "../../redux/TodoAction";
import classes from "./NewTodo.module.css";
import { useDispatch, useSelector } from "react-redux";

function NewTodo({ todoData, setTodoData }) {
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const todo = useSelector((state) => state.todo.todo);

  const initialTodoData = {
    title: "",
    completed: false,
    id: (Number(userData.id) - 1) * 10 + todo.length + 1,
    edit: false,
    userId: userData.id,
  };

  const changeTitleHandler = (value) => {
    let temp = { ...todoData, title: value };
    setTodoData(temp);
  };

  const todoHandler = () => {
    let temp = { ...todoData };
    delete temp["edit"];

    setTodoData(initialTodoData);
    if (todoData.edit) {
      dispatch(updateTodo(temp));
    } else {
      temp = {
        ...temp,
        id: (Number(userData.id) - 1) * 20 + todo.length + 1,
      };
      dispatch(addTodo(temp));
    }
  };

  return (
    <div className={classes.mainContainer}>
      <h4>{todoData.edit ? "Edit Task" : "Add Task"}:</h4>
      <input
        type="text"
        placeholder="Title"
        defaultValue={todoData.title}
        value={todoData.title}
        onChange={(e) => changeTitleHandler(e.target.value)}
      />
      <div className={classes.buttonContainer}>
        {todoData.edit && (
          <button onClick={() => setTodoData(initialTodoData)}>Discard</button>
        )}
        <button onClick={() => todoHandler()}>Submit</button>
      </div>
    </div>
  );
}

export default NewTodo;
