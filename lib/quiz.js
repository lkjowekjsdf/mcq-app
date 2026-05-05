import { supabase } from "./supabase";

export async function getNextAttemptNumber(user_id, subject) {
  const { data, error } = await supabase
    .from("quiz_attempts")
    .select("attempt_number")
    .eq("user_id", user_id)
    .eq("subject", subject)
    .order("attempt_number", { ascending: false })
    .limit(1);

  if (error) {
    console.error(error);
    return 1;
  }

  if (!data || data.length === 0) return 1;

  return data[0].attempt_number + 1;
}

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