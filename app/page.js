'use client';

import { useState } from 'react';
import QuizForm from './components/QuizForm.js';
import Results from './components/Results.js';

export default function Home() {
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState('');

  const handleQuizComplete = (recs) => {
    setRecommendations(recs);
    setShowResults(true);
  };

  const handleRestart = () => {
    setShowResults(false);
    setRecommendations('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {!showResults ? (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Learning Style Quiz</h1>
              <p className="text-xl text-gray-600">Discover your personalized learning recommendations</p>
            </div>
            <QuizForm onComplete={handleQuizComplete} />
          </div>
        ) : (
          <Results recommendations={recommendations} onRestart={handleRestart} />
        )}
      </div>
    </div>
  );
}