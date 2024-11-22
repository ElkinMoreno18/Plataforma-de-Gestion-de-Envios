// src/components/molecules/HeaderNav.tsx
import React, { useState, useEffect } from 'react';
import Logo from '../atoms/logo';
import axios from 'axios';
import SearchBar from '../atoms/SearchBar';
import NavItem from '../atoms/NavItem';
import { Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AppBarMenu from './AppBarMenu';
import RandomUser from '../atoms/RandomUser';


const HeaderNav = () => {
  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#FFFFFF', boxShadow: '0px 3px 6px #00000029' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
        <NavItem label="" link="#" icon={MenuOutlinedIcon} />
      <Logo />
      <Typography variant='body1' sx={{ fontSize: '14px', color: '#0000008A'}}>
        Tracking
      </Typography>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
      <RandomUser />
      <AppBarMenu />
      </div>
      
    </header>
  );
};

export default HeaderNav;
