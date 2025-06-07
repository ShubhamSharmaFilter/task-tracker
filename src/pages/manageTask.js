import React, { useEffect, useState } from "react";
import Layout, { Container } from "../components/layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiurl } from "../config/config";
import { getCookie } from "../config/webStorage";

const ManageTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
    due_date: "",
  });

  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const token = getCookie("tttoken");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`${apiurl}/api/tasks/${id}`, {
          headers: { Authorization: `${token}` },
        });
        const { title, description, status, due_date } = res.data.data;
        setTask({ title, description, status, due_date });
      } catch (err) {
        console.error("Error fetching task:", err);
      }
    };

    fetchTask();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${apiurl}/api/tasks/${id}`, task, {
        headers: { Authorization: `${token}` },
      });
      alert("Task updated successfully");
      navigate("/tasks");
    } catch (err) {
      console.error("Update error:", err);
      alert("Error updating task");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;

    setDeleting(true);
    try {
      await axios.delete(`${apiurl}/api/tasks/${id}`, {
        headers: { Authorization: `${token}` },
      });
      alert("Task deleted successfully");
      navigate("/tasks");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting task");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Layout>
      <Container overflow="overflow-scroll">
        <div className="max-w-xl mx-auto bg-white mt-10 border p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Update Task</h2>
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
              required
            />
            <select
              name="status"
              value={task.status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <input
              type="date"
              name="due_date"
              value={task.due_date?.split("T")[0] || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <div className="flex justify-between items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={loading || deleting}
                className="bg-[#4B49AC] hover:bg-[#3c3c50] text-white px-4 py-2 rounded flex-1"
              >
                {loading ? "Updating..." : "Update Task"}
              </button>

              <button
                type="button"
                disabled={loading || deleting}
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex-1"
              >
                {deleting ? "Deleting..." : "Delete Task"}
              </button>
            </div>
          </form>
        </div>
      </Container>
    </Layout>
  );
};

export default ManageTask;