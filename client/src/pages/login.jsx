import { useNavigate } from "react-router";
import { useState } from "react";
import supabase from "../supabaseClient";
import { useAuthContext } from "../context/authContext.jsx";

function Login() {

    const { signIn, loading, errorMessage } = useAuthContext()
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const result = await signIn({ email, password });
            console.log(result)
            if(result.success) {
                navigate("/");
                console.log("gogo")
            } else {
                console.log("Something went wrong...")
            }
        }
        catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
			<div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
                    <p className="text-sm text-gray-600 mt-1">Sign in to access your WordVault</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4" aria-label="Login form">

                    {
                        errorMessage && <div className="p-4 border border-red-600">{errorMessage}</div>
                    }

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail((prev) => e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                                onChange={(e) => setPassword((prev) => e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-sm text-gray-600"
                                aria-label="toggle password visibility"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg transition"
                    >
                        Sign in
                    </button> */}

                    <button
						type="submit"
						disabled={loading}
						className={`
							w-full font-semibold py-2 rounded-lg transition duration-200
							flex items-center justify-center gap-2
							${loading
								? "bg-blue-400 cursor-not-allowed"
								: "bg-blue-500 hover:bg-blue-600"
							}
							text-white
						`}
					>
						{loading && (
							<span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
						)}
						{loading ? "Signing in..." : "Sign In"}
					</button>

                    <div className="text-center text-sm text-gray-600 mt-4">
                        New here?
                        <button
                            type="button"
                            onClick={() => navigate("/signup")}
                            className="ml-1 text-blue-600 font-semibold hover:underline"
                        >
                            Create an account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
