const defaultOptions = require('./default-options')
const githubResourceConverter = require('./base-resource-converter')
const jsonexport = require('jsonexport')
const util = require('util')
const {isString} = require('lodash')

const convert = async (data = []) => {
  let json = data
  if (isString(data)) {
    json = JSON.parse(data)
  }
  const jsonExporter = util.promisify(jsonexport)
  const csv = await jsonExporter(json)
  return csv
}

const csvMediator = Object.assign(
  {
    async convert,

    async issuesToCsv (options = defaultOptions) {
      const issues = await githubResourceConverter.getIssuesForRepo(options)
      const csv = await csvMediator.convert(issues)
      return csv
    },

    'toCsv': convert
  },

  githubResourceConverter
)

module.exports = csvMediator
