const {noop} = require('lodash')
const csvMediator = require('./csv-mediator')
const defaultOptions = require('./default-options')
const githubResourceConverter = require('./base-resource-converter')
const githubResourceLogger = require('./github-resource-logger')

module.exports = {
  'authenticate': githubResourceConverter.authenticate,

  'config': defaultOptions,

  'csv': csvMediator,

  'issues': {
    'getForRepo': githubResourceConverter.getIssuesForRepo
  },

  'logger': githubResourceLogger,

  'pullRequests': {
    'getForRepo': noop
  }
}
