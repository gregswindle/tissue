const exportType = require('./export-type')
const fsExtra = require('fs-extra')
const githubResourceLogger = require('./github-resource-logger')
const path = require('path')

const getExportFormat = (dest) => {
  const ext = path
    .extname(dest)
    .replace('.', '')
    .toUpperCase()
  return exportType.format[ext]
}

const getResourceType = (resourceType) => {
  const {ISSUE} = exportType.resource
  return exportType.resource[resourceType.toUpperCase()] || ISSUE
}

/**
 * Replace all ":" and "." characters with an underscore
 * to create a file-friendly ISO 8601 date/time stamp.
 *
 * @example
 * toFileFriendlyIsoDate()
 * // => 2018-03-17T23_02_50_144Z
 *
 * @param {Date} [date=new Date()] - A Date instance.
 * @returns {string} A date/timestamp similar to ISO 8601.
 */

const toFileFriendlyIsoDate = (date = new Date()) => date.toISOString().replace(/:|\./g, '_')

/**
 * Append converted file with ISO 8601-like timestamp, unless
 * cli.flags.noTimestamp === true.
 *
 * @param {string} dest - The destination path of the converted export file.
 * @returns {string} The decorated file path.
 */

const decorateFileName = (options) => {
  const directoryName = path.dirname(options.dest)
  const ext = path.extname(options.dest)
  const fileName =
    `${options.owner}-${options.repo}-${options.resourceType.toLowerCase()}` +
    `-${path.basename(options.dest).replace(ext, '')}`
  return path.join(directoryName, `${fileName}.${toFileFriendlyIsoDate()}${ext}`)
}

const writeToFile = async (dest, data) => {
  try {
    console.log('Exporting...')
    await fsExtra.outputFile(dest, data)
    console.log('Saved "%s".', dest)
  } catch (err) {
    githubResourceLogger.error(err)
  }
}

const fileExporter = {
  decorateFileName,

  getExportFormat,

  getResourceType,

  'save': writeToFile
}

module.exports = fileExporter
