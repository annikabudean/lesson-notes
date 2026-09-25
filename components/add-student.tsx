// components/AddStudentForm.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createStudent } from '../api/students'

export default function AddStudentForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await createStudent({ name })
      setName('')
      router.refresh() // re-fetches server data so the new student shows up
    } catch (err) {
      setError('Failed to add student. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border rounded-lg p-2 flex-1"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Student'}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  )
}