import React, { useState } from "react";
import Layout, { Container } from "../components/layout";
import axios from "axios";
import { apiurl } from "../config/config";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../config/webStorage";

const CreateTask = () => {
  const navigate = useNavigate();
  const token = getCookie("tttoken");

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "pending",
    due_date: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${apiurl}/api/tasks`, task, {
        headers: {
          Authorization: `${token}`,
        },
      });

      alert("Task created successfully!");
      navigate("/tasks");
    } catch (err) {
      console.error("Create error:", err);
      alert("Failed to create task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container overflow="overflow-scroll">
        <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={task.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={task.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <select
              name="status"
              value={task.status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <input
              type="date"
              name="due_date"
              value={task.due_date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#4B49AC] hover:bg-[#3c3c50] text-white px-4 py-2 rounded w-full"
            >
              {loading ? "Creating..." : "Create Task"}
            </button>
          </form>
        </div>
      </Container>
    </Layout>
  );
};

export default CreateTask;