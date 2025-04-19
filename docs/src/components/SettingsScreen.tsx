import { useCallback, useEffect, useRef, useState } from "react";
import TooltipBar from "./TooltipBar";
import "../styles/Screen.scss";
import { beatRates, minLift, maxLift, liftStep } from "../constants.ts";

interface SettingsScreenProps {
  onStart: () => void;
  fileName: string | null;
  setFileName: (name: string | null) => void;
  beatRateIndex: number;
  setBeatRateIndex: (index: number) => void;
  liftAngle: number;
  setLiftAngle: (value: number) => void;
}

enum MenuOption {
  SelectFile = 0,
  BeatRate = 1,
  LiftAngle = 2,
  Start = 3,
}

type Mode = "menu" | "beatrate" | "liftangle";

export default function SettingsScreen({
  onStart,
  fileName,
  setFileName,
  beatRateIndex,
  setBeatRateIndex,
  liftAngle,
  setLiftAngle,
}: SettingsScreenProps) {
  const [selectedIndex, setSelectedIndex] = useState(MenuOption.SelectFile);
  const [mode, setMode] = useState<Mode>("menu");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (mode === "menu") {
        if (e.key === "ArrowUp") {
          setSelectedIndex((prev) => (prev === 0 ? 3 : prev - 1));
        } else if (e.key === "ArrowDown") {
          setSelectedIndex((prev) => (prev === 3 ? 0 : prev + 1));
        } else if (e.key === "Enter") {
          if (selectedIndex === MenuOption.SelectFile) {
            fileInputRef.current?.click();
          } else if (selectedIndex === MenuOption.Start) {
            onStart();
          } else if (selectedIndex === MenuOption.BeatRate) {
            setMode("beatrate");
          } else if (selectedIndex === MenuOption.LiftAngle) {
            setMode("liftangle");
          }
        } else if (["1", "2", "3", "4"].includes(e.key)) {
          setSelectedIndex(Number(e.key) - 1);
        }
      } else if (mode === "beatrate") {
        if (e.key === "ArrowUp") {
          const newIndex =
            beatRateIndex === 0 ? beatRates.length - 1 : beatRateIndex - 1;
          setBeatRateIndex(newIndex);
        } else if (e.key === "ArrowDown") {
          const newIndex =
            beatRateIndex === beatRates.length - 1 ? 0 : beatRateIndex + 1;
          setBeatRateIndex(newIndex);
        } else if (e.key === "Escape" || e.key === "Enter") {
          setMode("menu");
        }
      } else if (mode === "liftangle") {
        if (e.key === "ArrowUp") {
          setLiftAngle(Math.min(liftAngle + liftStep, maxLift));
        } else if (e.key === "ArrowDown") {
          setLiftAngle(Math.max(liftAngle - liftStep, minLift));
        } else if (e.key === "Escape" || e.key === "Enter") {
          setMode("menu");
        }
      }
    },
    [
      mode,
      selectedIndex,
      onStart,
      setBeatRateIndex,
      setLiftAngle,
      beatRateIndex,
      liftAngle,
    ]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const renderContent = (index: number) => {
    switch (index) {
      case MenuOption.SelectFile:
        return (
          <span className="file-name">{fileName ?? "No File Selected"}</span>
        );
      case MenuOption.BeatRate:
        return <>{beatRates[beatRateIndex]}</>;
      case MenuOption.LiftAngle:
        return <>{liftAngle.toFixed(1)}°</>;
      default:
        return null;
    }
  };

  return (
    <div className="screen">
      <div className="selections">
        <input
          ref={fileInputRef}
          type="file"
          accept=".wav"
          style={{ display: "none" }}
          onChange={handleFileChange}
          aria-hidden="true"
          tabIndex={-1}
        />

        {["Select Audio File", "Beat Rate", "Lift Angle", "Start"].map(
          (label, idx) => {
            const isSelected = selectedIndex === idx && mode === "menu";
            const isEditing =
              (mode === "beatrate" && idx === MenuOption.BeatRate) ||
              (mode === "liftangle" && idx === MenuOption.LiftAngle);

            return (
              <div key={idx} className={`line ${isSelected ? "selected" : ""}`}>
                <span className="highlight">
                  {idx + 1}. {label}:
                </span>{" "}
                <span className={isEditing ? "flash" : ""}>
                  {renderContent(idx)}
                </span>
              </div>
            );
          }
        )}
      </div>
      <TooltipBar mode={mode} />
    </div>
  );
}
