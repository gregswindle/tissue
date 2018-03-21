const defaultOptions = require('../default-options')
const exportType = require('../export-type')
const fileExporter = require('../file-exporter')
const fsExtra = require('fs-extra')
const githubResourceLogger = require('../github-resource-logger')

jest.mock('fs-extra')

describe('file-exporter is responsible for file-system operations:', () => {
  const options = {
    'baseUrl': 'https://api.github.com',
    'd': './export.csv',
    'dest': './export.csv',
    'forceExit': true,
    'noAutoFilename': false,
    'owner': 'foo',
    'repo': 'bar',
    'resourceType': 'issues',
    't': 'issues'
  }

  beforeAll(() => {
    defaultOptions.meta.flags = options
  })

  afterAll(() => {
    jest.clearAllMocks().restoreAllMocks()
  })

  describe('#decorateFileName', () => {
    test('uses the default pattern {owner}-{repo}-{resource-type}-export.YYYY-MM-DDTHH_MM_SS_MSZ.{ext}', () => {
      const name = fileExporter.decorateFileName(options)
      expect(name).toMatch(/foo-bar-issues-export.*.csv/)
    })

    it('uses restClientOptions by default', () => {
      expect(fileExporter.decorateFileName()).toMatch(/foo-bar-issues-export.*.csv/)
    })
  })

  describe('#getExportFormat', () => {
    it('returns the type of file to be exported', () => {
      let ext = fileExporter.getExportFormat('issues.csv')
      expect(ext).toBe('CSV')
      ext = fileExporter.getExportFormat('pull-requests.json')
      expect(ext).toBe('JSON')
    })
  })

  describe('#getResourceType', () => {
    it('is a utility method that provides an enum value', () => {
      const keys = Object.keys(exportType.resource).map((key) => key.toLowerCase())
      keys.forEach((resourceType) => {
        const type = fileExporter.getResourceType(resourceType)
        expect(type).toMatch(/ALL|ISSUE|PULL_REQUEST/)
      })
    })

    it('defaults to "ISSUE"', () => {
      expect('ISSUE').toBe(fileExporter.getResourceType('unknown'))
    })
  })

  describe('#save', () => {
    it('saves exported data to a file', async () => {
      await fileExporter.save(options.dest, [])
      expect(fsExtra.outputFile).toHaveBeenCalled()
    })

    it('writes errors to stdout', async () => {
      spyOn(githubResourceLogger, 'error')

      await fileExporter.save(options.dest, [])
      expect(githubResourceLogger.error).toHaveBeenCalled()
    })
  })
})
