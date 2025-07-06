import React, { useState } from 'react';
import LogViewer from './components/LogViewer';
import LogIngestorModal from './components/LogIngestor';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import '@fontsource/inter';

import Avatar from '@mui/material/Avatar';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#a259f7',
    },
    secondary: {
      main: '#43e7ad',
    },
    background: {
      default: '#181c24',
      paper: '#23283a',
    },
    error: {
      main: '#ff4c6d',
    },
    warning: {
      main: '#ffb547',
    },
    info: {
      main: '#4fc3f7',
    },
    success: {
      main: '#43e7ad',
    },
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    fontWeightBold: 700,
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    'none',
    '0px 2px 8px 0px rgba(162,89,247,0.15)',
    ...Array(23).fill('0px 4px 24px 0px rgba(67,231,173,0.10)')
  ],
});

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', width: '100vw', bgcolor: '#181c24', pb: 0 }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            background: '#181c24',
            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
            border: 'none',
            px: { xs: 1, sm: 3 },
            py: 0,
            width: '100%',
          }}
          aria-label="App Header"
        >
          <Toolbar sx={{ minHeight: 72, px: { xs: 0.5, sm: 2 }, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ width: 44, height: 44, mr: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="url(#paint0_linear)" />
                <path d="M12 28L28 12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M20 12V28" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                <defs>
                  <linearGradient id="paint0_linear" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#43e7ad" />
                    <stop offset="1" stopColor="#a259f7" />
                  </linearGradient>
                </defs>
              </svg>
            </Box>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1, fontWeight: 800, letterSpacing: 1, fontFamily: 'Inter, Arial, sans-serif', fontSize: { xs: 22, sm: 28 }, color: '#fff' }}>
              Log Ingestion System
            </Typography>
            <Box sx={{ fontSize: 17, color: '#fff', opacity: 0.8, fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500 }}>
              <span style={{verticalAlign: 'middle'}}>≡</span> 50 total logs
            </Box>
          </Toolbar>
        </AppBar>
        <Box sx={{ width: '100%', px: { xs: 1, sm: 4, md: 8 }, py: 4 }}>
          <LogViewer />
          <LogIngestorModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </Box>
        {/* Floating Add Log Entry Button */}
        <Box
          sx={{
            position: 'fixed',
            bottom: { xs: 16, sm: 36 },
            right: { xs: 16, sm: 48 },
            zIndex: 1200,
            width: { xs: 'calc(100vw - 32px)', sm: 'auto' },
            maxWidth: 260,
          }}
        >
          <button
            onClick={() => setModalOpen(true)}
            aria-label="Add Log Entry"
            style={{
              background: 'linear-gradient(90deg, #a259f7 0%, #43e7ad 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 18,
              padding: '16px 36px',
              borderRadius: 16,
              boxShadow: '0 8px 32px 0 rgba(162,89,247,0.25)',
              border: 'none',
              cursor: 'pointer',
              textTransform: 'none',
              transition: '0.2s',
              width: '100%',
              maxWidth: 260,
              fontFamily: 'Inter, Arial, sans-serif',
              letterSpacing: 0.5,
            }}
          >
            + Add Log Entry
          </button>
        </Box>
        
      </Box>
    </ThemeProvider>
  );
}

export default App;