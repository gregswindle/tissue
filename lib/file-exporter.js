const exportType = require('./export-type')
// eslint-disable-next-line node/no-extraneous-require
const fsExtra = require('fs-extra')
const defaultOptions = require('./default-options')
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
 * cli.flags.noAutoFilename === true.
 *
 * @param {string} dest - The destination path of the converted export file.
 * @returns {string} The decorated file path.
 */

const decorateFileName = (options = defaultOptions.meta.flags) => {
  const {dest, owner, repo, resourceType} = options
  const directoryName = path.dirname(dest)
  const ext = path.extname(dest)
  const fileName =
    `${owner}-${repo}-${resourceType.toLowerCase()}` +
    `-${path.basename(dest).replace(ext, '')}`
  return path.join(
    directoryName,
    `${fileName}.${toFileFriendlyIsoDate()}${ext}`
  )
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
  'dest': defaultOptions.meta.flags.dest,
  getExportFormat,
  getResourceType,
  'save': writeToFile
}

module.exports = fileExporter
