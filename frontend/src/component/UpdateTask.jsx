import React, { useEffect, useState } from "react";
import "../styles/Addtask.css";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTask = () => {
  const [taskData, setTaskData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getTask(id);
  }, []);

  const getTask = async (id) => {
    let task = await fetch(`http://localhost:3200/task/` + id, {
      credentials: "include",
    });
    task = await task.json();
    if (task.result) {
      setTaskData(task.result);
    } else {
      alert("Try After Some Time");
    }
  };

  const updateTask = async () => {
    let task = await fetch("http://localhost:3200/update-task", {
      method: "put",
      body: JSON.stringify(taskData),
      credentials: "include",
      headers: {
        "Content-Type": "Application/json",
      },
    });
    task = await task.json();
    if (task) {
      navigate("/");
    } else {
      alert("Try after Some Time");
    }
  };
  return (
    <div className="container">
      <h1>Update Task</h1>

      <label htmlFor="">Title</label>
      <input
        type="text"
        value={taskData?.title || ""}
        onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
      />
      <label htmlFor="">Description</label>
      <textarea
        value={taskData?.description || ""}
        id=""
        rows={3}
        onChange={(e) =>
          setTaskData({ ...taskData, description: e.target.value })
        }
      ></textarea>
      <button onClick={updateTask} className="submit">
        Update Task
      </button>
    </div>
  );
};

export default UpdateTask;
