'use client';

import StudentsList from './components/students-list';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center font-mono text-black bg-neutral-300">
      <div className='text-5xl pt-20 pb-10'>Welcome back, Annika!</div>

      <div>
        <StudentsList />
      </div>
      
    </div>
  );
}
