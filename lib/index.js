const baseResourceConverter = require('./base-resource-converter')
const csvMediator = require('./csv-mediator')
const defaultOptions = require('./default-options')
const githubResourceLogger = require('./github-resource-logger')

const githubResourceConverter = {
  /**
   * Synchronously establish your account or organizational identity with GitHub.
   *
   * @param {object} credentials
   * @param {string=token} credentials.type - Allowed values: 'basic', 'oauth',
   *   'token', and 'integration'.
   * @param {string=process.env.GITHUB_ACCESS_TOKEN} credentials.token
   * @param {string} [credentials.user]
   *
   * @see https://github.com/octokit/rest.js#authentication
   * @see https://github.com/settings/tokens
   */

  'authenticate': baseResourceConverter.authenticate,

  'getAll': baseResourceConverter.getAll,

  'issues': {
    'getForRepo': baseResourceConverter.getIssuesForRepo
  },

  'logger': githubResourceLogger,

  'options': defaultOptions,

  'pullRequests': {
    'getForRepo': baseResourceConverter.getPullRequestsForRepo
  },

  'save': csvMediator.save,

  'toCsv': csvMediator.toCsv
}

module.exports = githubResourceConverter
