import React, { useState } from 'react';
import { ingestLog } from '../services/api';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const accent = '#a259f7';

export function LogIngestorForm({ onSubmit, isSubmitting, logData, handleChange }) {
  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Level"
            name="level"
            value={logData.level}
            onChange={handleChange}
            fullWidth
            required
          >
            <MenuItem value="error">Error</MenuItem>
            <MenuItem value="warn">Warning</MenuItem>
            <MenuItem value="info">Info</MenuItem>
            <MenuItem value="debug">Debug</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Resource ID"
            name="resourceId"
            value={logData.resourceId}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Message"
            name="message"
            value={logData.message}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Trace ID"
            name="traceId"
            value={logData.traceId}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Span ID"
            name="spanId"
            value={logData.spanId}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Commit Hash"
            name="commit"
            value={logData.commit}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Metadata (JSON)"
            name="metadata"
            value={logData.metadata}
            onChange={handleChange}
            fullWidth
            required
            multiline
            minRows={2}
          />
        </Grid>
      </Grid>
      <DialogActions sx={{ mt: 2 }}>
        <Button onClick={onSubmit} type="submit" variant="contained" color="primary" disabled={isSubmitting} sx={{ px: 4, py: 1.5, borderRadius: 2, fontWeight: 700 }}>
          {isSubmitting ? 'Submitting...' : 'Submit Log'}
        </Button>
      </DialogActions>
    </form>
  );
}

const LogIngestorModal = ({ open, onClose }) => {
  const [logData, setLogData] = useState({
    level: 'info',
    message: '',
    resourceId: '',
    timestamp: new Date().toISOString(),
    traceId: '',
    spanId: '',
    commit: '',
    metadata: JSON.stringify({ parentResourceId: '' })
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const parsedMetadata = JSON.parse(logData.metadata || '{}');
      await ingestLog({ ...logData, metadata: parsedMetadata });
      setSubmitStatus({ success: true, message: 'Log ingested successfully!' });
      setSnackbarOpen(true);
      setLogData({
        level: 'info',
        message: '',
        resourceId: '',
        timestamp: new Date().toISOString(),
        traceId: '',
        spanId: '',
        commit: '',
        metadata: JSON.stringify({ parentResourceId: '' })
      });
      onClose();
    } catch (error) {
      setSubmitStatus({ success: false, message: error.message || 'Failed to ingest log' });
      setSnackbarOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(36, 40, 54, 0.95)',
            boxShadow: '0 8px 32px 0 rgba(162,89,247,0.25)',
            borderRadius: 3,
            border: `1.5px solid ${accent}33`,
            p: 2,
          },
        }}
      >
        <DialogTitle sx={{ color: accent, fontWeight: 700, fontSize: 22, letterSpacing: 1, pb: 0 }}>
          Ingest New Log
        </DialogTitle>
        <DialogContent>
          <LogIngestorForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            logData={logData}
            handleChange={handleChange}
          />
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        {submitStatus && (
          <Alert onClose={handleSnackbarClose} severity={submitStatus.success ? 'success' : 'error'} sx={{ width: '100%' }}>
            {submitStatus.message}
          </Alert>
        )}
      </Snackbar>
    </>
  );
};

export default LogIngestorModal;