// File: src/utils/storage.js
import supabase from '../supabase'

const BUCKETS = {
  STUDENT_PHOTOS: 'student-photos',
  GALLERY: 'gallery'
}

export const uploadFile = async (bucket, filePath, file) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    })

  if (error) throw error
  return data
}

export const getPublicUrl = (bucket, filePath) => {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath)
  return data.publicUrl
}

export const deleteFile = async (bucket, filePath) => {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([filePath])
  if (error) throw error
}

export const listFiles = async (bucket, path = '', limit = 100) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .list(path, {
      limit,
      sortBy: { column: 'created_at', order: 'desc' }
    })

  if (error) throw error
  return data
}

// Student photos specific functions
export const uploadStudentPhoto = async (studentId, file) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${studentId}_${Date.now()}.${fileExt}`
  const filePath = fileName

  await uploadFile(BUCKETS.STUDENT_PHOTOS, filePath, file)
  return getPublicUrl(BUCKETS.STUDENT_PHOTOS, filePath)
}

export const deleteStudentPhoto = async (photoUrl) => {
  const filePath = photoUrl.split('/').pop()
  await deleteFile(BUCKETS.STUDENT_PHOTOS, filePath)
}
