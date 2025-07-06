import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fetchLogs } from '../services/api';
import FilterBar from './FilterBar';
import LogLevelBadge from './LogLevelBadge';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DataObjectOutlinedIcon from '@mui/icons-material/DataObjectOutlined';
import Skeleton from '@mui/material/Skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import ButtonBase from '@mui/material/ButtonBase';
import Divider from '@mui/material/Divider';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const levelColors = {
  error: '#ff4c6d',
  warn: '#ffb547',
  info: '#4fc3f7',
  debug: '#a259f7',
};

const levelBg = {
  error: '#2d1a1e',
  warn: '#2d241a',
  info: '#1a232d',
  debug: '#231a2d',
};

const levelAccent = {
  error: '#ff4c6d',
  warn: '#ffb547',
  info: '#4fc3f7',
  debug: '#a259f7',
};

const accent = '#a259f7';

const logLevelAccent = {
  error: '#ff4c6d',
  warn: '#ffb547',
  info: '#4fc3f7',
  debug: '#a259f7',
};

const LogCard = ({ log, index }) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => setExpanded((prev) => !prev);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ delay: index * 0.04, duration: 0.5, type: 'spring' }}
      style={{ marginBottom: 28, outline: 'none' }}
      tabIndex={0}
      aria-label={`Log entry: ${log.message}`}
    >
      <ButtonBase
        sx={{
          width: '100%',
          borderRadius: 4,
          display: 'block',
          textAlign: 'left',
          p: 0,
          fontFamily: 'Inter, Arial, sans-serif',
          transition: 'box-shadow 0.2s, transform 0.2s',
          '&:hover, &:focus': {
            boxShadow: `0 8px 32px 0 ${logLevelAccent[log.level] || accent}44, 0 2px 8px 0 #23283a inset`,
            transform: 'scale(1.012)',
          },
        }}
        focusRipple
        aria-label={`Open log entry: ${log.message}`}
      >
        <Card
          sx={{
            background: '#23283a',
            color: '#fff',
            borderRadius: 4,
            boxShadow: `0 4px 16px 0 ${(logLevelAccent[log.level] || accent)}22`,
            border: 'none',
            mb: 2,
            position: 'relative',
            p: 0,
            overflow: 'hidden',
            fontFamily: 'Inter, Arial, sans-serif',
            display: 'flex',
            alignItems: 'stretch',
          }}
        >
          {/* Left accent bar */}
          <Box sx={{ width: 6, background: logLevelAccent[log.level], borderTopLeftRadius: 4, borderBottomLeftRadius: 4, flexShrink: 0 }} />
          <CardContent sx={{ pb: 1.5, pt: 1.5, px: 3, width: '100%' }}>
            <Grid container alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Grid item>
                <LogLevelBadge level={log.level} />
              </Grid>
              <Grid item>
                <Typography variant="body2" sx={{ color: '#fff', opacity: 0.7, fontWeight: 500, fontSize: 13, letterSpacing: 0.2 }}>
                  {format(new Date(log.timestamp), 'MMM dd, HH:mm:ss')}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" sx={{ color: logLevelAccent[log.level], fontWeight: 700, fontSize: 14, letterSpacing: 0.2 }}>
                  {log.resourceId}
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="h6" sx={{ mt: 0.5, fontWeight: 700, fontSize: 20, color: '#fff', letterSpacing: 0.1, mb: 1 }}>
              {log.message}
            </Typography>
            <Grid container spacing={1} sx={{ mb: 0.5 }}>
              <Grid item>
                <Typography variant="caption" sx={{ color: '#4fc3f7', fontWeight: 700, fontSize: 13, fontFamily: 'Fira Mono, monospace' }}>
                  Trace: <span style={{ color: '#fff', fontWeight: 400 }}>{log.traceId}</span>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption" sx={{ color: logLevelAccent[log.level], fontWeight: 700, fontSize: 13, fontFamily: 'Fira Mono, monospace' }}>
                  Span: <span style={{ color: '#fff', fontWeight: 400 }}>{log.spanId}</span>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption" sx={{ color: logLevelAccent[log.level], fontWeight: 700, fontSize: 13, fontFamily: 'Fira Mono, monospace' }}>
                  Commit: <span style={{ color: '#fff', fontWeight: 400 }}>{log.commit}</span>
                </Typography>
              </Grid>
            </Grid>
            <Box sx={{ mt: 1 }}>
              <ButtonBase
                onClick={handleExpandClick}
                sx={{ color: accent, p: 0.5, ml: -1, borderRadius: 2, display: 'inline-flex', alignItems: 'center', fontWeight: 700, fontSize: 14 }}
                aria-label={expanded ? 'Collapse metadata' : 'Expand metadata'}
              >
                {expanded ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
                <Typography variant="caption" sx={{ ml: 0.5, color: accent, fontWeight: 700, fontSize: 13 }}>
                  Metadata
                </Typography>
              </ButtonBase>
              <Collapse in={expanded} timeout={300} unmountOnExit>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box sx={{ mt: 1, background: '#20232a', p: 2, borderRadius: 2, fontSize: 13, color: '#fff', fontFamily: 'Fira Mono, monospace' }}>
                    <pre style={{ margin: 0, fontFamily: 'inherit', color: '#fff' }}>{JSON.stringify(log.metadata, null, 2)}</pre>
                  </Box>
                </motion.div>
              </Collapse>
            </Box>
          </CardContent>
        </Card>
      </ButtonBase>
    </motion.div>
  );
};

const LogSkeleton = () => (
  <Box sx={{ mb: 3 }}>
    <Skeleton variant="rectangular" height={110} sx={{ bgcolor: 'rgba(162,89,247,0.08)', borderRadius: 3 }} />
  </Box>
);

const LogViewer = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiFilters = { ...filters };
        if (filters.startDate) apiFilters.timestamp_start = filters.startDate;
        if (filters.endDate) apiFilters.timestamp_end = filters.endDate;
        const data = await fetchLogs(apiFilters);
        setLogs(data);
      } catch (err) {
        setError('Failed to fetch logs. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    const handler = setTimeout(() => loadLogs(), 300);
    return () => clearTimeout(handler);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Count logs by level
  const levelCounts = logs.reduce((acc, log) => {
    acc[log.level] = (acc[log.level] || 0) + 1;
    return acc;
  }, {});

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h6" sx={{ color: accent, fontWeight: 800, fontSize: 24, letterSpacing: 0.5, mr: 2 }}>
          Log Results ({logs.length} entries)
        </Typography>
        <Divider orientation="horizontal" flexItem sx={{ borderColor: accent, opacity: 0.15, mx: 2 }} />
        <Box sx={{ flexGrow: 1 }} />
        {['info', 'debug', 'error', 'warn'].map((level) => (
          <Chip
            key={level}
            label={`${level}s: ${levelCounts[level] || 0}`}
            sx={{
              background: logLevelAccent[level],
              color: '#fff',
              fontWeight: 700,
              mx: 0.5,
              textTransform: 'lowercase',
              fontSize: 14,
              boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
              letterSpacing: 0.5,
            }}
            size="small"
            aria-label={`Count of ${level} logs`}
          />
        ))}
      </Box>
      <FilterBar onFilterChange={handleFilterChange} />
      <Box sx={{ mt: 2, position: 'relative', height: 540, overflow: 'auto', pr: 1, borderRadius: 3, scrollbarWidth: 'thin', scrollbarColor: `${accent} #23283a` }}>
        <style>{`
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-thumb { background: ${accent}44; border-radius: 8px; }
          ::-webkit-scrollbar-track { background: #23283a; }
        `}</style>
        {loading ? (
          <>
            {[...Array(3)].map((_, i) => <LogSkeleton key={i} />)}
          </>
        ) : error ? (
          <Box sx={{ textAlign: 'center', py: 6, color: '#ff4c6d', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <InfoOutlinedIcon sx={{ fontSize: 48, mb: 1 }} />
            <Typography sx={{ fontSize: 18, fontWeight: 600 }}>{error}</Typography>
          </Box>
        ) : logs.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6, color: '#fff', opacity: 0.5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <InfoOutlinedIcon sx={{ fontSize: 48, mb: 1 }} />
            <Typography sx={{ fontSize: 18, fontWeight: 600 }}>No logs found matching your filters</Typography>
          </Box>
        ) : (
          <AnimatePresence>
            {logs.map((log, idx) => (
              <LogCard log={log} key={log.timestamp + idx} index={idx} />
            ))}
          </AnimatePresence>
        )}
        {/* Floating Add Log Entry Button */}
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon sx={{ fontSize: 28 }} />}
          sx={{
            position: 'fixed',
            bottom: 36,
            right: 48,
            zIndex: 1200,
            background: 'linear-gradient(90deg, #a259f7 0%, #43e7ad 100%)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 18,
            px: 3,
            py: 1.5,
            borderRadius: 3,
            boxShadow: '0 8px 32px 0 rgba(162,89,247,0.25)',
            textTransform: 'none',
            transition: '0.2s',
            '&:hover': {
              background: 'linear-gradient(90deg, #43e7ad 0%, #a259f7 100%)',
              boxShadow: '0 12px 48px 0 rgba(67,231,173,0.20)',
            },
          }}
        >
          Add Log Entry
        </Button>
      </Box>
    </Box>
  );
};

export default LogViewer;