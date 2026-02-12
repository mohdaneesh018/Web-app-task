import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [editingId, setEditingId] = useState(null);

    const fetchTasks = async () => {
        const res = await API.get("/tasks");
        setTasks(res.data);
    };

    const addTask = async () => {
        if (!title.trim()) return;

        if (editingId) {
            await API.put(`/tasks/${editingId}`, { title });
            setEditingId(null);
        } else {
            await API.post("/tasks", { title });
        }

        setTitle("");
        fetchTasks();
    };

    const deleteTask = async (id) => {
        await API.delete(`/tasks/${id}`);
        fetchTasks();
    };

    const editTask = (task) => {
        setTitle(task.title);
        setEditingId(task._id);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6">
            <Navbar />

            <div className="max-w-3xl mx-auto mt-10 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8">

                <div className="flex items-center justify-between mb-6">

                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-wide">
                        Your Tasks
                    </h2> 

                </div>

                {/* Add / Edit Task */}
                <div className="flex gap-3 mb-6">
                    <input
                        type="text"
                        placeholder="Enter task..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />

                    <button
                        onClick={addTask}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition duration-300"
                    >
                        {editingId ? "Update" : "Add"}
                    </button>
                </div>

                {/* Task List */}
                <ul className="space-y-3">
                    {tasks.length === 0 ? (
                        <p className="text-gray-500 text-center">
                            No tasks yet.
                        </p>
                    ) : (
                        tasks.map((t) => (
                            <li
                                key={t._id}
                                className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-lg shadow-sm hover:bg-gray-200 transition"
                            >
                                <span>{t.title}</span>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => editTask(t)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteTask(t._id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))
                    )}
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;