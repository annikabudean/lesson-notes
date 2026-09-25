// app/students/[id]/page.tsx
import { getLessonNotes } from '@/api/lessons'
import { getStudentById } from '@/api/students'
import { notFound } from 'next/navigation'
import { StudentAvatar } from '@/components/student-avatar'
import Link from 'next/link'

export default async function StudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  let student
  try {
    student = await getStudentById(id)
  } catch {
    notFound()
  }

  const notes = await getLessonNotes(id) // already ordered newest-first from Supabase

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Link href="/" className="text-sm text-gray-500 hover:underline">
        ← Back
      </Link>

      <div className="flex items-center gap-4 mt-4">
        <StudentAvatar name={student.name} />
        <div>
          <h1 className="text-2xl font-bold">{student.name}</h1>
          <p className="text-gray-500">Grade {student.grade}</p>
        </div>
      </div>

      <div className="mt-6">
        {/* your AddLessonNoteForm component */}
      </div>

      <h2 className="text-lg font-semibold mt-8 mb-3">Lesson Notes</h2>

      {notes.length === 0 ? (
        <p className="text-gray-400">No lesson notes yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {notes.map((note) => (
            <div key={note.id} className="border rounded-lg p-4">
              <p className="text-xs text-gray-400 mb-1">
                {new Date(note.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
              <p className="text-sm">{note.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}