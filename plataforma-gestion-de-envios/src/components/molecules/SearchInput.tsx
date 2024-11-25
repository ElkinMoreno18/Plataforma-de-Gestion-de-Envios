import React, { useState } from "react";
import InputGuide from "../atoms/InputGuide";

interface SearchInputProps {
  onSearch: (query: string) => void; // Callback para realizar la búsqueda
  disabled?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, disabled = false }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // Validación: Solo números y 11 caracteres
    if (!/^\d*$/.test(value)) return;

    setQuery(value);
    setError(value.length < 11 ? "Número de Guía Incompleta" : "");
  };

  const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && query.length === 11) {
      onSearch(query);
    }
  };

  return (
    <InputGuide
      value={query}
      placeholder="Buscar número de guía..."
      errorMessage={error}
      disabled={disabled}
      maxLength={11}
      onChange={handleChange}
      onKeyDown={handleEnterKey}
    />
  );
};

export default SearchInput;
