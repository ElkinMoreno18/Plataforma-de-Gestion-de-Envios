import React from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const SearchBarGuide = ({ value, onChange, onSearch }: any) => (
  <Box display="flex" alignItems="center" mb={2} sx={{ border: "1px solid #ccc", borderRadius: "8px", padding: "4px" }}>
    <InputBase
      placeholder="Ingrese número de guía"
      value={value}
      onChange={onChange}
      onKeyDown={(e: any) => e.key === "Enter" && onSearch()}
      sx={{ flex: 1, padding: "4px" }}
    />
    <IconButton onClick={onSearch}>
      <SearchOutlinedIcon />
    </IconButton>
  </Box>
);

export default SearchBarGuide;
