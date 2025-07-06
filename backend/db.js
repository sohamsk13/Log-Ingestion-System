const fs = require('fs').promises;
const path = require('path');

const DB_PATH = path.join(__dirname, 'logs.json');

async function initDB() {
  try {
    await fs.access(DB_PATH);
  } catch (error) {
    console.log('Creating new logs database file...');
    await fs.writeFile(DB_PATH, JSON.stringify([]));
  }
}

async function readLogs() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading logs:', error);
    throw new Error('Failed to read logs database');
  }
}

async function writeLog(log) {
  try {
    const logs = await readLogs();
    logs.push(log);
    await fs.writeFile(DB_PATH, JSON.stringify(logs, null, 2));
    return log;
  } catch (error) {
    console.error('Error writing log:', error);
    throw new Error('Failed to write log');
  }
}

async function queryLogs(filters = {}) {
  try {
    const logs = await readLogs();
    
    return logs.filter(log => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        
        switch (key) {
          case 'message':
            return log.message.toLowerCase().includes(value.toLowerCase());
          case 'timestamp_start':
            return new Date(log.timestamp) >= new Date(value);
          case 'timestamp_end':
            return new Date(log.timestamp) <= new Date(value);
          default:
            return String(log[key]).toLowerCase().includes(value.toLowerCase());
        }
      });
    }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
  } catch (error) {
    console.error('Error querying logs:', error);
    throw new Error('Failed to query logs');
  }
}

module.exports = { initDB, writeLog, queryLogs };