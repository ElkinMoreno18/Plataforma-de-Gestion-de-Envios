import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Menu, MenuItem, IconButton } from '@mui/material';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';

const Terminales = () => {
  const [terminals, setTerminals] = useState<any[]>([]);  
  const [selectedTerminal, setSelectedTerminal] = useState<string>('01 BOG');  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);  

  // Cargar terminales desde la API
  useEffect(() => {
    const fetchTerminals = async () => {
      try {
        const response = await axios.get('https://apiv2-test.coordinadora.com/cm-maestros-territorios-ms/api/v1/terminales');
        const data = response.data.data;
        setTerminals(data);  
      } catch (error) {
        console.error('Error al cargar los terminales:', error);
      }
    };
    
    fetchTerminals();
  }, []);

  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (terminal: { codigo_terminal: number; abreviado: string }) => {
    setSelectedTerminal(`${terminal.codigo_terminal} - ${terminal.abreviado}`);
    setAnchorEl(null);  
  };

  return (
    <div>
      <Typography onClick={handleClick} variant="body1" sx={{ fontWeight: '400', fontSize: '14px', color: '##000000DE', display: 'flex', alignItems: 'center' }}>
        <strong>Terminal: </strong> <span style={{ color: '#00000099', marginLeft: '4px' }}> {selectedTerminal} </span>
        <IconButton >
          <ArrowDropDownOutlinedIcon sx={{ color: '#00000099' }}/>
        </IconButton>
      </Typography>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
            sx: {
              maxHeight: '206px',
              overflow: 'hidden', 
              paddingRight: '10px'
            },
          }}
        MenuListProps={{
            sx: {
              maxHeight: '200px',
              overflowY: 'auto',
              padding: '3px 0px',
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#00000026',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#00000036',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#00000014',
                margin: '5px 5px', 
                borderRadius: '4px',
              },
            },
          }}
      >
        {terminals.map((terminal) => (
          <MenuItem key={terminal.codigo_terminal} onClick={() => handleClose({ codigo_terminal: terminal.codigo_terminal, abreviado: terminal.abreviado })}>
            {terminal.codigo_terminal} - {terminal.abreviado}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default Terminales;
