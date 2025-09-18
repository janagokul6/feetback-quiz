export default function Question({ question, answer, onAnswerChange, error }) {
  const handleChange = (value) => {
    onAnswerChange(question.id, value);
  };

  if (question.type === 'multiple-choice') {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
        <div className="space-y-2">
          {question.options.map((option) => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={answer === option}
                onChange={(e) => handleChange(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    );
  }

  if (question.type === 'email') {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
        <input
          type="email"
          value={answer || ''}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={question.placeholder}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    );
  }

  return null;
}