const bunyan = require('bunyan')
const bunyanFormat = require('bunyan-format')

const outputModeEnum = ((enumerator) => {
  enumerator.BUNYAN = 'bunyan'
  enumerator.JSON = 'json'
  enumerator.LONG = 'long'
  enumerator.SHORT = 'short'
  enumerator.SIMPLE = 'simple'
  return enumerator
})({
})

const outputFormat = bunyanFormat({
  'color': true,
  'outputMode': outputModeEnum.LONG
})

/**
 * @const
 * @name githubResourceLogger
 *
 * @description
 * Provides a bunyan logger.
 *
 * @module grc/logger
 */

const githubResourceLogger = bunyan.createLogger({
  'level': bunyan.INFO,
  'name': 'github-resource-converter',
  'stream': outputFormat
})

/**
 * @exports githubResourceLogger
 */

module.exports = githubResourceLogger
