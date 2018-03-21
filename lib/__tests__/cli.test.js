const {noop} = require('lodash')
const cli = require('../cli')
const fileExporter = require('../file-exporter')

// Const meow = require('meow')

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
    it('--no-auto-filename allows users to create a file path and name of their choice')
  })
})
