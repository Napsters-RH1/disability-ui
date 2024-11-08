"use client";

import Image from 'next/image';

export const Header = () => (
  <header className="w-full bg-blue-900 text-white p-4">
    <div className="max-w-6xl mx-auto flex items-center">
      <Image 
        src='/fedora.png' 
        alt="Red Hat Logo" 
        className="mr-4"
        width={75}
        height={75}
      />
      <h1 className="text-2xl font-bold">VA Disability Claims Assistant</h1>
    </div>
  </header>
);