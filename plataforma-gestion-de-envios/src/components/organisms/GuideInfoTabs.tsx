import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface InfoTabsProps {
  guideData: any;
}

const GuideInfoTabs: React.FC<InfoTabsProps> = ({ guideData }) => {
  const { data } = guideData;
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const renderField = (title: string, value: string) => (
    <Grid item xs={3}>
      <Box display="flex" alignItems="center">
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", fontSize: "14px", mr: 1 }}
        >
          {title}
        </Typography>
        <Tooltip title="Copiar">
          <IconButton onClick={() => handleCopy(`${title} ${value}`)}>
            <ContentCopyIcon sx={{ color: '#326BB5', width: '13px', height: '13px' }}/>
          </IconButton>
        </Tooltip>
      </Box>
      <Typography
        variant="body2"
        sx={{ fontSize: "14px", textAlign: "left" }}
      >
        {value || "Sin información"}
      </Typography>
    </Grid>
  );

  return (
    <Box sx={{ width: "90%", margin: "0 auto", display: 'flex', flexDirection: 'column' }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{
          color: "#00000061",
          borderBottom: "1px solid #00000061",
          display: "inline-flex", 
        }}
      >
        <Tab
          sx={{
            textTransform: "capitalize",
            fontSize: "14px",
            letterSpacing: "1.25px",
            minWidth: "auto", 
            padding: "0 16px",
          }}
          label="Información General"
        />
        <Tab
          sx={{
            textTransform: "capitalize",
            fontSize: "14px",
            letterSpacing: "1.25px",
            minWidth: "auto",
            padding: "0 16px",
          }}
          label="Información de Facturación"
        />
        <Tab
          sx={{
            textTransform: "capitalize",
            fontSize: "14px",
            letterSpacing: "1.25px",
            minWidth: "auto",
            padding: "0 16px",
          }}
          label="Novedades y Soluciones"
        />
        <Tab
          sx={{
            textTransform: "capitalize",
            fontSize: "14px",
            letterSpacing: "1.25px",
            minWidth: "auto",
            padding: "0 16px",
          }}
          label="Información de Entrega"
        />
      </Tabs>
      <Box sx={{ mt: 2, px: 2 }}>
        {activeTab === 0 && (
          <Grid container spacing={2}>
            {renderField(
              "Cliente:",
              `Nit/Div: ${data?.cliente?.nit || ""} / ${data?.cliente?.div || ""} ${
                data?.cliente?.razon_social || "Sin información"
              }`
            )}
            {renderField("Remitente:", data?.remitente?.nombre || "Sin información")}
            {renderField("Destinatario:", data?.destinatario?.nombre || "Sin información")}
            {renderField("Terminal Origen:", data?.remitente?.zonificacion?.nombre_terminal || "Sin información")}

            {/* Fila 2 */}
            {renderField("Nivel/Servicio:", data?.servicio?.descripcion || "Sin información")}
            {renderField("Teléfono Remitente:", data?.remitente?.telefono || "Sin información")}
            {renderField("Teléfono Destinatario:", data?.destinatario?.telefono || "Sin información")}
            {renderField("Ciudad Origen:", data?.remitente?.zonificacion?.ciudad || "Sin información")}

            {/* Fila 3 */}
            {renderField("Observaciones:", data?.observaciones || "Sin información")}
            {renderField("Producto:", data?.producto?.abreviado_producto || "Sin información")}
            {renderField("Contenido:", data?.contenido || "Sin información")}
            {renderField("Referencia:", data?.referencia || "Sin información")}
          </Grid>
        )}
        {activeTab === 1 && (
          <Typography variant="body1">Sección de Información de Facturación</Typography>
        )}
        {activeTab === 2 && (
          <Typography variant="body1">Sección de Novedades y Soluciones</Typography>
        )}
        {activeTab === 3 && (
          <Typography variant="body1">Sección de Información de Entrega</Typography>
        )}
      </Box>
    </Box>
  );
};

export default GuideInfoTabs;
