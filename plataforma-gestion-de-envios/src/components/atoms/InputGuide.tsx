import React from "react";
import { InputBase, InputBaseProps, Typography } from "@mui/material";

interface InputGuideProps extends InputBaseProps {
  errorMessage?: string; // Mensaje de error opcional
  maxLength?: number; // Agregamos esta propiedad
}

const InputGuide: React.FC<InputGuideProps> = ({ errorMessage, ...props }) => {
  return (
    <div style={{ width: "100%" }}>
      <InputBase
        {...props}
        style={{
          width: "100%",
          padding: "8px 12px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          ...props.style, // Permite personalización adicional desde fuera
        }}
      />
      {errorMessage && (
        <Typography variant="caption" color="error" style={{ marginTop: "4px", display: "block" }}>
          {errorMessage}
        </Typography>
      )}
    </div>
  );
};

export default InputGuide;
