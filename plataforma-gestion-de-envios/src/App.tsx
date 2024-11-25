import React, { useState } from "react";
import "./App.css";
import "@fontsource/roboto";
import Header from "./components/organisms/Header";
import SearchPanel from "./components/organisms/SearchPanel";
import GuideInfoPage from "./components/templates/GuideInfoPage";


function App() {
  const [currentScreen, setCurrentScreen] = useState<"search" | "info">("search");
  const [guideNumbers, setGuideNumbers] = useState<string[]>([]); 

  const handleSearchGuide = (data: any[]) => {
    setGuideNumbers(data); // Guardamos los números de guía
    setCurrentScreen("info"); 

  };

  return (
    <div className="App">
      <Header />
      <div className="bodyApp">
        {currentScreen === "search" && (
          <SearchPanel onSearchGuide={handleSearchGuide} />
        )}
        {currentScreen === "info" && (
          <GuideInfoPage guideNumbers={guideNumbers} />
        )}
      </div>
    </div>
  );
}

export default App;
