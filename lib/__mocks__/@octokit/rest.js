const {noop} = require('lodash')

const allIssuesPrs = require('../../__fixtures__/all-issues-prs')
const prsGetAllResponse = require('../../__fixtures__/pull-requests/get-all-response')
const issuesGetForRepoResponse = require('../../__fixtures__/issues/get-for-repo-response')
const issuesGetNextPageResponse = require('../../__fixtures__/issues/get-next-page-response')

const Octokit = jest.genMockFromModule('@octokit/rest')

Octokit.prototype.authenticate = jest.fn().mockImplementation(noop)
Octokit.prototype.getAll = jest.fn().mockReturnValueOnce(allIssuesPrs)
Octokit.prototype.issues = {
  'getForRepo': jest
    .fn()
    .mockReturnValue(Promise.resolve(issuesGetForRepoResponse))
}

Octokit.prototype.hasNextPage = jest.fn().mockReturnValueOnce(true)
Octokit.prototype.getNextPage = jest.fn(() => Promise.resolve(issuesGetNextPageResponse))

Octokit.prototype.pullRequests = {
  'getAll': jest.fn().mockReturnValue(Promise.resolve(prsGetAllResponse))
}

module.exports = Octokit
