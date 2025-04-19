import { useState } from "react";

export function useSettings() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [beatRateIndex, setBeatRateIndex] = useState(0);
  const [liftAngle, setLiftAngle] = useState(52.0);

  return {
    fileName,
    setFileName,
    beatRateIndex,
    setBeatRateIndex,
    liftAngle,
    setLiftAngle,
  };
}
