import React, { useState } from "react";

const SearchBar = () => {
    const [query, setQuery] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    return (
        <input type="text" placeholder="Buscar guía..." value={query} onChange={handleChange} className="buscador">
        </input>
    )
}

export default SearchBar;