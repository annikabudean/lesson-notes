'use client';

import { useState, useEffect } from 'react';
import { getStudents, type Student } from '../api/students';
import StudentCard from './student-card';

export default function StudentsList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const studentsData = await getStudents();
        console.log('Fetched students:', studentsData);
        setStudents(studentsData);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

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
