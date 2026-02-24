import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [user, setUser] = useState(null);
    const [search, setSearch] = useState("");
    const [editingProfile, setEditingProfile] = useState(false);
    const [updatedName, setUpdatedName] = useState("");
    const [updatedEmail, setUpdatedEmail] = useState("");


    const fetchTasks = async () => {
        try {
            const res = await API.get("/tasks");
            setTasks(res.data);
        } catch (error) {
            toast.error("Failed to fetch tasks");
        }
    };

    const fetchProfile = async () => {
        try {
            const res = await API.get("/user/profile");
            setUser(res.data);
            setUpdatedName(res.data.name);
            setUpdatedEmail(res.data.email);
        } catch (error) {
            toast.error("Failed to fetch profile");
        }
    };

    const updateProfile = async () => {
        try {
            const res = await API.put("/user/profile", {
                name: updatedName,
                email: updatedEmail
            });

            setUser(res.data);
            setEditingProfile(false);
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error("Profile update failed");
        }
    };

    const addTask = async () => {
        if (!title.trim()) {
            toast.error("Task title cannot be empty");
            return;
        }

        try {
            if (editingId) {
                await API.put(`/tasks/${editingId}`, { title });
                toast.success("Task updated successfully");
                setEditingId(null);
            } else {
                await API.post("/tasks/create", { title });
                toast.success("Task added successfully");
            }

            setTitle("");
            fetchTasks();
        } catch (error) {
            toast.error("Task operation failed");
        }
    };

    const deleteTask = async (id) => {
        try {
            await API.delete(`/tasks/${id}`);
            toast.success("Task deleted successfully");
            fetchTasks();
        } catch (error) {
            toast.error("Failed to delete task");
        }
    };

    const editTask = (task) => {
        setTitle(task.title);
        setEditingId(task._id);
    };

    useEffect(() => {
        fetchTasks();
        fetchProfile();
    }, []);

    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6">
            <Navbar />

            <div className="max-w-3xl mx-auto mt-10 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8">

                <div className="bg-gray-100 p-4 rounded-lg mb-6 shadow">
                    <h2 className="text-xl font-bold text-gray-800 mb-3">
                        User Profile
                    </h2>

                    {editingProfile ? (
                        <>
                            <div className="mb-3">
                                <label className="block text-gray-700 font-semibold mb-1">
                                    Name:
                                </label>
                                <input
                                    type="text"
                                    value={updatedName}
                                    onChange={(e) => setUpdatedName(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-1">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    value={updatedEmail}
                                    onChange={(e) => setUpdatedEmail(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={updateProfile}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                                >
                                    Save
                                </button>

                                <button
                                    onClick={() => setEditingProfile(false)}
                                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="text-gray-700">
                                <strong>Name:</strong> {user?.name}
                            </p>
                            <p className="text-gray-700 mb-3">
                                <strong>Email:</strong> {user?.email}
                            </p>

                            <button
                                onClick={() => setEditingProfile(true)}
                                className="bg-purple-600 text-white px-4 py-2 rounded-lg"
                            >
                                Edit Profile
                            </button>
                        </>
                    )}
                </div>

                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-wide">
                        Your Tasks
                    </h2>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Search Tasks
                    </label>

                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                            🔍
                        </span>

                        <input
                            type="text"
                            placeholder="Search by task name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                    </div>
                </div>

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

                <ul className="space-y-3">
                    {filteredTasks.length === 0 ? (
                        <p className="text-gray-500 text-center">
                            No tasks found.
                        </p>
                    ) : (
                        filteredTasks.map((t) => (
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