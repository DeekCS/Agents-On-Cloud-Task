import React, { useState, useEffect } from "react";
import axios from "axios";
import Error from "../components/Error";
import Success from "../components/Success";
import Loader from "../components/Loader";

export default function Login() {

  useEffect(() => {
    document.title = "Agents | Login";
  }, []);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "password":
        setPassword(value);
        break;
      case "email":
        setEmail(value);
        break;
      default:
        break;
    }
  };
  const Login = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    try {
      setLoading(true);

      const response = (await axios.post("/api/users/login", user)).data;
      setLoading(false);
      localStorage.setItem("token", JSON.stringify(response));
      window.location.href = "/";
      alert("login success");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
    console.log(user);
  };

  return (
    <div className={"container"}>
      {loading ? <Loader /> : null}
      <div className="row box-shadow justify-content-center mt-5">
        {error ? <Error message={'Invalid Credentials'} /> : null}
        <div className="col-md-6">
          <div className="">
            <h1>Login</h1>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleOnChange}
              className={"form-control mt-3"}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleOnChange}
              className={"form-control mt-3"}
            />
            <button className="btn btn-primary mt-3" onClick={Login}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
