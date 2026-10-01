'use client';

import type { Student } from '../api/students';
import StudentCard from './student-card';

export default function StudentsList({
  students,
  loading,
}: {
  students: Student[]
  loading: boolean
}) {

  if (loading) return <p>Loading...</p>;

  return (
    <div className="">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 text-black px-40">
            {students.map((student) => (
                <StudentCard key={student.id} student={student} />
            ))}
        </ul>
    </div>
  );
}
