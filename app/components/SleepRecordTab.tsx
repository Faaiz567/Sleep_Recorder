import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play, StopCircle, CloudMoon, CloudSun  } from "lucide-react";
import { SleepRecord } from "../types/sleep";

interface SleepRecordTabProps {
  onAddSleepRecord: (record: SleepRecord) => void;
}

export const SleepRecordTab: React.FC<SleepRecordTabProps> = ({
  onAddSleepRecord,
}) => {
  const [isSleeping, setIsSleeping] = useState(false);
  const [sleepStartTime, setSleepStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [sleepQuality, setSleepQuality] = useState(3);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isSleeping) {
      intervalId = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isSleeping]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartSleep = () => {
    const startTime = new Date();
    setSleepStartTime(startTime);
    setIsSleeping(true);
    setElapsedTime(0);
  };

  const handleStopSleep = () => {
    if (sleepStartTime) {
      const endTime = new Date();
      const duration = elapsedTime / 3600; // convert seconds to hours

      const newRecord: SleepRecord = {
        date: sleepStartTime.toISOString().split("T")[0],
        sleepTime: sleepStartTime.toISOString(),
        wakeTime: endTime.toISOString(),
        sleepQuality: sleepQuality,
        duration: Number(duration.toFixed(2)),
      };

      onAddSleepRecord(newRecord);

      // Reset sleep tracking
      setIsSleeping(false);
      setSleepStartTime(null);
      setElapsedTime(0);
    }
  };

  return (
    <Card className="">
      <CardHeader className="flex flex-row rounded-t-xl justify-center bg-gray-900/50 ">
        <CardTitle className="pr-2 text-xl text-fuchsia-600 font-bold"
        style={{
          filter: 'drop-shadow(0px 0px 4px #D946EF)',
        }}
        >
          Sleep Tracking
        </CardTitle>

        {isSleeping ? (
          <CloudMoon className="text-yellow-500  w-8 h-8 animate-pulse " 
          style={{
            filter: 'drop-shadow(0px 0px 4px #00FFFF)',
          }}
          />
        ) : (
          <CloudSun className="text-yellow-500 w-8 h-8 animate-bounce" 
          style={{
            filter: 'drop-shadow(0px 0px 4px #FF5F1F)',
          }}
          />
        )}

      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {!isSleeping ? (
            <>
              <div className="">
                <Label className="text-fuchsia-500"
                style={{
                  filter: 'drop-shadow(0px 0px 4px #D946EF)',
                }}
                >Sleep Quality</Label>
                
                <Select
                  value={sleepQuality.toString()}
                  onValueChange={(value) => setSleepQuality(Number(value))}
                >
                  <SelectTrigger className="text-fuchsia-500 rounded-xl"
                  >
                    <SelectValue placeholder="Select Quality " />
                  </SelectTrigger>
                  <SelectContent 
                  className="text-fuchsia-500 font-bold text-xl bg-gray-900/50 backdrop-blur-md rounded-xl">
                    {[1, 2, 3].map((quality) => (
                      <SelectItem key={quality} value={quality.toString()}>
                        {quality} -{" "}
                        {quality === 1
                          ? "Very Poor"
                          : quality === 3
                          ? "Excellent"
                          : "Average"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleStartSleep}
                className="w-full text-lime-500 rounded-xl border-2 border-lime-400 hover:bg-lime-300 hover:text-fuchsia-500 hover:font-bold "
                style={{
                  filter: 'drop-shadow(0px 0px 4px #56c70a)',
                }}
              >
                <Play className="mr-2" /> Start Sleep Record
              </Button>
            </>
          ) : (
            <>
              <div className="text-center ">
                <h2 className="text-2xl font-bold mb-4 text-violet-500"
                style={{
                  filter: 'drop-shadow(0px 0px 4px #D946EF)',
                }}
                >Sleeping</h2>
                <div className="text-4xl font-medium mb-6 text-violet-500 animate-pulse"
                style={{
                  filter: 'drop-shadow(0px 0px 4px #000000)',
                }}>
                  {formatTime(elapsedTime)}
                </div>
                <Progress
                  value={(elapsedTime % 3600) / 36}
                  className="w-full mb-4 bg-slate-200 "
                  style={{
                  filter: 'drop-shadow(0px 0px 4px #000000)',
                }}
                />
                <Button
                  onClick={handleStopSleep}
                  className="w-full bg-violet-700/50 text-neutral-300 hover:bg-violet-900 rounded-xl"
                  style={{
                    filter: 'drop-shadow(0px 0px 4px #000000)',
                  }}
                >
                  <StopCircle className="mr-2" /> Stop Sleep Record
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
