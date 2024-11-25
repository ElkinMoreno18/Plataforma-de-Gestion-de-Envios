import React, { useState } from "react";
import { Typography, InputBase, IconButton, Link, Tooltip } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BarcodeIcon from "../../assets/icons/barcodeScanner.svg";

interface SearchPanelProps {
  onSearchGuide: (guideNumbers: string[]) => void;
}

const SearchPanel: React.FC<SearchPanelProps> = ({ onSearchGuide }) => {
  const [activeButton, setActiveButton] = useState<"guia" | "etiqueta" | "multiple">("guia");
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (!/^\d*$/.test(value)) return; // Solo números
    if (value.length > 11) return; // No permite más de 11 caracteres

    setQuery(value);
    setError(value.length === 11 ? "" : "Número de Guía Incompleta");
  };

  const handleMultipleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    if (value.endsWith(",") && value.length > 1 && !/^\d*$/.test(value.slice(0, -1))) {
      value = value.slice(0, -1);
    }

    if (!/^\d*$/.test(value[value.length - 1]) && value[value.length - 1] !== ",") return;

    if (value.length % 12 === 11 && value[value.length - 1] !== ",") {
      value = value + ","; // Añadir coma después de 11 caracteres
    }

    const groups = value.split(",");
    const validGroups = groups.map(group => group.slice(0, 11));
    const updatedValue = validGroups.join(",");

    setQuery(updatedValue);

    const guides = updatedValue.split(",").filter((g) => g.length > 0);
    const isInvalid = guides.some((g) => g.length !== 11);
    setError(isInvalid ? "Formato de la guía inválido" : "");
  };

  const handleSearch = async () => {
    if (query.length !== 11 || error) {
      setError("Número de Guía Incompleta o inválida");
      return;
    }
  
    try {
      const response = await fetch(`https://apiv2-test.coordinadora.com/cm-consultar-guia-ms/guia/${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
  
      if (data.isError) {
        setError("Error: No se encontró información para este número de guía");
      } else {
        setError("");
        onSearchGuide([data]); // Aquí estamos pasando todos los datos obtenidos
      }
    } catch (err) {
      setError("Error en la conexión con el servidor");
    }
  };
  

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className="recuadroSearch"
      style={{
        textAlign: "center",
        padding: "24px",
        width: "504px",
        margin: "auto",
      }}
    >
      {activeButton !== "multiple" && (
        <>
          <Typography
            variant="h6"
            sx={{
              marginBottom: "16px",
              color: "#0A6BB6",
              fontWeight: "Medium",
              fontFamily: "Roboto",
              fontSize: "18px",
            }}
          >
            Selecciona la consulta que quieres realizar
          </Typography>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", columnGap: "20px" }}>
            <button
              onClick={() => setActiveButton("guia")}
              style={{
                padding: "10px 20px",
                borderRadius: "50px",
                backgroundColor: activeButton === "guia" ? "#0A6BB6" : "#F2F2F2",
                color: activeButton === "guia" ? "#fff" : "#6F6F6F",
                border: "none",
                cursor: "pointer",
              }}
            >
              Guías
            </button>
            <button
              onClick={() => setActiveButton("etiqueta")}
              style={{
                padding: "10px 20px",
                borderRadius: "50px",
                backgroundColor: activeButton === "etiqueta" ? "#0A6BB6" : "#F2F2F2",
                color: activeButton === "etiqueta" ? "#fff" : "#6F6F6F",
                border: "none",
                cursor: "pointer",
              }}
            >
              <img src={BarcodeIcon} alt="Barcode Scan" /> Etiqueta
            </button>
          </div>
          <InputBase
            placeholder="Buscar número de guía..."
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={activeButton === "etiqueta"}
            style={{
              width: "224px",
              padding: "8px 12px",
              borderRadius: "50px",
              marginBottom: "8px",
              backgroundColor: "#0000000D",
              fontSize: "12px",
              color: "#000000DE",
            }}
          />

          {error && <Typography variant="caption" color="error">{error}</Typography>}
          <div style={{ marginTop: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Link
                href="#"
                underline="hover"
                onClick={() => setActiveButton("multiple")}
                sx={{ color: "#00ADEE", fontWeight: "light" }}
              >
                Buscar múltiples guías
              </Link>
              <EastOutlinedIcon style={{ marginLeft: "8px", color: "#00ADEE" }} />
            </div>
          </div>
        </>
      )}
      {activeButton === "multiple" && (
        <>
          <Typography
            variant="h6"
            sx={{
              marginBottom: "16px",
              color: "#0A6BB6",
              fontWeight: "Medium",
              fontFamily: "Roboto",
              fontSize: "18px",
            }}
          >
            Consulta de múltiples guías
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: "8px" }}>
            Se pueden consultar 6 guías a la vez, separadas por una coma (,)
          </Typography>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
            <Tooltip title="Presione para conocer como realizar búsquedas">
              <IconButton>
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
            <InputBase
              placeholder="Buscar números de guías..."
              value={query}
              onChange={handleMultipleInputChange}
              style={{
                width: "224px",
                padding: "8px 12px",
                borderRadius: "50px",
                marginBottom: "8px",
                backgroundColor: "#0000000D",
                fontSize: "12px",
                color: "#000000DE",
              }}
              startAdornment={<SearchOutlinedIcon />}
            />
          </div>
          {error && <Typography variant="caption" color="error">{error}</Typography>}
          <Typography
            variant="body2"
            sx={{
              color: "#00ADEE",
              cursor: "pointer",
              marginTop: "16px",
              textDecoration: "underline",
            }}
            onClick={() => {
              setActiveButton("guia");
              setQuery("");
              setError("");
            }}
          >
            Buscar una guía
            <EastOutlinedIcon style={{ marginLeft: "8px", color: "#00ADEE" }} />
          </Typography>
        </>
      )}
    </div>
  );
};

export default SearchPanel;
