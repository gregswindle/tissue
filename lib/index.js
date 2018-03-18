const {noop} = require('lodash')
const csvMediator = require('./csv-mediator')
const defaultOptions = require('./default-options')
const baseResourceConverter = require('./base-resource-converter')
const githubResourceLogger = require('./github-resource-logger')

module.exports = {
  'authenticate': baseResourceConverter.authenticate,

  'config': defaultOptions,

  'csv': csvMediator,

  export () {
    return noop
  },

  'issues': {
    'getForRepo': baseResourceConverter.getIssuesForRepo
  },

  'logger': githubResourceLogger,

  'pullRequests': {
    'getForRepo': baseResourceConverter.getPullRequestsForRepo
  }
}
