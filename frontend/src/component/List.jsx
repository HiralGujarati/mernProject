import React, { useEffect, useState } from "react";

import "../styles/List.css";
import { Link } from "react-router-dom";

const List = () => {
  const [taskData, setTaskData] = useState();
  const [selectedTask, setSelectedTask] = useState([]);

  useEffect(() => {
    getListData();
  }, []);
  const getListData = async () => {
    let list = await fetch("http://localhost:3200/tasks", {
      credentials: "include",
    });
    list = await list.json();
    if (list.success) {
      setTaskData(list.result);
    } else {
      alert("Try After Some Time");
    }
    console.log(list);
  };
  const deleteTask = async (id) => {
    let item = await fetch("http://localhost:3200/delete/" + id, {
      credentials: "include",
      method: "delete",
    });
    item = await item.json();
    if (item.success) {
      getListData();
      console.log("data deleted");
    } else {
      alert("Try After SomeTime");
    }
  };
  const selectAll = (event) => {
    if (event.target.checked) {
      let items = taskData.map((item) => item._id);
      setSelectedTask(items);
      console.log(items);
    } else {
      setSelectedTask([]);
    }
  };
  const selectSingleItem = (id) => {
    if (selectedTask.includes(id)) {
      let items = selectedTask.filter((item) => item != id);
      setSelectedTask([items]);
    } else {
      setSelectedTask([id, ...selectedTask]);
    }
    console.log(selectedTask);
  };
  const deleteMultiple = async () => {
    console.log(selectedTask);

    let item = await fetch("http://localhost:3200/delete-multiple/", {
      method: "delete",
      body: JSON.stringify(selectedTask),
      credentials: "include",
      headers: {
        "Content-Type": "Application/Json",
      },
    });
    item = await item.json();
    if (item.success) {
      getListData();
    } else {
      alert("Try After Some Time");
    }
  };

  return (
    <div className="list-container">
      <h1>To Do list</h1>
      <button onClick={deleteMultiple} className="delete-item delete-multiple">
        delete
      </button>
      <ul className="task-list">
        <li className="task-header">
          <input type="checkbox" onChange={selectAll} />
        </li>
        <li className="task-header">S. No.</li>
        <li className="task-header">Title</li>
        <li className="task-header">Description</li>
        <li className="task-header">Action</li>
        {taskData &&
          taskData.map((item, index) => (
            <React.Fragment key={item._id || index}>
              <li className="task-item">
                <input
                  type="checkbox"
                  onChange={() => selectSingleItem(item._id)}
                  checked={selectedTask.includes(item._id)}
                />
              </li>
              <li className="task-item">{index + 1}</li>
              <li className="task-item">{item.title}</li>
              <li className="task-item">{item.description}</li>
              <li className="task-item">
                <button
                  className="delete-item"
                  onClick={() => deleteTask(item._id)}
                >
                  Delete
                </button>
                <Link to={`/update/${item._id}`} className="update-item">
                  Update
                </Link>
              </li>
            </React.Fragment>
          ))}
      </ul>
    </div>
  );
};

export default List;
