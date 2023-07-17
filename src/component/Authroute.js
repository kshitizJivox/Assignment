import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { prevRoute } from "./Login/redux/LoginAction";

function Authroute(props) {
  const auth = useSelector((state) => state.login.auth);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(prevRoute(location.pathname));
  }, []);

  return <>{!auth ? <Navigate to="/login" /> : props.children}</>;
}

export default Authroute;
