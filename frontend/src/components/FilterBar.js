import React, { useState } from 'react';
import {
  Grid, Card, CardContent, TextField, InputAdornment, MenuItem, Typography,
} from '@mui/material';
import {
  FilterAltRounded, SearchRounded, DnsRounded, TimelineRounded,
} from '@mui/icons-material';

const accent = '#a259f7';
const darkBg = '#121212';
const inputBg = '#1e1e28';
const border = '#2e2e38';

const FilterBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    message: '',
    level: '',
    resourceId: '',
    traceId: '',
    startDate: '',
    endDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const commonTextFieldProps = {
    variant: 'outlined',
    fullWidth: true,
    InputLabelProps: { shrink: true },
    InputProps: {
      sx: {
        color: '#f1f5f9',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: border,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: accent,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: accent,
        },
        backgroundColor: inputBg,
        borderRadius: 2,
      },
    },
    sx: {
      '& .MuiInputLabel-root': {
        color: accent,
        fontSize: '0.85rem',
        fontWeight: 500,
      },
      '& .MuiInputBase-input': {
        color: '#f8fafc',
        fontSize: '0.875rem',
      },
      mb: 2,
    },
  };

  return (
    <Card
      sx={{
        mb: 4,
        background: darkBg,
        boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.3)',
        borderRadius: 4,
        border: `1px solid ${border}`,
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backdropFilter: 'blur(4px)',
      }}
      aria-label="Log Filters"
    >
      <CardContent sx={{ pb: 3, pt: 3 }}>
        <Grid container alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Grid item>
            <FilterAltRounded sx={{ color: accent, fontSize: 26 }} />
          </Grid>
          <Grid item>
            <Typography
              variant="h6"
              sx={{
                color: accent,
                fontWeight: 600,
                fontSize: 18,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Log Filters
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Search Message"
              name="message"
              placeholder="Search in messages..."
              value={filters.message}
              onChange={handleChange}
              InputProps={{
                ...commonTextFieldProps.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRounded sx={{ color: accent }} />
                  </InputAdornment>
                ),
              }}
              {...commonTextFieldProps}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 200 }} >
            <TextField
              select
              label="Log Level"
              name="level"
              placeholder="e.g., server-1234"
              value={filters.level}
              onChange={handleChange}
              {...commonTextFieldProps}
            >
              <MenuItem value="">All levels</MenuItem>
              <MenuItem value="error">Error</MenuItem>
              <MenuItem value="warn">Warning</MenuItem>
              <MenuItem value="info">Info</MenuItem>
              <MenuItem value="debug">Debug</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Resource ID"
              name="resourceId"
              placeholder="e.g., server-1234"
              value={filters.resourceId}
              onChange={handleChange}
              InputProps={{
                ...commonTextFieldProps.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <DnsRounded sx={{ color: accent }} />
                  </InputAdornment>
                ),
              }}
              {...commonTextFieldProps}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Trace ID"
              name="traceId"
              placeholder="e.g., abc-xyz-123"
              value={filters.traceId}
              onChange={handleChange}
              InputProps={{
                ...commonTextFieldProps.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <TimelineRounded sx={{ color: accent }} />
                  </InputAdornment>
                ),
              }}
              {...commonTextFieldProps}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <TextField
              label="Start Time"
              name="startDate"
              type="datetime-local"
              value={filters.startDate}
              onChange={handleChange}
              {...commonTextFieldProps}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <TextField
              label="End Time"
              name="endDate"
              type="datetime-local"
              value={filters.endDate}
              onChange={handleChange}
              {...commonTextFieldProps}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FilterBar;
