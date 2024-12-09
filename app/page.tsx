'use client'
import { Stars } from '@/app/components/Stars';
import { SleepTrackerLayout } from './components/SleepTrackerLayout';

export default function home(){
  return (
    <>
      <Stars />
      <main className="min-h-screen relative">
        <div className="container mx-auto px-4 py-8">
          <div
            className="text-4xl font-bold text-center  text-white relative z-10"
            >

          </div>
           <SleepTrackerLayout/>
        </div>
      </main>
    </>
  )
};

