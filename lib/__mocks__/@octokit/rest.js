const {noop} = require('lodash')
const issues = require('./issues')
const Octokit = jest.genMockFromModule('@octokit/rest')
const prs = require('./prs')

Octokit.prototype.authenticate = jest.fn().mockImplementation(noop)
Octokit.prototype.hasNextPage = jest.fn().mockReturnValueOnce(true)
Octokit.prototype.getNextPage = jest
  .fn()
  .mockReturnValue(Promise.resolve(issues))

Octokit.prototype.issues = {
  getForRepo () {
    return Promise.resolve(issues)
  }
}

Octokit.prototype.pullRequests = {
  getAll () {
    return Promise.resolve(prs)
  }
}

module.exports = Octokit
