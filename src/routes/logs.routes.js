import express from 'express'
import fs from 'fs'
import path from 'path'

const router = express.Router()

const LOG_DIR = path.resolve('logs')
const LOG_FILE = path.join(LOG_DIR, 'app.log')

router.get('/', (req, res) => {
  const { date = '', level = '', limit = 100 } = req.query

  fs.readFile(LOG_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Gagal membaca log', error: err.message })

    let logs = data
      .split('\n')
      .filter(line => line.trim() !== '')
      .reverse()

    if (level) {
      logs = logs.filter(line => line.toLowerCase().includes(level.toLowerCase()))
    }

    if (date) {
      logs = logs.filter(line => line.toLowerCase().includes(date.toLowerCase()))
    }

    res.json({ logs: logs.slice(0, parseInt(limit)) })
  })
})

router.get('/download', (req, res) => {
  res.download(LOG_FILE, 'app.log')
})


export default router
