import { createClient } from '@/utils/supabase/server';

export default async function Notes() {
  const supabase = createClient();
  const { data: notes, error } = await supabase.from("notes").select();
    console.log(notes, error);
  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}