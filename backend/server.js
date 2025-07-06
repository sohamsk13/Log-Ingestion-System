const express = require('express');
const bodyParser = require('body-parser');
const { initDB, writeLog, queryLogs } = require('./db');
const cors = require('cors');



const app = express();
app.use(bodyParser.json());

app.options('*', cors());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }));

// Initialize database
initDB();

// Log ingestion endpoint
app.post('/logs', async (req, res) => {
  try {
    const log = req.body;
    
    // Validate required fields
    const requiredFields = ['level', 'message', 'resourceId', 'timestamp', 
                          'traceId', 'spanId', 'commit', 'metadata'];
    if (!requiredFields.every(field => field in log)) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Validate log level
    const validLevels = ['error', 'warn', 'info', 'debug'];
    if (!validLevels.includes(log.level)) {
      return res.status(400).json({ error: 'Invalid log level' });
    }
    
    const savedLog = await writeLog(log);
    res.status(201).json(savedLog);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Log query endpoint
app.get('/logs', async (req, res) => {
  try {
    const filters = {
      level: req.query.level,
      message: req.query.message,
      resourceId: req.query.resourceId,
      timestamp_start: req.query.timestamp_start,
      timestamp_end: req.query.timestamp_end,
      traceId: req.query.traceId,
      spanId: req.query.spanId,
      commit: req.query.commit
    };
    
    const logs = await queryLogs(filters);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT =  3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));