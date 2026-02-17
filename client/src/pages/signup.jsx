import { useState } from 'react';
import { useAuthContext } from '../context/authContext';
import { useNavigate } from 'react-router';

export default function SignUp() {

	const { signUp, loading, errorMessage } = useAuthContext();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { success } = await signUp({ email: formData.email, password: formData.password });

			if (success) {
				navigate("/");
			}
			else {
				console.error(error)
			}
		}
		catch (error) {
			console.error(error);
		}
		// console.log('Form submitted:', formData);
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
			<div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
				{/* <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign Up</h1>
				<p className="text-sm text-gray-600 mt-1">Sign in to access your WordVault</p> */}
				 <div className="mb-10 text-center">
					<div className="inline-block p-3 bg-indigo-600 rounded-2xl mb-4">
						<span className="text-3xl">🚀</span>
					</div>
					<h1 className="text-3xl font-extrabold text-slate-900">WordVault</h1>
					<p className="text-slate-500">Master new words, one swipe at a time.</p>
					</div>	
				<form onSubmit={handleSubmit} className="space-y-4">
					{
                        errorMessage && <div className="p-4 border border-red-600">{errorMessage}</div>
                    }

					<div>
						<label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>

						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
							placeholder="Enter your email"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
						<div className="relative">
							<input
								id="password"
								name="password"
								value={formData.password}
								type={showPassword ? "text" : "password"}
								className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
								placeholder="Enter your password"
								onChange={handleChange}
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

					<button
						type="submit"
						disabled={loading}
						className={`
							w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95
							${loading
								? "bg-blue-400 cursor-not-allowed"
								: "bg-blue-500 hover:bg-blue-600"
							}
						`}
					>
						{loading && (
							<span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
						)}
						{loading ? "Signing up..." : "Sign Up"}
					</button>

					<div className="text-center text-sm text-gray-600 mt-4">
						Already have an account?
						<button
							type="button"
							onClick={() => navigate("/login")}
							className="ml-1 text-blue-600 font-semibold hover:underline"
						>
							Sign in
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}