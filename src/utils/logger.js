import winston from 'winston'
import 'winston-daily-rotate-file'
import path from 'path'
import fs from 'fs'

// Buat folder logs jika belum ada
const logDir = 'logs'
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

const logFormat = winston.format.printf(({ level, message, timestamp, ...meta }) => {
  return `[${timestamp}] ${level.toUpperCase()}: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`
})

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),

    // Tulis ke file (rotasi harian opsional)
    new winston.transports.File({
      filename: path.join(logDir, 'app.log'),
      level: 'info',
    }),

    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: path.join(logDir, 'exceptions.log') })
  ]
})

export default logger