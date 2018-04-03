const {noop} = require('lodash')
const cli = require('../cli')
const CliController = require('../cli-controller')
const cliInputFixture = require('../__fixtures__/cli/input.json')
const csvMediator = require('../csv-mediator')
const fileExporter = require('../file-exporter')

describe('cli', () => {
  beforeAll(() => {
    fileExporter.save = jest.fn().mockImplementation(noop)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('is the command-line "binary" for fetching, converting, and exporting GitHub resources.', () => {
    expect(cli).toBeDefined()
  })

  describe('It has six CLI "flags":', () => {
    let meowCli = null
    let ctrl = null

    beforeEach(() => {
      meowCli = Object.assign({
      }, cliInputFixture, {
        'flags': {
          'noAutoFilename': true,
          'resourceType': 'csv'
        }
      })

      spyOn(csvMediator, 'getAll').and.returnValue(Promise.resolve({
      }))
      spyOn(csvMediator, 'getIssuesForRepo').and.returnValue(Promise.resolve({
      }))
      spyOn(csvMediator, 'getPullRequestsForRepo').and.returnValue(Promise.resolve({
      }))
    })

    it('"--no-auto-filename" allows users to create a file path and name of their choice', async () => {
      const dest = './custom-export-location.csv'
      meowCli.flags.dest = dest
      ctrl = new CliController(meowCli)
      await ctrl.init()
      expect(ctrl.destination).toBe(dest)
    })

    it('"--resource-type" of "pr", "prs", "pull_request", or "pull_requests" exports pull requests', async () => {
      meowCli.flags.resourceType = 'pr'
      meowCli.flags.dest = './export.csv'
      ctrl = new CliController(meowCli)
      await ctrl.init()
      expect(csvMediator.getPullRequestsForRepo).toHaveBeenCalled()
    })

    it('"--resource-type" of "all" exports issues and pull requests', async () => {
      meowCli.flags.resourceType = 'all'
      meowCli.flags.dest = './export.csv'
      ctrl = new CliController(meowCli)
      await ctrl.init()
      expect(csvMediator.getAll).toHaveBeenCalled()
    })

    it('"--dest, -d", when given a value ending with a ".json" extension, exports to JSON', async () => {
      spyOn(csvMediator, 'toCsv').and.callFake(noop)
      meowCli.flags.dest = './export.json'
      ctrl = new CliController(meowCli)
      await ctrl.init()
      expect(csvMediator.toCsv).not.toHaveBeenCalled()
    })
  })
})
