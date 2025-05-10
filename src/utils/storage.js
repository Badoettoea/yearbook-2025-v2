import supabase from '../supabase';

export const uploadStudentPhoto = async (studentId, file) => {
  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    throw new Error('Hanya file JPEG atau PNG yang diperbolehkan');
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('Ukuran file terlalu besar. Maksimum 5MB');
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${studentId}-${Date.now()}.${fileExt}`;
  const filePath = fileName;

  const { error } = await supabase.storage
    .from('student-photos')
    .upload(filePath, file, { upsert: true });
  if (error) throw error;

  const { data: publicUrlData } = supabase.storage
    .from('student-photos')
    .getPublicUrl(filePath);
  return publicUrlData.publicUrl;
};

export const deleteStudentPhoto = async (photoUrl) => {
  if (!photoUrl || photoUrl.includes('via.placeholder.com')) return;
  const fileName = photoUrl.split('/').pop();
  const { error } = await supabase.storage
    .from('student-photos')
    .remove([fileName]);
  if (error) throw error;
};
