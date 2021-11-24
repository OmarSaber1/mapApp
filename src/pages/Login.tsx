import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { login } from "../Redux/actions/auth";

const Login = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state: any) => state.auth);

  const { isAuthenticated, loading: pageLoader } = auth;

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/map", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const { username, password } = formData;
  const onChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e: any) => {
    e.preventDefault();
    if (username.length > 4 && password.length > 4) {
      dispatch(login({ username, password }));
      setLoading(pageLoader);
    }
  };

  return (
    <>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
          marginTop: "200px",
        }}
      >
        <h1 style={{ marginBottom: "50px" }}>Login</h1>
        <input
          placeholder="Username"
          style={{ width: "300px" }}
          type="text"
          name="username"
          value={username}
          onChange={(event) => onChange(event)}
          disabled={loading}
        />
        <input
          placeholder="Password"
          style={{ width: "300px" }}
          name="password"
          value={password}
          type="password"
          onChange={(event) => onChange(event)}
          disabled={loading}
        />
        <Button
          style={{ width: "300px" }}
          variant="primary"
          onClick={(event) => onSubmit(event)}
          type="submit"
          disabled={loading}
        >
          Login
        </Button>{" "}
      </form>
    </>
  );
};

export default Login;
