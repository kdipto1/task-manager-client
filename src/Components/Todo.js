import React from "react";
import { toast } from "react-toastify";

const Todo = ({ tasks, refetch }) => {
  //
  const handleTask = async (event, id) => {
    event.preventDefault();
    const task = event?.target.task.value;
    fetch(`https://radiant-shelf-35399.herokuapp.com/task/${id}`, {
      method: "PUT",
      body: JSON.stringify({ task: task }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.acknowledged === true) {
          toast.success("Task edited");
          refetch();
        } else {
          toast.error("Failed to edit");
        }
      });
  };
  const handleComplete = async (event, id, task) => {
    await fetch("https://radiant-shelf-35399.herokuapp.com/completedTask", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ task: task }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.acknowledged === true) {
          toast.success("Task Completed");
        } else {
          console.log(data);
        }
      });
    fetch(`https://radiant-shelf-35399.herokuapp.com/task/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.acknowledged === true) {
          refetch();
        } else {
          toast.error("Network Error");
        }
      });
  };
  return (
    <section>
      <h1 className="text-center">Tasks:</h1>
      {tasks?.reverse().map((task) => {
        return (
          <form
            key={task._id}
            onSubmit={(event) => handleTask(event, task._id)}
            className="input-group mb-3 w-50 mx-auto"
          >
            <div className="input-group-text">
              <input
                className="form-check-input mt-0"
                type="checkbox"
                onClick={(event) => handleComplete(event, task._id, task.task)}
                value="completed"
                aria-label="Checkbox for following text input"
              />
            </div>
            <input
              type="text"
              name="task"
              defaultValue={task.task}
              className="form-control"
              aria-label="Text input with checkbox"
            />
            <button className="btn btn-outline-secondary" type="submit">
              Edit
            </button>
          </form>
        );
      })}
    </section>
  );
};

export default Todo;
