import { useState, useEffect, useCallback } from 'react';
import quizData from '~/data/quiz.json';

type Answer = {
  text: string;
  side: 'light' | 'dark';
};

type Question = {
  question: string;
  answers: Answer[];
};

const CardQuiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [lightScore, setLightScore] = useState(0);
  const [darkScore, setDarkScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const loadQuestions = useCallback(() => {
    setLoading(true);

    const shuffledQuestions = [...quizData]
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);

    const preparedQuestions = shuffledQuestions.map((q: any) => ({
      ...q,
      answers: [...q.answers].sort(() => 0.5 - Math.random()),
    }));

    setQuestions(preparedQuestions);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const handleAnswer = (side: 'light' | 'dark') => {
    if (side === 'light') {
      setLightScore((prev) => prev + 1);
    } else {
      setDarkScore((prev) => prev + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setLightScore(0);
    setDarkScore(0);
    setFinished(false);
    loadQuestions();
  };

  if (loading || questions.length === 0) {
    return (
      <div className="flex min-h-[30vh] flex-col items-center justify-center">
        <div className="sw-spinner mb-4" />
        <span className="text-sm tracking-[0.2em] text-amber-400 uppercase">
          Accessing Jedi Archives...
        </span>
      </div>
    );
  }

  if (finished) {
    const isLight = lightScore > darkScore;
    const isNeutral = lightScore === darkScore;

    return (
      <div className="sw-card mx-auto w-full max-w-2xl p-8 text-center">
        <h2
          className="mb-6 text-3xl font-bold"
          style={{
            color: isLight
              ? '#4fc3f7'
              : isNeutral
                ? 'var(--color-sw-gold)'
                : '#ff4444',
          }}
        >
          {isNeutral
            ? 'THE GRAY JEDI'
            : isLight
              ? 'THE LIGHT SIDE'
              : 'THE DARK SIDE'}
        </h2>

        <p className="mb-8 text-lg leading-relaxed text-gray-300">
          {isNeutral
            ? 'You walk the line between light and dark, maintaining balance in the Force.'
            : isLight
              ? 'You are guided by peace, wisdom, and compassion. The Force is with you, always.'
              : 'Peace is a lie, there is only passion. You draw your strength from the dark side.'}
        </p>

        <div className="mb-10 flex justify-center gap-12 border-t border-b border-[rgba(255,232,31,0.15)] py-6">
          <div className="text-center">
            <div className="mb-2 text-sm tracking-widest text-gray-500 uppercase">
              Light
            </div>
            <div className="text-4xl font-bold text-[#4fc3f7]">
              {lightScore}
            </div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-sm tracking-widest text-gray-500 uppercase">
              Dark
            </div>
            <div className="text-4xl font-bold text-[#ff4444]">{darkScore}</div>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="sw-btn-outline mx-auto px-8 py-3 text-lg"
        >
          Take Another Trial
        </button>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-4 flex items-end justify-between px-2">
        <h2 className="text-xl font-bold tracking-widest text-amber-500 uppercase">
          Holocron Trial
        </h2>
        <span className="text-sm font-bold tracking-widest text-gray-500">
          Question {currentQuestion + 1} / {questions.length}
        </span>
      </div>

      {}
      <div className="mb-8 h-1 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.1)]">
        <div
          className="h-full bg-amber-400 transition-all duration-500 ease-out"
          style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
        />
      </div>

      <div className="sw-card mb-8 !p-8 md:!p-12">
        <h3 className="mb-8 text-center text-xl leading-relaxed font-bold text-gray-200 md:text-2xl">
          {q.question}
        </h3>

        <div className="flex flex-col gap-4">
          {q.answers.map((ans, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(ans.side)}
              className="rounded-lg border border-[rgba(255,232,31,0.2)] bg-[rgba(0,0,0,0.3)] p-4 text-left text-base text-gray-300 transition-all duration-200 hover:-translate-y-1 hover:border-amber-400 hover:bg-[rgba(255,232,31,0.08)] hover:text-white hover:shadow-[0_4px_15px_rgba(255,232,31,0.1)] md:text-lg"
            >
              {ans.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardQuiz;
