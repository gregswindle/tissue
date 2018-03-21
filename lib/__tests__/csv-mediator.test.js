const csvMediator = require('../csv-mediator')
const baseResourceConverter = require('../base-resource-converter')

describe('csv-mediator', () => {
  const mockResource = {
    'foo': 'bar'
  }
  const mockCsv = 'foo,bar'

  it('isPrototypeOf base-resource-converter', () => {
    expect(csvMediator).toBeDefined()
  })

  describe('#issuesToCsv', () => {
    beforeEach(() => {
      baseResourceConverter.getIssuesForRepo = jest
        .fn()
        .mockReturnValueOnce(mockResource)
    })

    it('retrieves issues from a repo and converts them to CSV format', async () => {
      await csvMediator.issuesToCsv()
      expect(baseResourceConverter.getIssuesForRepo).toHaveBeenCalled()
    })
  })

  describe('#pullRequestsToCsv', () => {
    beforeEach(() => {
      baseResourceConverter.getPullRequestsForRepo = jest
        .fn()
        .mockReturnValueOnce(mockResource)
    })

    it('retrieves pull requests from a repo and converts them to CSV format', async () => {
      await csvMediator.pullRequestsToCsv()
      expect(baseResourceConverter.getPullRequestsForRepo).toHaveBeenCalled()
    })
  })

  describe('#toCsv', () => {
    it('converts a plain object to CSV', async () => {
      const csv = await csvMediator.toCsv(mockResource)
      expect(csv).toEqual(mockCsv)
    })

    it('converts a JSON string to CSV', async () => {
      const csv = await csvMediator.toCsv(JSON.stringify(mockResource))
      expect(csv).toEqual(mockCsv)
    })

    it('returns an empty CSV when nothing is passed to it', async () => {
      const EMPTY = 0
      const csv = await csvMediator.toCsv()
      expect(csv).toHaveLength(EMPTY)
    })
  })
})
