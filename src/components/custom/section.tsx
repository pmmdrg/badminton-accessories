import { SectionProps } from '@/types/sectionProps';
import React from 'react';

export default function Section({ title, children, className }: SectionProps) {
  return (
    <section className={`py-8 px-4 md:px-8 ${className || ''}`}>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-2xl md:text-3xl font-semibold mb-6 border-l-4 border-rose-700 pl-3 text-gray-800'>
          {title}
        </h2>

        <div>{children}</div>
      </div>
    </section>
  );
}
