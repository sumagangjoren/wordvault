import { useNavigate } from "react-router";
export default function NotFound() {

    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-[20%] right-[10%] w-64 h-64 bg-pink-200/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-sm">
                <div className="mb-8 relative">
                    <div className="text-[120px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-indigo-600 to-indigo-900 opacity-10 select-none">
                        404
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-7xl animate-bounce">🧐</span>
                    </div>
                </div>

                <h1 className="text-3xl font-black text-slate-900 mb-4 leading-tight">
                    Lost in translation?
                </h1>
                <p className="text-slate-500 mb-10 leading-relaxed">
                    It looks like the word or page you're looking for doesn't exist in our current dictionary.
                </p>

                <div className="space-y-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full py-4 cursor-pointer bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 flex items-center justify-center space-x-2"
                    >
                        <span>🏠</span>
                        <span>Go Back</span>
                    </button>

                    {/* <button
                        onClick={() => navigate(-1)}
                        className="w-full py-4 cursor-pointer bg-white text-slate-600 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all"
                    >
                        Go Back
                    </button> */}
                </div>
            </div>

            <div className="mt-12 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                VocabFlow Error: Page_Not_Defined
            </div>
        </div>
    );
}