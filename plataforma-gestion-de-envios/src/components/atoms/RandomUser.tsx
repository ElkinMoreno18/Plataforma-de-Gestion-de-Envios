// src/components/atoms/RandomUser.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';

const RandomUser = () => {
  const [user, setUser] = useState<{ name: string; picture: string } | null>(null);

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

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Typography id="usuario" variant="body1" sx={{ fontSize: '14px', color: '#0000008A' }}>
        {user ? user.name : 'Cargando...'}
      </Typography>
      {user && <img src={user.picture} alt="user" style={{ borderRadius: '50%', marginRight: '8px' }} />}

    </div>
  );
};

export default RandomUser;
