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

export async function addLessonNote(studentId: string, notes: string, lessonDate: string) {
  const { data, error } = await supabase
    .from('Lessons')
    .insert({
      student_id: studentId,
      notes,
      created_at: new Date(`${lessonDate}T12:00:00`).toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error('Error adding lesson note:', error)
    return null
  }

  return data
}