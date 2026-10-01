import { supabase } from '../lib/supabase'

export type LessonNote = {
  id: string;
  created_at: string;
  student_id: string;
  notes: string;
};

export async function getLessonNotes(studentId: string) {
  const { data, error } = await supabase
    .from('Lessons')
    .select('*')
    .eq('student_id', studentId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching lesson notes:', error)
    return []
  }
  
  return data || []
}