import React from "react";
import Todo from "./Todo";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

const Home = () => {
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
  const addTask = (event) => {
    event.preventDefault();
    const task = event.target.task.value;
    fetch("https://radiant-shelf-35399.herokuapp.com/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ task: task }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.acknowledged === true) {
          toast.success("Task added");
          refetch();
          event.target.task.value = "";
        } else {
          toast.error("Failed to add task");
        }
      });
  };
  return (
    <section className="container mt-5 min-vh-100">
      <form onSubmit={addTask} className="input-group mb-3 w-50 mx-auto">
        <input
          type="text"
          name="task"
          className="form-control"
          placeholder="Add a Task"
        />
        <button className="btn btn-outline-secondary" type="submit">
          Enter
        </button>
      </form>
      {/* Todo list component */}
      <Todo tasks={tasks} isLoading={isLoading} refetch={refetch} />
    </section>
  );
};

export default Home;
