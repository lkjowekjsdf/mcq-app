import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  "https://pbuwgfnlvjjxyihgknpw.supabase.co/rest/v1/",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBidXdnZm5sdmpqeHlpaGdrbnB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5NDkyNzQsImV4cCI6MjA5MzUyNTI3NH0.2ggyDpv0JlT2mIF4QTxELAr1ji7WMUQ8uWGiiLXxrxA"
)