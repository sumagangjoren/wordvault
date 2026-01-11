

export default function EmailConfirmation() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-white">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">✉️</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Check your email</h1>
            <p className="text-slate-500 mb-8 max-w-xs">
                We've sent a verification link to <span className="font-semibold">{email}</span>.
            </p>
            <button
                // onClick={() => setStep(AuthStep.LOGIN)}
                className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all mb-4"
            >
                I've verified my account
            </button>
            <button
                onClick={() => alert("Verification email resent!")}
                className="text-indigo-600 font-medium hover:underline"
            >
                Resend verification email
            </button>
        </div>
    );
}