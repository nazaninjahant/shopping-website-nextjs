import { createClient } from "@supabase/supabase-js";

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Upload file using standard upload
export async function uploadFile(file: any) {
  const { data, error } = await supabase.storage
    .from("images")
    .upload(`${file.uid}`, file);
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
}
