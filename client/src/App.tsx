import { useState } from "react";
import "./App.scss";
import { SettingsProvider } from "./context/SettingsContext";
import TopLeftContainer from "./containers/TopLeftContainer";
import TopRightContainer from "./containers/TopRightContainer";
import CenterContainer from "./containers/CenterContainer";
import BottomLeftContainer from "./containers/BottomLeftContainer";
import BottomRightContainer from "./containers/BottomRightContainer";

const App = () => {
  const [devMode] = useState(false);
  return (
    <SettingsProvider>
      <div className='grid grid-cols-2 gap-4 h-screen p-4'>
        <div className={devMode ? "outline-2 outline-offset-2 outline-blue-500" : ""}>
          <TopLeftContainer />
        </div>
        <div className={devMode ? "outline-2 outline-offset-2 outline-blue-500" : ""}>
          <TopRightContainer />
        </div>
        <div
          className={
            devMode ? "row-span-2 col-span-2 outline-2 outline-offset-2 outline-blue-500" : "row-span-2 col-span-2"
          }
        >
          <CenterContainer />
        </div>
        <div className={devMode ? "outline-2 outline-offset-2 outline-blue-500" : ""}>
          <BottomLeftContainer />
        </div>
        <div className={devMode ? "outline-2 outline-offset-2 outline-blue-500" : ""}>
          <BottomRightContainer />
        </div>
      </div>
    </SettingsProvider>
  );
};

export default App;
