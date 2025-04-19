import { useState } from "react";
import "./styles/App.scss";
import SettingsScreen from "./components/SettingsScreen";
import GraphScreen from "./components/GraphScreen";
import { beatRates } from "./constants";
import { useSettings } from "./hooks/useSettings";

function App() {
  const [screen, setScreen] = useState<"settings" | "graph">("settings");
  const {
    fileName,
    setFileName,
    beatRateIndex,
    setBeatRateIndex,
    liftAngle,
    setLiftAngle,
  } = useSettings();

  return (
    <div className="terminal-window">
      {screen === "settings" ? (
        <SettingsScreen
          onStart={() => setScreen("graph")}
          fileName={fileName}
          setFileName={setFileName}
          beatRateIndex={beatRateIndex}
          setBeatRateIndex={setBeatRateIndex}
          liftAngle={liftAngle}
          setLiftAngle={setLiftAngle}
        />
      ) : (
        <GraphScreen
          onBack={() => setScreen("settings")}
          fileName={fileName}
          beatRate={beatRates[beatRateIndex]}
          liftAngle={liftAngle}
        />
      )}
    </div>
  );
}

export default App;
