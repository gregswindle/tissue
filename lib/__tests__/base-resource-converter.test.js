const {noop} = require('lodash')
const allIssuesPrs = require('../__fixtures__/all-issues-prs')
const baseResourceConverter = require('../base-resource-converter')
const defaultOptions = require('../default-options')
const fileExporter = require('../file-exporter')
const githubResourceLogger = require('../github-resource-logger')
const issuesGetForRepoResponse = require('../__fixtures__/issues/get-for-repo-response')
const Octokit = require('@octokit/rest')
const prsGetAllResponse = require('../__fixtures__/pull-requests/get-all-response')
const restClientOptions = require('../rest-client-options')

describe('baseResourceConverter', () => {
  beforeAll(() => {
    restClientOptions.owner = 'gregswindle'
    restClientOptions.repo = 'eslint-plugin-crc'
  })

  afterEach(() => {
    jest.clearAllMocks().restoreAllMocks()
  })

  describe('#authenticate (see https://git.io/vxYim)', () => {
    let credentials = {
    }
    const FIRST = 0

    afterEach(() => {
      credentials = {
      }
      jest.resetAllMocks()
      jest.clearAllMocks()
    })

    it('expects a personal access "token"--stored in process.env.GITHUB_ACCESS_TOKEN--by default', () => {
      expect(baseResourceConverter.authenticate).toBeDefined()

      credentials = {
        'token': 'MOCK_GITHUB_ACCESS_TOKEN',
        'type': 'token'
      }
      baseResourceConverter.authenticate()

      expect(Octokit.prototype.authenticate).toHaveBeenCalled()
      expect(Octokit.prototype.authenticate.mock.calls[FIRST]).toContainEqual(credentials)
    })

    it('accepts "basic" credentials', () => {
      credentials = {
        'password': 'password',
        'type': 'basic',
        'username': 'yourusername'
      }
      baseResourceConverter.authenticate(credentials)
      expect(Octokit.prototype.authenticate.mock.calls[FIRST]).toContainEqual(credentials)
    })

    it('accepts "oauth" credentials', () => {
      credentials = {
        'token': 'secrettoken123',
        'type': 'oauth'
      }
      baseResourceConverter.authenticate(credentials)
      expect(Octokit.prototype.authenticate.mock.calls[FIRST]).toContainEqual(credentials)
    })

    it('accepts "oauth key/secret" credentials', () => {
      credentials = {
        'key': 'client_id',
        'secret': 'client_secret',
        'type': 'oauth'
      }
      baseResourceConverter.authenticate(credentials)
      expect(Octokit.prototype.authenticate.mock.calls[FIRST]).toContainEqual(credentials)
    })

    it('accepts "app" credentials', () => {
      credentials = {
        'token': 'secrettoken123',
        'type': 'integration'
      }
      baseResourceConverter.authenticate(credentials)
      expect(Octokit.prototype.authenticate.mock.calls[FIRST]).toContainEqual(credentials)
    })
  })

  describe('#getIssuesForRepo', () => {
    beforeEach(() => {
      spyOn(Octokit.prototype.issues, 'getForRepo').and.returnValue(Promise.resolve(issuesGetForRepoResponse))
      spyOn(Octokit.prototype, 'getNextPage').and.returnValue(Promise.resolve([issuesGetForRepoResponse]))
      Octokit.prototype.hasNextPage = jest.fn().mockReturnValueOnce(true)
    })

    it('retrieves all Issues for a given repository', async () => {
      const issues = await baseResourceConverter.getIssuesForRepo()
      const ISSUE_COUNT = 30
      expect(issues.length).toBeGreaterThanOrEqual(ISSUE_COUNT)
    })
  })

  describe('#getPullRequestsForRepo', () => {
    it('retrieves all Pull Requests for a given repository', async () => {
      spyOn(Octokit.prototype.pullRequests, 'getAll').and.returnValue(Promise.resolve(prsGetAllResponse))

      const pullRequests = await baseResourceConverter.getPullRequestsForRepo()
      const PR_COUNT = 13
      expect(pullRequests.length).toBe(PR_COUNT)
    })

    it('logs errors and returns an empty array', () => {
      spyOn(Octokit.prototype.pullRequests, 'getAll')
        .and.throwError()
        .and.callThrough()
      spyOn(githubResourceLogger, 'error')

      baseResourceConverter
        .getAll()
        .catch((err) => {
          expect(githubResourceLogger.error).toHaveBeenCalled()
          console.error(err)
        })
    })
  })

  describe('#getAll', () => {
    it('retrieves all Issues AND Pull Requests for a given repository', async () => {
      spyOn(Octokit.prototype, 'getAll')
        .and.returnValue(Promise.resolve(allIssuesPrs))
        .and.callThrough()
      spyOn(Octokit.prototype.pullRequests, 'getAll').and.returnValue(Promise.resolve(prsGetAllResponse))
      spyOn(Octokit.prototype.issues, 'getForRepo').and.returnValue(Promise.resolve(issuesGetForRepoResponse))
      spyOn(Octokit.prototype, 'getNextPage').and.returnValue(Promise.resolve(issuesGetForRepoResponse))
      const resources = await baseResourceConverter.getAll()
      const RESOURCE_COUNT = 43
      expect(resources.length).toBe(RESOURCE_COUNT)
    })

    it('logs errors and returns an empty array', async () => {
      const err = new Error()
      spyOn(Octokit.prototype, 'getAll')
        .and.returnValue(Promise.reject(err))
        .and.callThrough()
      spyOn(Octokit.prototype.pullRequests, 'getAll').and.returnValue(Promise.resolve([]))
      spyOn(Octokit.prototype.issues, 'getForRepo').and.returnValue(Promise.resolve([]))
      spyOn(Octokit.prototype, 'getNextPage').and.returnValue(Promise.resolve([[]]))
      spyOn(githubResourceLogger, 'error')

      await baseResourceConverter.getAll()
      expect(githubResourceLogger.error).toHaveBeenCalled()
    })
  })

  describe('#paginate', () => {
    it('uses defaultOptions.api when no paramaters are passed', () => {
      const noopMock = jest.fn()
      baseResourceConverter.paginate(noopMock)
      expect(noopMock).toHaveBeenCalledWith(defaultOptions.api)
    })
  })

  describe('#save', () => {
    it('writes data to the file system', () => {
      spyOn(fileExporter, 'save').and.callFake(noop).and.callThrough()
      baseResourceConverter.save()
      expect(fileExporter.save).toHaveBeenCalled()
    })
  })
})
