import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";
import { setAuthenticationToken } from "./apis/setAuthenticationToken";
import { loadUser, logout } from "./Redux/actions/auth";

const Login = lazy(() => {
  return import("./pages/Login");
});

const GoogleMap = lazy(() => {
  return import("./pages/Map");
});

const App = () => {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state: any) => state.auth);

  useEffect(() => {
    const { token } = localStorage;

    if (token) {
      setAuthenticationToken(token);
      dispatch(loadUser());
    }

    window.addEventListener("storage", () => {
      if (!token) dispatch(logout());
    });
  }, [dispatch, isAuthenticated]);

  let routes = (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );

  if (isAuthenticated) {
    routes = (
      <>
        <Routes>
          <Route path="/map" element={<GoogleMap />} />
          <Route path="*" element={<Navigate replace to="/map" />} />
        </Routes>
      </>
    );
  }

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        }
      >
        {" "}
        {routes}
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
