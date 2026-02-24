import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const logoutHandler = () => {
        toast((t) => (
            <div className="flex flex-col gap-4 bg-white text-gray-800 p-4 rounded-lg shadow-lg">
                <p className="font-semibold text-base">
                    Are you sure you want to logout?
                </p>

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            toast.dismiss(t.id);
                            toast.success("Logged out successfully");
                            navigate("/login");
                        }}
                        className="px-4 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        ), {
            duration: 6000,
        });
    };

    return (
        <nav className="w-full bg-white/20 backdrop-blur-md shadow-md px-6 py-3 flex justify-between items-center rounded-b-xl">

            <Link
                to="/dashboard"
                className="text-2xl font-bold text-white tracking-wide"
            >
                Task Manager
            </Link>

            <div className="flex items-center gap-6 text-white font-medium">
                {!token ? (
                    <>
                        <Link
                            to="/login"
                            className="hover:text-purple-200 transition"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                        >
                            Register
                        </Link>
                    </>
                ) : (
                    <button
                        onClick={logoutHandler}
                        className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;