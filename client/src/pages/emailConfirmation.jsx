export default function EmailConfirmation() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center">
                <div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Confirm your email
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        We've sent a confirmation link to your email address.
                    </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-gray-700">
                        Please check your email and click the confirmation link to complete your registration.
                    </p>
                </div>

                <div className="text-sm text-gray-600">
                    <p>Didn't receive an email? Check your spam folder.</p>
                </div>
            </div>
        </div>
    );
}