'use client'

// app/students/[id]/page.tsx
import { getLessonNotes, type LessonNote } from '@/api/lessons'
import { getStudentById, type Student } from '@/api/students'
import { StudentAvatar } from '@/components/student-avatar'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { ArrowLeft, Plus } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default function StudentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [notes, setNotes] = useState<LessonNote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    async function loadStudent() {
      if (!id) return;

      setLoading(true);
      try {
        const [studentRes, notesRes] = await Promise.all([
          getStudentById(id),
          getLessonNotes(id),
        ]);
        if (isActive) {
          setStudent(studentRes);
          setNotes(notesRes);
        }
      } catch (error) {
        console.error('Error fetching student details:', error);
        if (isActive) {
          setStudent(null);
          setNotes([]);
        }
      } finally {
        if (isActive) setLoading(false);
      }
    }

    loadStudent();
    return () => {
      isActive = false;
    };
  }, [id]);

  return (
    <main className="min-h-screen w-full bg-[#FAF7F2] px-5 py-8 font-mono text-[#2B2924] sm:px-8 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 rounded-md text-sm text-[#6B6558] transition-colors hover:text-[#3A5A45] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3A5A45]"
        >
          <ArrowLeft aria-hidden="true" size={18} />
          <span>Back to students</span>
        </Link>

        <section className="rounded-2xl border border-[#DCD4C4] bg-[#F3EEE4] p-5 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              {student && <StudentAvatar name={student.name} />}
              <div className="min-w-0">
                {loading ? (
                  <p className="text-lg text-[#6B6558]">Loading student...</p>
                ) : student ? (
                  <>
                    <h1 className="break-words text-2xl font-semibold tracking-tight sm:text-3xl">
                      {student.name}
                    </h1>
                    <p className="mt-1 text-sm text-[#6B6558]">{student.instrument}</p>
                  </>
                ) : (
                  <h1 className="text-2xl font-semibold">Student not found</h1>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => window.alert('Adding lesson notes will be available soon.')}
              disabled={loading || !student}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#3A5A45] px-5 py-3 text-sm font-semibold text-[#FAF7F2] transition-colors hover:bg-[#2F4938] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3A5A45] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus aria-hidden="true" size={18} />
              Add lesson
            </button>
          </div>
        </section>

        <section className="mt-10" aria-labelledby="lesson-notes-heading">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6558]">
                Practice journal
              </p>
              <h2 id="lesson-notes-heading" className="mt-1 text-2xl font-semibold">
                Lesson notes
              </h2>
            </div>
            {!loading && notes.length > 0 && (
              <span className="text-sm text-[#6B6558]">
                {notes.length} {notes.length === 1 ? 'lesson' : 'lessons'}
              </span>
            )}
          </div>

          {loading ? (
            <p className="rounded-xl border border-dashed border-[#DCD4C4] px-6 py-10 text-center text-sm text-[#6B6558]">
              Loading lesson notes...
            </p>
          ) : notes.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#DCD4C4] bg-[#F3EEE4]/60 px-6 py-14 text-center">
              <p className="text-lg font-semibold">No lesson notes</p>
              <p className="mt-2 text-sm text-[#6B6558]">
                Lesson notes for this student will show up here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {notes.map((note) => (
                <article
                  key={note.id}
                  className="rounded-xl border border-[#DCD4C4] bg-white/75 p-5 shadow-sm sm:p-6"
                >
                  <time
                    dateTime={note.created_at}
                    className="text-sm font-semibold text-[#3A5A45]"
                  >
                    {formatDate(note.created_at)}
                  </time>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-[#2B2924]">
                    {note.notes}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}