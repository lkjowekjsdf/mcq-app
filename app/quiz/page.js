"use client";

import { useState, useEffect } from "react";
import useUser from "../../lib/useUser";
import { saveQuizAttempt, getNextAttemptNumber } from "../../lib/quiz";

const questions = [
  {
    question: "2 + 2 = ?",
    options: ["3", "4", "5", "6"],
    answer: "4"
  },
  {
    question: "Capital of France?",
    options: ["Berlin", "Paris", "London", "Rome"],
    answer: "Paris"
  }
];

export default function Quiz() {
  const { user, loading } = useUser();

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/login";
    }
  }, [user, loading]);

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  const current = questions[index];

  async function handleAnswer(option) {
    let newScore = score;

    if (option === current.answer) {
      newScore = score + 1;
      setScore(newScore);
    }

    if (index + 1 < questions.length) {
      setIndex(index + 1);
      return;
    }

    setFinished(true);

    // 🔥 correct attempt logic (FIXED)
    const attemptNumber = await getNextAttemptNumber(user.id, "General");

    await saveQuizAttempt({
      user_id: user.id,
      subject: "General",
      score: newScore,
      total_questions: questions.length,
      attempt_number: attemptNumber
    });
  }

  if (finished) {
    return (
      <div>
        <h1>Quiz Finished</h1>
        <p>
          Score: {score} / {questions.length}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Quiz</h1>

      <h2>{current.question}</h2>

      {current.options.map((opt) => (
        <button key={opt} onClick={() => handleAnswer(opt)}>
          {opt}
        </button>
      ))}
    </div>
  );
}