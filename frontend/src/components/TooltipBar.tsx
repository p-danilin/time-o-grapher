type TooltipMode = "menu" | "beatrate" | "liftangle" | "graph";

interface TooltipBarProps {
  mode: TooltipMode;
}

export default function TooltipBar({ mode }: TooltipBarProps) {
  if (mode === "graph") {
    return (
      <div className="tooltip-bar">
        <div className="tooltip">
          <span className="key">Esc.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="tooltip-bar">
      <div className="tooltip">
        <span className="key">⏎</span>
        <span className="label">Select</span>
      </div>
      {(mode === "beatrate" || mode === "liftangle") && (
        <div className="tooltip">
          <span className="key">↑</span>
          <span className="key">↓</span>
          <span className="label">Change</span>
        </div>
      )}
    </div>
  );
}
