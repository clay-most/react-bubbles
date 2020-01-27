import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = props => {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const handleChange = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = () => {
    axiosWithAuth()
      .post(`/login`, form)
      .then(response => {
        localStorage.setItem("token", response.data.payload);
        props.history.push(`/bubbles`);
      })
      .catch(error => console.log("Error", error));
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form
        onSubmit={event => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <br></br>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <br></br>
        <button type="submit">Log In</button>
      </form>
    </>
  );
};

export default Login;
