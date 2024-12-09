import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SleepRecord } from '../types/sleep';

interface SleepStatsTabProps {
  sleepRecords: SleepRecord[];
}

export const SleepStatsTab: React.FC<SleepStatsTabProps> = ({ sleepRecords }) => {
  const calculateAverages = () => {
    const totalDuration = sleepRecords.reduce((sum, record) => sum + record.duration, 0);
    const avgDuration = totalDuration / sleepRecords.length || 0;
    const avgQuality = sleepRecords.reduce((sum, record) => sum + record.sleepQuality, 0) / sleepRecords.length || 0;

    return { avgDuration, avgQuality };
  };

  const { avgDuration, avgQuality } = calculateAverages();

  const formatDuration = (duration: number) => {
    const hours = Math.floor(duration);
    const minutes = Math.round((duration - hours) * 60);
    return `${hours}h ${minutes}m`;
  };

  const formattedRecords = sleepRecords.map(record => ({
    ...record,
    formattedDuration: formatDuration(record.duration)
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sleep Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Sleep Duration Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={formattedRecords}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis 
                  label={{ value: 'Duration', angle: -90, position: 'insideLeft' }} 
                  tickFormatter={(value) => formatDuration(value)}
                />
                <Tooltip 
                  formatter={(value, name) => [formatDuration(value as number), 'Duration']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Legend />
                <Line type="monotone" dataKey="duration" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div>
            <Card className="bg-blue-50">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Sleep Duration</p>
                    <p className="text-2xl font-bold">{formatDuration(avgDuration)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Sleep Quality</p>
                    <p className="text-2xl font-bold">{avgQuality.toFixed(1)}/5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

