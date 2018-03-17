const bunyan = require('bunyan')
const chalk = require('chalk')
const {get} = require('lodash')

const createLogRecord = (rec) => {
  const record = Object.assign({
  }, rec)
  record.err.message = JSON.parse(rec.err.message)
  record.msg = JSON.parse(rec.msg)
  return record
}

const writeErr = (rec, level, color) => {
  const WHITESPACE = 2
  const record = createLogRecord(rec)
  // eslint-disable-next-line no-console
  console.error(
    '[%s] %s %s %s',
    chalk.hex('#eaeaea')(rec.name),
    chalk.gray(rec.time.toISOString()),
    color(level.toUpperCase()),
    `${rec.err.name}: ${JSON.stringify(record, null, WHITESPACE)}`
  )
}

const writeInfo = (rec, level, color) => {
  // eslint-disable-next-line no-console
  console.log(
    '[%s] %s %s %s',
    chalk.hex('#eaeaea')(rec.name),
    chalk.gray(rec.time.toISOString()),
    color(level.toUpperCase()),
    rec.msg
  )
}

const loggerStream = {

  'debug': chalk.blue,

  'error': chalk.redBright,

  'fatal': chalk.bold.red,

  'info': chalk.green,

  'trace': chalk.whiteBright,

  'warn': chalk.yellowBright,

  write (rec) {
    const level = get(bunyan.nameFromLevel, rec.level)
    const color = get(loggerStream, level)
    if (rec.level >= bunyan.ERROR) {
      writeErr(rec, level, color)
    } else {
      writeInfo(rec, level, color)
    }
  }
}

/**
 * @const
 * @name githubResourceLogger
 *
 * @description
 * Provides a bunyan logger.
 *
 * @module democracy-ia/logger
 */

const githubResourceLogger = bunyan.createLogger({
  'level': bunyan.INFO,
  'name': 'base-resource-converter',
  'streams': [
    {
      'level': bunyan.INFO,
      'stream': loggerStream,
      'type': 'raw'
    }
  ]
})

/**
 * @exports githubResourceLogger
 */

module.exports = githubResourceLogger
