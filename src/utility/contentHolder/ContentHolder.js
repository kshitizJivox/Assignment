import classes from "./ContentHolder.module.css";
import Post from "../../component/Homepage/Post/Post";
import Photo from "../../component/Album/Photo/Photo";
import UserTodo from "../../component/Todo/TodoBlock/TodoBlock";

function ContentHolder({ content, type }) {
  return (
    <div className={classes.mainContainer}>
      {content.map((content, i) => {
        switch (type) {
          case 1:
            return <Post key={i} postData={content} />;
          case 2:
            return <Photo key={i} photoData={content} />;
          case 3:
            return <UserTodo key={i} todo={content} />;
        }
      })}
    </div>
  );
}

export default ContentHolder;
