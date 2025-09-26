import React, { useState } from "react";
import "../styles/Addtask.css";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({});

  const handleAddTask = async () => {
    console.log(taskData);
    let result = await fetch("http://localhost:3200/add-task", {
      method: "post",
      body: JSON.stringify(taskData),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.success) {
      navigate("/");
      console.log(result, " new data added");
    } else {
      alert("Try after SomeTime");
    }
  };
  return (
    <div className="container">
      <h1>Add New Task</h1>

      <label htmlFor="">Title</label>
      <input
        type="text"
        placeholder="Enter Task Title"
        name="title"
        onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
      />
      <label htmlFor="">Description</label>
      <textarea
        name="description"
        placeholder="Enter Task Description"
        id=""
        rows={3}
        onChange={(e) =>
          setTaskData({ ...taskData, description: e.target.value })
        }
      ></textarea>
      <button onClick={handleAddTask} className="submit">
        Add New Task
      </button>
    </div>
  );
};

export default AddTask;
