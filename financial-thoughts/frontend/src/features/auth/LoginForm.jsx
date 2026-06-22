import { useState } from "react";

function LoginForm({ onSubmit, setToken }) {
  const INITIAL_STATE = {
    username: "",
    password: ""
  };

  const [formData, setFormData] = useState(INITIAL_STATE);

  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData(f => ({
      ...f,
      [name]: value
    }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="card">

      <input
        className="input"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />

      <input
        className="input"
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />

      <button className="btn btn-primary" type="submit">
        Login
      </button>

    </form>
  );
}

export default LoginForm;