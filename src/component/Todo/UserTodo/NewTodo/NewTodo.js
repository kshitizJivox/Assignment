import { useLocation } from "react-router-dom";
import { addTodo } from "../../redux/TodoAction";
import classes from "./NewTodo.module.css";
import { useDispatch } from "react-redux";

function NewTodo({ todoData, setTodoData }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const initialTodoData = {
    title: "",
    completed: false,
    id: "",
    edit: false,
    userId: location.pathname.split("/")[2],
  };

  const changeTitleHandler = (value) => {
    let temp = { ...todoData, title: value };
    setTodoData(temp);
  };

  const todoHandler = () => {
    let temp = todoData;
    delete temp["edit"];
    setTodoData(initialTodoData)
    dispatch(addTodo(temp));
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
      {todoData.edit && (
        <div className={classes.statusContainer}>
          <span>Status : </span>
          <label>
            <input
              type="radio"
              name="status"
              defaultChecked={todoData.completed}
            />
            Completed
          </label>
          <label>
            <input
              type="radio"
              name="status"
              defaultChecked={!todoData.completed}
            />
            Incompleted
          </label>
        </div>
      )}

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
