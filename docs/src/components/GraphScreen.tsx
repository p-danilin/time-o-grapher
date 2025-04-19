import { useEffect } from "react";
import TooltipBar from "./TooltipBar";
import "../styles/Graph.scss";
import DotPlot from "./DotPlot";
import { mockDeviations } from "../constants";

interface GraphScreenProps {
  onBack: () => void;
  fileName: string | null;
  beatRate: string | number;
  liftAngle: number;
}

export default function GraphScreen({
  onBack,
  fileName,
  beatRate,
  liftAngle,
}: GraphScreenProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onBack();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onBack]);

  return (
    <div className="screen">
      <div className="stats-bar">
        <div className="stats-bar-top">
          <div>INPUT:</div>
          <div>RATE:</div>
          <div>AMP:</div>
          <div>BE:</div>
          <div>LIFT:</div>
          <div>BEAT:</div>
        </div>
        <div className="stats-bar-bottom">
          <div>{fileName ?? "—"}</div>
          <div>+10s/d</div>
          <div>260°</div>
          <div>0.5ms</div>
          <div>{liftAngle.toFixed(1)}°</div>
          <div>{beatRate}</div>
        </div>
      </div>
      <div className="graph-area">
        <div className="graph-area">
          <DotPlot deviations={mockDeviations} />
        </div>
      </div>

      <TooltipBar mode="graph" />
    </div>
  );
}
