// src/services/students.js
import supabase from '../supabase'
import { uploadStudentPhoto, deleteStudentPhoto } from '../utils/storage'

export const getStudent = async (id) => {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('id', id)

  if (error) throw error
  if (!data || data.length === 0) {
    throw new Error('Student not found')
  }
  return data[0]
}

export const updateStudentPhoto = async (studentId, file) => {
  const photoUrl = await uploadStudentPhoto(studentId, file)

  const { data, error } = await supabase
    .from('students')
    .update({ photo_url: photoUrl })
    .eq('id', studentId)
    .select()

  if (error) {
    await deleteStudentPhoto(photoUrl) // Rollback if failed
    throw error
  }

  return data
}

export const searchStudents = async (searchTerm) => {
  const query = supabase
    .from('students')
    .select('*')
    .ilike('full_name', `%${searchTerm}%`)

  const { data, error } = await query
  if (error) throw error
  return data
}
