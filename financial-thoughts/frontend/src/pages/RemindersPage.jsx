import { useEffect, useState } from "react";
import FinancialApi from "../api/FinancialApi";
import RemindersForm from "../components/RemindersForm";

function RemindersPage() {

  const [reminders, setReminders] = useState([]);

  useEffect(() => {

    async function load() {

      const data =
        await FinancialApi.getReminders();

      setReminders(data.reminders);

    }

    load();

  }, []);

  async function addReminder(data) {

    const res =
      await FinancialApi.createReminder(data);

    setReminders(r => [
      ...r,
      res.reminder
    ]);

  }

  async function deleteReminder(id) {

    await FinancialApi.deleteReminder(id);

    setReminders(r =>
      r.filter(reminder => reminder.id !== id)
    );

  }

  async function toggleComplete(reminder) {

    const res =
      await FinancialApi.updateReminder(
  reminder.id,
  {
    title: reminder.title,
    description: reminder.description,
    dueDate: reminder.due_date,
    completed: !reminder.completed
  }
);

    setReminders(r =>
      r.map(item =>
        item.id === reminder.id
          ? res.reminder
          : item
      )
    );

  }

  return (

    <div className="page">

      <h1 className="page-header">Reminders</h1>

      <RemindersForm onSubmit={addReminder} />

      <div className="dashboard-grid">

        {reminders.map(reminder => {

          const overdue =
            !reminder.completed &&
            new Date(reminder.due_date) < new Date();

          return (

            <div
              key={reminder.id}
              className="card"
            >

              <h3>{reminder.title}</h3>

              <p>{reminder.description}</p>

              <p>
                Due:{" "}
                {new Date(
                  reminder.due_date
                ).toLocaleDateString()}
              </p>

              <p>
                Status:{" "}
                <span className={
  reminder.completed
    ? "status completed"
    : overdue
    ? "status overdue"
    : "status upcoming"
}>
  {reminder.completed
    ? "Completed"
    : overdue
    ? "Overdue"
    : "Upcoming"}
</span>
              </p>

              <button
                className="btn"
                onClick={() =>
                  toggleComplete(reminder)
                }
              >
                Toggle Complete
              </button>

              <button
                className="btn btn-danger"
                onClick={() =>
                  deleteReminder(reminder.id)
                }
              >
                Delete
              </button>

            </div>

          );

        })}

      </div>

    </div>

  );

}

export default RemindersPage;