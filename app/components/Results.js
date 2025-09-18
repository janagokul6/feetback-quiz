export default function Results({ recommendations, onRestart }) {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
        <p className="text-gray-600">Thank you for completing the quiz. Here are your personalized recommendations:</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Your Personalized Recommendations</h2>
        <p className="text-blue-800 leading-relaxed">{recommendations}</p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">What's Next?</h3>
        <ul className="text-gray-700 space-y-2">
          <li>• Check your email for a confirmation with your results</li>
          <li>• Save these recommendations for future reference</li>
          <li>• Start implementing the suggested learning approach</li>
        </ul>
      </div>

      <div className="text-center">
        <button
          onClick={onRestart}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Take Quiz Again
        </button>
      </div>
    </div>
  );
}