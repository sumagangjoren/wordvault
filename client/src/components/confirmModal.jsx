
export default function ConfirmModal({ isOpen, title, message, confirmText, onConfirm, onCancel }) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onCancel}
            />

            {/* Modal Card */}
            <div className="relative bg-white w-full max-w-sm rounded-[32px] p-8 shadow-2xl transform transition-all animate-in fade-in zoom-in duration-200">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <span className="text-3xl">⚠️</span>
                </div>

                <h3 className="text-2xl font-black text-center text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-center mb-8 leading-relaxed">
                    {message}
                </p>

                <div className="flex flex-col space-y-3">
                    <button
                        onClick={onConfirm}
                        className="w-full py-4 cursor-pointer bg-red-500 text-white font-black rounded-2xl hover:bg-red-600 transition-colors shadow-lg shadow-red-100"
                    >
                        {confirmText}
                    </button>
                    <button
                        onClick={onCancel}
                        className="w-full cursor-pointer py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );

}