import React, { useState, MouseEvent } from 'react';
import { IconButton, Menu, Grid } from '@mui/material';
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
    setAnchorEl(event.currentTarget); 
  };

  const handleClose = () => {
    setAnchorEl(null); 
  };

  return (
    <div>
      <IconButton onClick={handleClick} color="inherit">
        <AppsOutlinedIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom', 
          horizontal: 'left', 
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: { marginTop: '25px', padding: '30px', width: '328px', height: '415px',  backgroundColor: '#FFF', boxShadow: '0px 19px 38px #00000029', borderRadius: '4px' }, // Ajusta tamaño del menú
        }}
      >
        <Grid container spacing={2} sx={{ height: '415px'}}>
          <Grid item xs={4}>
            <NavItem label="Hub" link="/" icon={AssignmentReturnOutlinedIcon} />
          </Grid>
          <Grid item xs={4}>
            <NavItem label="Etiqueta consolidadora" link="/" icon={MergeTypeOutlinedIcon} />
          </Grid>
          <Grid item xs={4}>
            <NavItem label="Control de muelles" link="/" icon={SwapVertOutlinedIcon} />
          </Grid>
          <Grid item xs={4}>
            <NavItem label="Inconsistencias Checkpoint" link="/" icon={AnnouncementOutlinedIcon} />
          </Grid>
          <Grid item xs={4}>
            <NavItem label="Guías en proceso" link="/" icon={AnnouncementOutlinedIcon} />
          </Grid>
          <Grid item xs={4}>
            <NavItem label="Recogida" link="/" icon={AnnouncementOutlinedIcon} />
          </Grid>
          <Grid item xs={4}>
            <NavItem label="Reparto" link="/" icon={AnnouncementOutlinedIcon} />
          </Grid>
          <Grid item xs={4}>
            <NavItem label="NyS" link="/" icon={FindInPageOutlinedIcon} />
          </Grid>
          <Grid item xs={4}>
            <NavItem label="Configuración" link="/" icon={SettingsOutlinedIcon} />
          </Grid>
          <Grid item xs={4}>
            <NavItem label="Tracking" link="/" icon={ManageSearchOutlinedIcon} />
          </Grid>
          <Grid item xs={4}>
            <NavItem label="Acuerdos" link="/" icon={HandshakeOutlinedIcon} />
          </Grid>
        </Grid>
      </Menu>
    </div>
  );
};

export default AppBarMenu;
