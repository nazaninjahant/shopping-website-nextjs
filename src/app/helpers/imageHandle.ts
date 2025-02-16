import { createClient } from "@supabase/supabase-js";

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Upload file using standard upload
export async function uploadFile(files: any) {
  // const { data, error } = await supabase.storage
  //   .from("images")
  //   .upload(`${file.uid}`, file);
  // if (error) {
  //   console.log(error);
  // } else {
  //   console.log(data);
  // }

  const promises = [];
  for (const file of files) {
    const fileName = file.uid;
    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName, file);
    const url =
      "https://zdopxvivdxtdmzatjmmr.supabase.co/storage/v1/object/public/images";
    const dataWithUrl = { ...data, url };
    if (error) {
      throw new Error(error.message);
    }
    promises.push(dataWithUrl);
  }
  return promises;
}
