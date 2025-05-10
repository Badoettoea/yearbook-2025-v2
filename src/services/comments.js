// File: src/services/comments.js
import supabase from '../supabase.js'

export const getPhotoComments = async (photoId) => {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('photo_id', photoId)
    .eq('action_type', 'comment')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const addComment = async (photoId, userId, comment) => {
  const { data, error } = await supabase
    .from('comments')
    .insert({
      photo_id: photoId,
      user_id: userId,
      action_type: 'comment',
      comment: comment
    })
    .select()

  if (error) throw error
  return data
}

export const toggleLike = async (photoId, userId) => {
  // Check if like exists
  const { data: existingLike, error: checkError } = await supabase
    .from('comments')
    .select('id')
    .eq('photo_id', photoId)
    .eq('user_id', userId)
    .eq('action_type', 'like')
    .single()

  if (checkError && checkError.code !== 'PGRST116') throw checkError

  if (existingLike) {
    // Unlike
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', existingLike.id)
    if (error) throw error
    return { action: 'unlike' }
  } else {
    // Like
    const { error } = await supabase
      .from('comments')
      .insert({
        photo_id: photoId,
        user_id: userId,
        action_type: 'like'
      })
    if (error) throw error
    return { action: 'like' }
  }
}

export const getPhotoStats = async (photoId) => {
  const { data, error } = await supabase
    .from('comments')
    .select('action_type')
    .eq('photo_id', photoId)

  if (error) throw error

  return {
    likes: data.filter(item => item.action_type === 'like').length,
    comments: data.filter(item => item.action_type === 'comment').length,
    shares: data.filter(item => item.action_type === 'share').length
  }
}
