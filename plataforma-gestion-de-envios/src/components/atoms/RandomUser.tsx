import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Menu, MenuItem, IconButton } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import Terminales from './Terminales';

interface UsersProps {
  isVisible: boolean;
}

const RandomUser: React.FC<UsersProps> = ({ isVisible }) => {
  const [user, setUser] = useState<{ name: string; picture: string } | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/');
        const data = response.data.results[0];

        setUser({
          name: data.name.first + ' ' + data.name.last,
          picture: data.picture.thumbnail,
        });
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };

    fetchUser();
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // Abrir el menú
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Cerrar el menú
  };

  return (
    <div id="users" style={{ alignItems: 'center', flexDirection: 'row', display: isVisible ? 'flex' : 'none' }}>
      <div>
        <Typography id="user" variant="body1" sx={{ fontSize: '14px', color: '#086BB5', fontWeight: '500' }}>
          {user ? user.name : 'Cargando...'}
        </Typography>
        <Terminales />
      </div>
      {user && (
        <img
          src={user.picture}
          alt="user"
          style={{ borderRadius: '50%', marginRight: '8px', cursor: 'pointer' }}
          onClick={handleMenuOpen}
        />
      )}

      {/* Menú desplegable */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: { width: '200px', height: '240px',  backgroundColor: '#FFF', boxShadow: '0px 19px 38px #00000029', borderRadius: '4px' }, // Ajusta tamaño del menú
        }}
      >
        <MenuItem onClick={handleMenuClose} sx={{ display: 'flex', alignItems: 'center', gap: 1, height: '56px', width: '100%' }}>
          <PersonOutlineOutlinedIcon />
          Mi cuenta
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ display: 'flex', alignItems: 'center', gap: 1, height: '56px', width: '100%' }}>
          <ExitToAppOutlinedIcon sx={{ transform: 'rotate(180deg)'}} />
          Cerrar sesión
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ display: 'flex', alignItems: 'center', gap: 1, height: '56px', width: '100%' }}>
          <ContactSupportOutlinedIcon />
          Soporte
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ display: 'flex', alignItems: 'center', gap: 1, height: '56px', width: '100%' }}>
          <LocalPrintshopOutlinedIcon />
          Impresoras
        </MenuItem>
      </Menu>
    </div>
  );
};

export default RandomUser;
