import supabase from '../supabase.js'

const BUCKET_NAME = 'student-photos'

export const uploadStudentPhoto = async (studentId, file) => {
  const fileExt = file.name.split('.').pop()
  const filePath = `${studentId}.${fileExt}`

  // Upload file
  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      upsert: true, // overwrite if exists
      cacheControl: '3600',
      contentType: file.type
    })

  if (uploadError) {
    throw uploadError
  }

  // Get public URL
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath)
  return data.publicUrl
}

export const deleteStudentPhoto = async (publicUrl) => {
  try {
    const parts = publicUrl.split('/')
    const filePath = parts.slice(parts.indexOf(BUCKET_NAME) + 1).join('/')

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath])

    if (error) throw error
  } catch (err) {
    console.warn('Delete photo failed:', err.message)
  }
}
