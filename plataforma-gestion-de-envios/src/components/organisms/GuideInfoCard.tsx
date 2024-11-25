import React from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import GuideInfoTimeline from './GuideInfoTimeline';


interface GuideInfoCardProps {
  guideData: any;
  onCopy: () => void;
}

const GuideInfoCard: React.FC<GuideInfoCardProps> = React.memo(({ guideData, onCopy }) => {

  const { data } = guideData;

  return (
    <Box
      sx={{
        width: '90%',
        margin: '0 auto'
      }}
    >
      <Box display="flex" justifyContent="flex-start" alignItems="center" mb={2}>
        <Typography variant="h6" sx={{ color: '#086BB5', fontSize: '24px' }}>Información General de Envío</Typography>
        <IconButton onClick={onCopy}>
          <SearchOutlinedIcon />
        </IconButton>
      </Box>

      {/* Guía número y servicio */}
      <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection='row'>
        <Box display="flex" justifyContent="space-between" alignItems="stretch" flexDirection='column' width='90%'> 
          <Box display="flex" justifyContent="space-between" alignItems="center" >
            <Box>
              <Typography variant="body1" sx={{ color: '#086BB5', fontSize: '18px' }}>
                Guía nivel {data?.servicio?.nivel_servicio || "N/A"}:
                <span style={{ color: '#212121', fontSize: '18px', fontWeight: 'Medium' }}> {data?.guia || "N/A"}</span>
                <IconButton onClick={onCopy}>
                  <InsertLinkOutlinedIcon sx={{ color: '#0A6BB6' }} fontSize="small" />
                </IconButton>
              </Typography>
            </Box>
            <Typography variant="body1"><strong>Macroestado:</strong> <span style={{ color: '#00000099' }}>Abierta</span></Typography>
          </Box>

          {/* Unidades y estado de tracking */}
          <Box display="flex" justifyContent="space-between" alignItems="center" >
            <Typography variant="body1" sx={{ color: '#086BB5', fontSize: '18px' }}>Unidades: <span style={{ color: '#212121', fontSize: '18px' }}> {data?.unidades?.length || 0}</span></Typography>
            <Typography variant="body1">
              <strong> Estado Tracking Guía: </strong><span style={{ color: '#00000099' }}>{data?.unidades?.[0]?.ultimo_estado_tracking?.nombre || "N/A"}</span>
            </Typography>
          </Box>



        </Box>
        <Button variant="contained" sx={{ color: '#FFFFFF', height: '36px', backgroundColor: '#086BB5', fontSize: '12px', borderRadius: '20px', marginLeft: '20px', textTransform: 'capitalize', letterSpacing: '1.07px' }}>Ver Guía Digital</Button>

      </Box>

    </Box>



  );
});

export default GuideInfoCard;
