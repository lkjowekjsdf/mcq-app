import { supabase } from "./supabase";

export async function saveQuizAttempt({
  user_id,
  subject,
  score,
  total_questions,
  attempt_number
}) {
  const { error } = await supabase.from("quiz_attempts").insert([
    {
      user_id,
      subject,
      score,
      total_questions,
      attempt_number
    }
  ]);

  if (error) {
    console.error(error);
  }
}

import { saveQuizAttempt } from "../lib/quiz";

await saveQuizAttempt({
  user_id: user.id,
  subject: "Math",
  score: 8,
  total_questions: 10,
  attempt_number: 1
});