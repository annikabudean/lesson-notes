'use client';

import { useEffect, useState } from 'react';
import { getStudents, type Student } from '../api/students';
import StudentsList from '../components/students-list';
import {SearchBar} from '../components/search-bar';
import AddStudentForm from '../components/add-student';

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(true);

  useEffect(() => {
    let isActive = true;

    async function fetchStudents() {
      try {
        const studentsData = await getStudents();
        if (isActive) setStudents(studentsData);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        if (isActive) setLoadingStudents(false);
      }
    }

    fetchStudents();
    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center font-mono text-black bg-[#FAF7F2]">
      
      <div className="border-b">
        <div className='text-5xl pt-20 pb-5'>
          Welcome back, Annika!
        </div>
      </div>

      <div className='pb-10 pt-5'>
        <SearchBar />
      </div>

       <div className='self-start pl-40'>
        <AddStudentForm
          onStudentCreated={(student) => {
            setStudents((currentStudents) => [student, ...currentStudents]);
          }}
        />
      </div>

      <div className='pb-20'>
        <StudentsList students={students} loading={loadingStudents} />
      </div>
      
    </div>
  );
}
