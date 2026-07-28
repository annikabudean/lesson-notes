'use client';

import { ChevronRight } from 'lucide-react'
import Link from 'next/link';


export default function StudentInfo({ student }: { student: { id: string; name: string } }) {
  return (
    <div>
        {student.name}
    </div>
  );
}
