import { supabase } from '../lib/supabase'

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