'use client'

import { addLessonNote, type LessonNote } from '@/api/lessons'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { X } from 'lucide-react'

type AddLessonModalProps = {
  isOpen: boolean
  studentId: string
  onClose: () => void
  onLessonAdded: (lesson: LessonNote) => void
}

function getTodayDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function AddLessonModal({
  isOpen,
  studentId,
  onClose,
  onLessonAdded,
}: AddLessonModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [lessonDate, setLessonDate] = useState(getTodayDate)
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const lesson = await addLessonNote(studentId, notes.trim(), lessonDate)
      if (!lesson) {
        setError('The lesson could not be saved. Please try again.')
        return
      }

      onLessonAdded(lesson)
      setLessonDate(getTodayDate())
      setNotes('')
      onClose()
    } catch (submissionError) {
      console.error('Error creating lesson note:', submissionError)
      setError('The lesson could not be saved. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="add-lesson-title"
      onCancel={(event) => {
        event.preventDefault()
        if (!saving) onClose()
      }}
      className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-[#DCD4C4] bg-[#FAF7F2] p-0 text-[#2B2924] shadow-2xl backdrop:bg-[#1F1E1C]/45"
    >
      <div className="flex items-start justify-between gap-4 border-b border-[#DCD4C4] px-6 py-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6558]">
            Student journal
          </p>
          <h2 id="add-lesson-title" className="mt-1 text-xl font-semibold">
            Add lesson
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          disabled={saving}
          aria-label="Close dialog"
          className="rounded-md p-1 text-[#6B6558] transition-colors hover:bg-[#F3EEE4] hover:text-[#2B2924] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A5A45] disabled:opacity-50"
        >
          <X aria-hidden="true" size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
        <div>
          <label htmlFor="lesson-date" className="mb-2 block text-sm font-semibold">
            Lesson date
          </label>
          <input
            id="lesson-date"
            type="date"
            required
            value={lessonDate}
            onChange={(event) => setLessonDate(event.target.value)}
            disabled={saving}
            className="w-full rounded-lg border border-[#DCD4C4] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#3A5A45] focus:ring-2 focus:ring-[#3A5A45]/20 disabled:opacity-60"
          />
        </div>

        <div>
          <label htmlFor="lesson-notes" className="mb-2 block text-sm font-semibold">
            Notes
          </label>
          <textarea
            id="lesson-notes"
            rows={6}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            disabled={saving}
            placeholder="What did you work on in this lesson?"
            className="w-full resize-y rounded-lg border border-[#DCD4C4] bg-white px-3 py-2.5 text-sm leading-6 outline-none transition placeholder:text-[#8A8376] focus:border-[#3A5A45] focus:ring-2 focus:ring-[#3A5A45]/20 disabled:opacity-60"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-lg border border-[#DCD4C4] px-4 py-2.5 text-sm font-semibold text-[#6B6558] transition-colors hover:bg-[#F3EEE4] disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-[#3A5A45] px-5 py-2.5 text-sm font-semibold text-[#FAF7F2] transition-colors hover:bg-[#2F4938] disabled:cursor-wait disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save lesson'}
          </button>
        </div>
      </form>
    </dialog>
  )
}