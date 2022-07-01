import React, { useState } from "react";
import { useQuery } from "react-query";

const CompletedTasks = () => {
  
  const {
    data: tasks,
    isLoading,
    refetch,
  } = useQuery("completedTasks", () =>
    fetch("https://radiant-shelf-35399.herokuapp.com/completedTasks").then(
      (res) => res.json()
    )
    );
  
  return (
    <section className="container min-vh-100 ">
      <h2>Completed Tasks:</h2>
      <div className="d-flex flex-wrap">
        {tasks?.map((task) => {
          return (
            <div key={task._id} className="card w-25 m-4">
              <div className="card-body">{task.task}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CompletedTasks;
