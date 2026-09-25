'use client';

import { ChevronRight } from 'lucide-react'
import Link from 'next/link';
import {StudentAvatar} from './student-avatar';


export default function StudentCard({ student }: { student: { id: string; name: string } }) {
  return (
    <Link href={`/students/${student.id}`}>
        <div className="flex flex-col justify-center bg-white shadow-md rounded-lg p-4">

            <div className="flex items-center pb-4">
              <StudentAvatar name={student.name} />
              <div className="flex flex-col ml-4">
                <h2 className="text-xl font-semibold">{student.name}</h2>
                <h2>Violin</h2>
              </div>
            </div>

            <div>
              <h5>This is a random description of something the student is working on</h5>
            </div>
        </div>
    </Link>
  );
}
