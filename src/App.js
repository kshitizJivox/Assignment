import { Provider } from "react-redux";
import "./App.css";
import store from "./redux/store";

import Authroute from "./component/Authroute";
import Homepage from "./component/Homepage/Homepage";
import Login from "./component/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./component/navbar/Navbar";
import Album from "./component/Album/Album";
import Todo from "./component/Todo/Todo";
import Error404 from "./component/Error404/Error404";
import PostLayout from "./component/Homepage/PostLayout/PostLayout";
import Layout from "./component/Album/Layout/Layout";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Authroute>
                <Homepage />
              </Authroute>
            }
          />
          <Route
              path="posts/:id"
              element={
                <Authroute>
                  <PostLayout />
                </Authroute>
              }
            />
          <Route
            path="/album"
            element={
              <Authroute>
                <Album />
              </Authroute>
            }
          />
          <Route
              path="album/:id"
              element={
                <Authroute>
                  <Layout />
                </Authroute>
              }
            />
          <Route
            path="/todo"
            element={
              <Authroute>
                <Todo />
              </Authroute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
