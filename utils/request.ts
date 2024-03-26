"use server";
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export const getNotes = async ( userId: string) => {
    const supabase = await createClient();
    const { data: todos, error } = await supabase
    .from('notes')
    .select('*')
    .eq("user_id", userId)
    .order('id', { ascending: true })
    if (error) {
      console.error('Error fetching notes:', error.message);
      return [];
    }
  
    return todos;
};

export const addNote = async (userId: string, noteText:string ) => {
    const supabase = await createClient();
      const { data: note, error } = await supabase
        .from('notes')
        .insert({ note: noteText, user_id: userId })
        .select()
        .single()
        if (error) {
          console.error('Error fetching notes:', error.message);
          return [];
        }
        return note;       
};

export const updateNote = async (todo: any, newNote: string ) => {
  const supabase = await createClient();  
  try { 
    const { data, error, status } = await supabase
    .from('notes')
    .update({ note: newNote })
    .eq("id", todo.id)
    .select();
    if (error) {
      console.error('Error fetching notes:', error);
      return [];
    }

    revalidatePath("/");
    }catch (error) {
      console.log('error', error)
    }  
}

export const deleteNote = async (id: string) => {
  const supabase = await createClient();  
    try {
      await supabase.from('notes').delete().eq('id', id).throwOnError()
    } catch (error) {
      console.log('error', error)
    }
  }