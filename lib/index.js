const baseResourceConverter = require('./base-resource-converter')
const csvMediator = require('./csv-mediator')
const defaultOptions = require('./default-options')
const githubResourceLogger = require('./github-resource-logger')

module.exports = {
  'authenticate': baseResourceConverter.authenticate,

  'csv': csvMediator,

  'getAll': baseResourceConverter.getAll,

  'issues': {
    'getForRepo': baseResourceConverter.getIssuesForRepo
  },

  'logger': githubResourceLogger,

  'options': defaultOptions,

  'pullRequests': {
    'getForRepo': baseResourceConverter.getPullRequestsForRepo
  },

  'save': baseResourceConverter.save
}
