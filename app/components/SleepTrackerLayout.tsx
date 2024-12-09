'use client';
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Moon, Bed, TrendingUp } from 'lucide-react';
import { SleepRecordTab } from './SleepRecordTab';
import { SleepStatsTab } from './SleepStatsTab';
import { SleepHistoryTab } from './SleepHistoryTab';
import { SleepRecord } from '../types/sleep';
import { TimeAndDateDisplay } from './TimeAndDateDisplay';

export const SleepTrackerLayout: React.FC = () => {
  const [sleepRecords, setSleepRecords] = useState<SleepRecord[]>([]);

  const addSleepRecord = (newRecord: SleepRecord) => {
    setSleepRecords(prev => [...prev, newRecord]);
  };

  const deleteSleepRecord = (index: number) => {
    setSleepRecords(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className='h-screen flex justify-center items-center'>
      <div 
        id='main'
        className="container mx-auto p-4 max-w-2xl border-2 border-teal-500 rounded-2xl relative"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 
          id='Sleep Tracker'
            className="text-2xl md:text-3xl font-bold flex items-center text-fuchsia-600"
            style={{
              filter: 'drop-shadow(0px 0px 2px #D946EF)',
            }}
          >
            <Moon 
              className="mr-3 text-slate-200 fill-slate-300/50" 
              style={{
                filter: 'drop-shadow(0px 0px 4px #000000)',
              }}
            /> 
            Sleep Tracker
          </h1>
          <TimeAndDateDisplay />
        </div>

        <Tabs defaultValue="record" className="w-full">
          <TabsList 
            className="grid w-full grid-cols-3 text-fuchsia-600"
            style={{
              filter: 'drop-shadow(0px 0px 4px #007FFF)',
            }}
          >
            <TabsTrigger value="record">
              <Bed className="mr-2 text-blue-400" /> Record Sleep
            </TabsTrigger>
            <TabsTrigger value="stats">
              <TrendingUp className="mr-2 text-blue-400" /> Sleep Stats
            </TabsTrigger>
            <TabsTrigger value="history">
              <Clock className="mr-2 text-blue-400" /> Sleep History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="record">
            <SleepRecordTab onAddSleepRecord={addSleepRecord} />
          </TabsContent>

          <TabsContent value="stats">
            <SleepStatsTab sleepRecords={sleepRecords} />
          </TabsContent>

          <TabsContent value="history">
            <SleepHistoryTab sleepRecords={sleepRecords} onDeleteRecord={deleteSleepRecord} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};