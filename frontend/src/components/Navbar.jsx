import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const logoutHandler = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="w-full bg-white/20 backdrop-blur-md shadow-md px-6 py-3 instead of py-4 flex justify-between items-center rounded-b-xl">

            {/* Logo / Brand */}
            <Link
                to="/dashboard"
                className="text-2xl font-bold text-white tracking-wide"
            >
                Task Manager
            </Link>

            {/* Right Side Links */}
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