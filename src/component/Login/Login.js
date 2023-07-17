import { useDispatch, useSelector } from "react-redux";
import classes from "./Login.module.css";
import { useEffect, useState } from "react";
import { fetchingUserData } from "./redux/LoginAction";
import { useLocation, useNavigate } from "react-router-dom";
import { loginHandler } from "./redux/LoginAction";

function Login() {
  const [inData, setInData] = useState({});
  const error = useSelector((state) => state.login.error);
  const auth = useSelector((state) => state.login.auth);
  const userData = useSelector((state) => state.login.userData);
  const prevRoute = useSelector((state) => state.login.prevRoute)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData !== null){
      dispatch(loginHandler(JSON.parse(userData)));
    }
  }, []);

  useEffect(() => {
    if (auth) {
      const data = localStorage.getItem("userData");
      if (data == null)
        localStorage.setItem("userData", JSON.stringify(userData));

      navigate(prevRoute);
    }
  }, [auth]);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.loginBox}>
        <div className={classes.loginHeader}>
          <h1>Login to your account</h1>
        </div>
        <div className={classes.loginFields}>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setInData({ ...inData, username: e.target.value })}
            className={classes.inputBox}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setInData({ ...inData, pass: e.target.value })}
            className={classes.inputBox}
          />

          <span className={classes.errorMsg}>{error}</span>
          <button
            className={classes.loginButton}
            onClick={() => dispatch(fetchingUserData(inData))}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
export default Login;
