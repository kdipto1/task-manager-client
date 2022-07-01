import React from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

const Todo = () => {
  const {
    data: tasks,
    isLoading,
    refetch,
  } = useQuery("homeTasks", () =>
    fetch("https://radiant-shelf-35399.herokuapp.com/allTasks").then((res) =>
      res.json()
    )
  );
  if (isLoading) {
    return (
      <div
        className="spinner-grow"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }
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
    <section className="container min-vh-100 ">
      <h2 className="text-center">To-Do:</h2>
      {tasks?.map((task) => {
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
