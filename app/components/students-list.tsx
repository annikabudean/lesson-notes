'use client';

import { useState, useEffect } from 'react';
import { getStudents } from '../../api/students';
import StudentCard from './student-card';

export default function StudentsList() {
  const [students, setStudents] = useState([]);
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
        <ul className="flex flex-col gap-2 text-black">
            {students.map((student) => (
                <StudentCard key={student.id} student={student} />
            ))}
        </ul>
    </div>
  );
}
