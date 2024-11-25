import React from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { IconButton } from '@mui/material';

interface NavItemProps {
    label: string;
    link: string;
    icon: React.ElementType<SvgIconProps>;
}

const NavItem: React.FC<NavItemProps> = ({ label, link, icon: Icon }) => {
    return (
      <a href={link} style={{ fontSize: '12px', fontFamily:'Roboto', fontWeight: '500', textDecoration: 'none', color: '#00000099', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', rowGap: '11px' }} >
      <IconButton >
        <Icon />
      </IconButton>
        {label}
      </a>
    );
  };

export default NavItem;