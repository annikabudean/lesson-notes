import { supabase } from '../lib/supabase'

export type Student = {
  id: string;
  name: string;
};

export async function getStudents() {
    const { data, error } = await supabase
        .from('Students')
        .select('*')
    if (error) throw error
    return data
}

export async function getStudentById(id: string) {
    const { data, error } = await supabase
        .from('Students')
        .select('*')
        .eq('id', id)
        .single()
    if (error) throw error
    return data
}

export async function createStudent(student: { name: string }) {
    const { data, error } = await supabase
        .from('Students')
        .insert(student)
        .select()
        .single()
    if (error) throw error
    return data
}