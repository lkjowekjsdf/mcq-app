"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { saveQuizAttempt } from "../../lib/quiz";
import useUser from "../../lib/useUser";

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
  const { user } = useUser();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!user) {
    window.location.href = "/login";
    return null;
  }

  const current = questions[index];

  async function handleAnswer(option) {
    let newScore = score;

    if (option === current.answer) {
      newScore = score + 1;
      setScore(newScore);
    }

    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      setFinished(true);

      await saveQuizAttempt({
        user_id: user.id,
        subject: "General",
        score: newScore,
        total_questions: questions.length,
        attempt_number: 1
      });
    }
  }

  if (finished) {
    return (
      <div>
        <h1>Quiz Finished</h1>
        <p>Score: {score}/{questions.length}</p>
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