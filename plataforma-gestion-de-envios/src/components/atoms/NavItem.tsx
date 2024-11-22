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
      <a href={link} style={{ margin: '0 15px', textDecoration: 'none', color: 'black' }} >
           <IconButton style={{ marginRight: '8px' }}>
        <Icon />
      </IconButton>
        {label}
      </a>
    );
  };

export default NavItem;