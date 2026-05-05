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