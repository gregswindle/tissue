const {noop} = require('lodash')
const issues = require('./issues')
const Octokit = jest.genMockFromModule('@octokit/rest')

Octokit.prototype.authenticate = jest.fn().mockImplementation(noop)
Octokit.prototype.issues = {
  'getForRepo': jest.fn().mockImplementation(() => Promise.resolve(issues))
}

Octokit.prototype.hasNextPage = jest.fn().mockReturnValueOnce(true)
Octokit.prototype.getNextPage = jest
  .fn()
  .mockImplementationOnce(() => Promise.resolve({
    'data': issues
  }))

module.exports = Octokit
