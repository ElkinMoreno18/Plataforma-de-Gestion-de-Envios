import React, { useState, MouseEvent } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import AssignmentReturnOutlinedIcon from '@mui/icons-material/AssignmentReturnOutlined';
import MergeTypeOutlinedIcon from '@mui/icons-material/MergeTypeOutlined';
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import NavItem from '../atoms/NavItem';


const AppBarMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // Abre el menú
  };

  const handleClose = () => {
    setAnchorEl(null); // Cierra el menú
  };

  return (
    <div>
      {/* IconButton que despliega el menú */}
      <IconButton onClick={handleClick} color="inherit">
        <AppsOutlinedIcon />
      </IconButton>

      {/* El menú se despliega debajo del IconButton */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom', // Posición vertical del menú
          horizontal: 'left', // Posición horizontal del menú
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {/* Aquí se añaden los NavItem */}
        <NavItem label="Hub" link="/" icon={AssignmentReturnOutlinedIcon} />
        <NavItem label="Etiqueta consolidadora" link="/" icon={MergeTypeOutlinedIcon} />
        <NavItem label="Control de muelles" link="/" icon={SwapVertOutlinedIcon} />
        <NavItem label="Inconsistencias Checkpoint" link="/" icon={AnnouncementOutlinedIcon} />
        <NavItem label="Guías en proceso" link="/" icon={AnnouncementOutlinedIcon} />
        <NavItem label="Recogida" link="/" icon={AnnouncementOutlinedIcon} />
        <NavItem label="Reparto" link="/" icon={AnnouncementOutlinedIcon} />
        <NavItem label="NyS" link="/" icon={FindInPageOutlinedIcon} />
        <NavItem label="Configuración" link="/" icon={SettingsOutlinedIcon} />
        <NavItem label="Tracking" link="/" icon={ManageSearchOutlinedIcon} />
        <NavItem label="Acuerdos" link="/" icon={HandshakeOutlinedIcon} />
      </Menu>
    </div>
  );
};

export default AppBarMenu;
