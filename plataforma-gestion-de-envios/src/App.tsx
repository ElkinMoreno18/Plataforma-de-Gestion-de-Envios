import React, { useState } from 'react';
import './App.css';
import Header from './components/organisms/Header';
import SearchPanel from './components/organisms/SearchPanel';
import "@fontsource/roboto";

function App() {
  const [guideNumbers, setGuideNumbers] = useState<string[] | null>(null);

  // Función para manejar la búsqueda de la guía
  const handleSearchGuide = (guides: string[]) => {
    console.log("Guías buscadas:", guides);
    setGuideNumbers(guides);
  };

  return (
    <div className="App">
      <Header />
      <div className='bodyApp'>
      <SearchPanel onSearchGuide={handleSearchGuide} />

      </div>
    </div>
  );
}

export default App;
