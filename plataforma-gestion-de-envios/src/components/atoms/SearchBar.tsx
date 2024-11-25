import React, { useState } from "react";
import { IconButton, InputBase } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface SearchBarProps {
    onToggleUsers: (isVisible: boolean) => void; 
  }

  const SearchBar: React.FC<SearchBarProps> = ({ onToggleUsers }) => {
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
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
        <div style={{ display: "flex", alignItems: "center", border: "1px solid #ccc", borderRadius: "4px", padding: "0 8px", marginLeft: "8px" }}>
          <InputBase
            placeholder="Buscar número de guía..."
            value={query}
            onChange={handleChange}
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
