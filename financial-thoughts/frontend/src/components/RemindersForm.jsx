import { useState } from "react";

const INITIAL_STATE = {
  title: "",
  description: "",
  dueDate: ""
};

function RemindersForm({ onSubmit }) {

  const [formData, setFormData] =
    useState(INITIAL_STATE);

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

    setFormData(INITIAL_STATE);
  }

  return (

    <form
      className="card"
      onSubmit={handleSubmit}
    >

      <h2>Add Reminder</h2>

      <input
        className="input"
        name="title"
        placeholder="Reminder title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <textarea
        className="input"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        className="input"
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        required
      />

      <button
        className="btn btn-primary"
        type="submit"
      >
        Save Reminder
      </button>

    </form>

  );

}

export default RemindersForm;