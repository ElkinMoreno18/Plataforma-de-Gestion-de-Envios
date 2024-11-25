import React, { useState } from "react";
import { IconButton, InputBase } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface SearchBarProps {
  onToggleUsers: (isVisible: boolean) => void;
  onSaveGuideData: (guideData: any) => void; // Para guardar la información de la guía
}

const SearchBar: React.FC<SearchBarProps> = ({ onToggleUsers, onSaveGuideData }) => {
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && query.trim() !== "") {
      try {
        const response = await fetch(
          `https://apiv2-test.coordinadora.com/cm-consultar-guia-ms/guia/${query}`
        );

        if (!response.ok) {
          throw new Error("Error al consultar la guía.");
        }

        const data = await response.json();
        onSaveGuideData(data); // Guardar la información de la guía
        console.log("Datos de la guía:", data);
      } catch (error) {
        console.error("Error al realizar la consulta:", error);
      }
    }
  };

  const toggleSearch = () => {
    const newShowSearch = !showSearch;
    setShowSearch(newShowSearch);
    onToggleUsers(!newShowSearch);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
      <IconButton onClick={() => { setShowSearch(true); onToggleUsers(false); }}>
        <SearchOutlinedIcon />
      </IconButton>

      {showSearch && (
        <div style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #000000", padding: "0 8px", marginLeft: "8px", color:  '#0000008A'}}>
          <InputBase
            placeholder="Buscar número de guía"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            style={{ flex: 1 }}
          />
        </div>
      )}

      {showSearch && (
        <IconButton onClick={toggleSearch} style={{ marginLeft: "8px" }}>
          <CloseOutlinedIcon />
        </IconButton>
      )}
    </div>
  );
};

export default SearchBar;
