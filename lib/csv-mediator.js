const {isString} = require('lodash')
const baseResourceConverter = require('./base-resource-converter')
const jsonexport = require('jsonexport')
const restClientOptions = require('./rest-client-options')
const util = require('util')

const toCsv = async (data = []) => {
  const json = isString(data)
    ? JSON.parse(data)
    : data

  const jsonExporter = util.promisify(jsonexport)
  const csv = await jsonExporter(json)
  return csv
}

const csvMediator =
  {
    async issuesToCsv (options = restClientOptions) {
      const issues = await baseResourceConverter.getIssuesForRepo(options)
      const csv = await toCsv(issues)
      return csv
    },

    async pullRequestsToCsv (options = restClientOptions) {
      const pullRequests = await baseResourceConverter.getPullRequestsForRepo(options)
      const csv = await toCsv(pullRequests)
      return csv
    },

    toCsv
  }

Object.assign(csvMediator, baseResourceConverter)

module.exports = csvMediator
