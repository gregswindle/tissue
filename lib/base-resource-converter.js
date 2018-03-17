const {map} = require('lodash')
const defaultOptions = require('./default-options')
const dotenv = require('dotenv')
const githubResourceLogger = require('./github-resource-logger')
const Octokit = require('@octokit/rest')

const envConfig = dotenv.config()

const octokit = new Octokit(defaultOptions)

/*
 * @param {object} credentials
 * @param {string=token} credentials.type
 * @param {string=process.env.GITHUB_ACCESS_TOKEN} credentials.token
 * @param {string} [credentials.user]
 *
 * @see https://github.com/octokit/rest.js#authentication
 * @see https://github.com/settings/tokens
 */

const authenticate = (credentials) => {
  const creds = credentials || {
    'token': envConfig.required.GITHUB_ACCESS_TOKEN,
    'type': 'token'
  }
  return octokit.authenticate(creds)
}

/**
 * Fetch all paginated responses.
 *
 * @param {Function} method - The @octokit/rest method to execute.
 * @param {any} [params=defaultOptions] - The parameters to pass to @octokit/rest's method.
 * @returns A collection of all responses' data.
 */

const paginate = async (method, params = defaultOptions) => {
  const responses = []
  const response = await method(params)
  while (octokit.hasNextPage(response)) {
    responses.push(octokit.getNextPage(response))
  }
  responses.concat(await Promise.all(responses))
  return map(responses, ({data}) => data)
}

/**
 * List all issues for a repository.
 *
 * @see https://octokit.github.io/rest.js/#api-Issues-getForRepo
 */

const getIssuesForRepo = async (params = defaultOptions) => {
  try {
    const issues = await paginate(octokit.issues.getForRepo, params)
    return issues
  } catch (err) {
    githubResourceLogger.error(err)
    return []
  }
}

/**
 * List all pull requests.
 *
 * @see https://octokit.github.io/rest.js/#api-PullRequests-getAll
 */

const getPullRequestsForRepo = async (params = defaultOptions) => {
  try {
    const pullRequests = await paginate(octokit.pullRequests.getAll, params)
    return pullRequests
  } catch (err) {
    githubResourceLogger.error(err)
    return []
  }
}

const baseResourceConverter = {
  authenticate,

  getIssuesForRepo,

  getPullRequestsForRepo,

  paginate
}

module.exports = baseResourceConverter
