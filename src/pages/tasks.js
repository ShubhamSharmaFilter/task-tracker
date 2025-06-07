import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout, { Container } from "../components/layout";
import { apiurl } from "../config/config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";
import { LogoLoader } from "../components/loader";
import Pagination from "../components/pagination";
import axios from "axios";
import { getCookie } from "../config/webStorage";
import { Filter, Search, X, SlidersHorizontal, Plus } from "lucide-react";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [showFilterPopup, setShowFilterPopup] = useState(false);

  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [tempStatus, setTempStatus] = useState("");
  const [tempStart, setTempStart] = useState(null);
  const [tempEnd, setTempEnd] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, [currentPage, itemsPerPage, search, statusFilter, startDate, endDate]);

  const fetchTasks = async () => {
    setLoading(true);
    const token = getCookie("tttoken");
    let url = `${apiurl}/api/tasks?page=${currentPage}&limit=${itemsPerPage}`;

    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (statusFilter) url += `&status=${encodeURIComponent(statusFilter)}`;
    if (startDate) url += `&startDate=${startDate.toISOString().split("T")[0]}`;
    if (endDate) url += `&endDate=${endDate.toISOString().split("T")[0]}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `${token}`,
        },
      });

      const data = response.data;
      setTasks(data?.tasks || []);
      setTotalItems(data?.pagination?.totalItems || 0);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLimitChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleClearFilter = () => {
    setStatusFilter("");
    setStartDate(null);
    setEndDate(null);
    setTempStatus("");
    setTempStart(null);
    setTempEnd(null);
    setShowFilterPopup(false);
  };

  const applyFilters = () => {
    setStatusFilter(tempStatus);
    setStartDate(tempStart);
    setEndDate(tempEnd);
    setCurrentPage(1);
    setShowFilterPopup(false);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <Container overflow={"overflow-scroll"}>
        <div className="p-6 bg-gray-50 min-h-screen">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-gray-800">
              Task Manager
            </h2>
            <button
              onClick={() => setShowFilterPopup(true)}
              className="flex items-center px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filter
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center w-full md:w-1/3">
              <Search className="w-5 h-5 absolute ml-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="pl-10 p-2 border border-gray-300 rounded w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between gap-2">
              <Link
                to="/tasks/create"
                className="flex items-center gap-2 px-4 py-2 bg-[#4B49AC]  hover:bg-[#3c3c50]  text-white rounded  transition duration-200"
              >
                <Plus className="w-4 h-4" />
                <span>Create Task</span>
              </Link>
              <select
                className="p-2 border rounded text-gray-700"
                value={itemsPerPage}
                onChange={handleLimitChange}
              >
                {[10, 20, 50, 100].map((num) => (
                  <option key={num} value={num}>
                    {num} / page
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter Popup */}
          {showFilterPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[400px] space-y-4 relative">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                  onClick={() => setShowFilterPopup(false)}
                >
                  <X />
                </button>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Filter Tasks
                </h3>

                <DatePicker
                  selected={tempStart}
                  onChange={(date) => setTempStart(date)}
                  className="w-full p-2 border rounded"
                  placeholderText="Start Date"
                  dateFormat="yyyy-MM-dd"
                  isClearable
                />

                <DatePicker
                  selected={tempEnd}
                  onChange={(date) => setTempEnd(date)}
                  className="w-full p-2 border rounded"
                  placeholderText="End Date"
                  dateFormat="yyyy-MM-dd"
                  isClearable
                />

                <select
                  className="w-full p-2 border rounded"
                  value={tempStatus}
                  onChange={(e) => setTempStatus(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    className="px-4 py-2 bg-[#4B49AC] hover:bg-[#3c3c50] text-white rounded"
                    onClick={applyFilters}
                  >
                    Apply
                  </button>
                  <button
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    onClick={handleClearFilter}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          {loading ? (
            <LogoLoader />
          ) : (
            <div className="bg-white rounded-lg shadow overflow-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-700 uppercase">
                  <tr>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Create At</th>
                    <th className="px-4 py-3">Due Date</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((task, index) => (
                    <motion.tr
                      key={task.id}
                      className="border-t hover:bg-gray-50 transition"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="px-4 py-3">{task.title}</td>
                      <td className="px-4 py-3">{task.description}</td>
                      <td className="px-4 py-3 capitalize">{task.status}</td>
                      <td className="px-4 py-3">
                        {task.created_at
                          ? new Date(task.created_at).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="px-4 py-3">
                        {task.due_date
                          ? new Date(task.due_date).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          to={`/tasks/${task.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          Manage
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Tasks;
