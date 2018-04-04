const baseResourceConverter = require('../base-resource-converter')
const csvMediator = require('../csv-mediator')
const defaultOptions = require('../default-options')
const githubResourceLogger = require('../github-resource-logger')
const index = require('..')

describe('index', () => {
  it('is the public module for github-resource-converter', () => {
    expect(index).toBeDefined()
  })

  describe('#authenticate', () => {
    it('references baseResourceConverter#authenticate', () => {
      expect(index.authenticate).toBe(baseResourceConverter.authenticate)
    })
  })

  describe('#getAll', () => {
    it('references baseResourceConverter#getAll', () => {
      expect(index.getAll).toBe(baseResourceConverter.getAll)
    })
  })

  describe('issues#getForRepo', () => {
    it('references baseResourceConverter#getIssuesForRepo', () => {
      expect(index.issues.getForRepo).toBe(baseResourceConverter.getIssuesForRepo)
    })
  })

  describe('logger', () => {
    it('references the githubResourceLogger instance', () => {
      expect(index.logger).toBe(githubResourceLogger)
    })
  })

  describe('options', () => {
    it('references defaultOptions', () => {
      expect(index.options).toBe(defaultOptions)
    })
  })

  describe('pullRequests#getForRepo', () => {
    it('references baseResourceConverter#getPullRequestsForRepo', () => {
      expect(index.pullRequests.getForRepo).toBe(baseResourceConverter.getPullRequestsForRepo)
    })
  })

  describe('#save', () => {
    it('references baseResourceConverter#save', () => {
      expect(index.save).toBeDefined()
      expect(index.save).toBe(baseResourceConverter.save)
    })
  })

  describe('#toCsv', () => {
    it('references csvMediator#toCsv', () => {
      expect(index.csv).toBe(csvMediator.csv)
    })
  })
})
