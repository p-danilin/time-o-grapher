import { useEffect, useRef, useState } from "react";

interface DotPlotProps {
  deviations: number[];
}

export default function DotPlot({ deviations }: DotPlotProps) {
  const intervalMs = 100;
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < deviations.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, intervalMs);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, deviations.length]);

  return (
    <div className="dotplot" ref={containerRef}>
      {deviations.slice(0, visibleCount).map((deviation, i) => {
        const isTick = i % 2 === 0;
        const maxDeviationMs = 0.02;
        const visualHeightPx = 80;
        const normalized = (deviation + maxDeviationMs) % (2 * maxDeviationMs);
        const wrappedDeviation =
          normalized < 0 ? normalized + 2 * maxDeviationMs : normalized;
        const yOffset =
          (wrappedDeviation / (2 * maxDeviationMs)) * visualHeightPx +
          (isTick ? 0 : 25);
        const xOffset = i * 2;

        return (
          <div
            key={i}
            className={`dot ${isTick ? "tick" : "tock"}`}
            style={{
              transform: `translate(${xOffset}px, ${yOffset}px)`,
            }}
          />
        );
      })}
    </div>
  );
}
