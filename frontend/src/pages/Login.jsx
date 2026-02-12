import { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center px-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">

            <div className="bg-white/90 backdrop-blur-lg w-full max-w-md p-8 rounded-2xl shadow-2xl">

                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Welcome Back
                </h2>

                <form onSubmit={handleLogin} className="space-y-5">

                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300 font-semibold"
                    >
                        Login
                    </button>

                </form>

                <div className="mt-6 border-t pt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Don’t have an account?{" "}
                        <Link
                            to="/register"
                            className="text-purple-600 font-semibold hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Login;