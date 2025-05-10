import React, { useState } from 'react'
import { uploadStudentPhoto } from '../utils/storage'

const StudentPhotoUploader = ({ studentId, onUploadSuccess }) => {
  const [dragging, setDragging] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    await handleUpload(file)
  }

  const handleDrop = async (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (!file) return
    await handleUpload(file)
  }

  const handleUpload = async (file) => {
    setError(null)
    setUploading(true)
    try {
      const publicUrl = await uploadStudentPhoto(studentId, file)
      setPreviewUrl(publicUrl)
      onUploadSuccess?.(publicUrl)
    } catch (err) {
      console.error(err)
      setError('Upload gagal. Pastikan file valid dan koneksi stabil.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setDragging(true)}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`border-2 border-dashed p-4 rounded-xl text-center cursor-pointer transition-all ${
        dragging ? 'bg-blue-100' : 'bg-white'
      }`}
    >
      <p className="mb-2 text-sm text-gray-600">
        {uploading ? 'Mengunggah...' : 'Tarik file ke sini atau klik untuk pilih'}
      </p>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="photoUpload"
        onChange={handleFileChange}
      />
      <label htmlFor="photoUpload" className="text-blue-500 underline cursor-pointer">
        Pilih Foto
      </label>

      {previewUrl && (
        <div className="mt-4">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-full mx-auto shadow"
          />
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  )
}

export default StudentPhotoUploader
