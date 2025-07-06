import React from 'react';
import Chip from '@mui/material/Chip';
import { FaExclamationCircle, FaInfoCircle, FaExclamationTriangle, FaBug } from 'react-icons/fa';

const levelConfig = {
  error: {
    label: 'ERROR',
    color: '#ff4c6d',
    icon: <FaExclamationCircle style={{ color: '#fff', fontSize: 14, marginRight: 4 }} />,
    bg: 'linear-gradient(90deg, #ff4c6d 0%, #a259f7 100%)',
    text: '#fff',
  },
  warn: {
    label: 'WARN',
    color: '#ffb547',
    icon: <FaExclamationTriangle style={{ color: '#fff', fontSize: 14, marginRight: 4 }} />,
    bg: 'linear-gradient(90deg, #ffb547 0%, #a259f7 100%)',
    text: '#fff',
  },
  info: {
    label: 'INFO',
    color: '#4fc3f7',
    icon: <FaInfoCircle style={{ color: '#fff', fontSize: 14, marginRight: 4 }} />,
    bg: 'linear-gradient(90deg, #4fc3f7 0%, #a259f7 100%)',
    text: '#fff',
  },
  debug: {
    label: 'DEBUG',
    color: '#a259f7',
    icon: <FaBug style={{ color: '#fff', fontSize: 14, marginRight: 4 }} />,
    bg: 'linear-gradient(90deg, #a259f7 0%, #43e7ad 100%)',
    text: '#fff',
  },
};

const LogLevelBadge = ({ level }) => {
  const config = levelConfig[level] || levelConfig.info;
  return (
    <Chip
      label={config.label}
      icon={config.icon}
      sx={{
        background: config.bg,
        color: config.text,
        fontWeight: 700,
        fontSize: 13,
        borderRadius: 2,
        px: 1.5,
        boxShadow: '0 2px 8px 0 rgba(162,89,247,0.10)',
        textTransform: 'uppercase',
        letterSpacing: 1,
        height: 28,
      }}
      size="small"
    />
  );
};

export default LogLevelBadge;