'use client';

import { ChevronRight } from 'lucide-react'
import Link from 'next/link';


export default function StudentCard({ student }: { student: { id: string; name: string } }) {
  return (
    <Link href={`/students/${student.id}`}>
        <div className="flex bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold">{student.name}</h2>
            <ChevronRight className="ml-auto" />
        </div>
    </Link>
  );
}
