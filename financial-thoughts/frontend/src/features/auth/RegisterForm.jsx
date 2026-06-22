import { useState } from "react";

function RegisterForm({ onSubmit }) {
  const INITIAL_STATE = {
    username: "",
    email: "",
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
    <div className="page">
      <h1>Create Account</h1>

      <form onSubmit={handleSubmit} className="card">

        <input
          className="input"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          className="input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn btn-primary">
          Register
        </button>

      </form>
    </div>
  );
}

export default RegisterForm;