import { useState } from 'react';
import { useAuthContext } from '../context/authContext';
import { useNavigate } from 'react-router';

export default function SignUp() {

	const { signUp, loading } = useAuthContext();
	const navigate = useNavigate();
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
			const result = await signUp({email: formData.email, password: formData.password});
			console.log(result)
			if(result.success) {
				navigate("/");
			}
			else {
				console.error(result.error)
			}
		}
		catch(error) {
			console.error(error);
		}
		// console.log('Form submitted:', formData);
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
			<div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
				<h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign Up</h1>
				
				<form onSubmit={handleSubmit} className="space-y-4">
					{/* <div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Name
						</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter your name"
						/>
					</div> */}

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Email
						</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter your email"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Password
						</label>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter your password"
							required
						/>
					</div>

					{/* <div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Confirm Password
						</label>
						<input
							type="password"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Confirm your password"
							required
						/>
					</div> */}

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
						{loading ? "Signing up..." : "Sign Up"}
					</button>
				</form>
			</div>
		</div>
	);
}