'use client';

import StudentsList from '../components/students-list';
import {SearchBar} from '../components/search-bar';
import AddStudentForm from '../components/add-student';

export default function Home() {
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
        <AddStudentForm />
      </div>

      <div className='pb-20'>
        <StudentsList />
      </div>
      
    </div>
  );
}
