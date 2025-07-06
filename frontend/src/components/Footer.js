import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => (
  <Box
    sx={{
      width: '100%',
      py: 2,
      mt: 4,
      background: 'rgba(36, 40, 54, 0.95)',
      color: '#fff',
      textAlign: 'center',
      fontFamily: 'Inter, Arial, sans-serif',
      fontWeight: 500,
      fontSize: { xs: 13, sm: 15 },
      letterSpacing: 0.2,
      borderTop: '1.5px solid #23283a',
    }}
  >
    © {new Date().getFullYear()} Log Ingestion System &bull; Crafted with <span style={{color:'#a259f7',fontWeight:700}}>MUI</span>
  </Box>
);

export default Footer; 