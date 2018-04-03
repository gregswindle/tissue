const {URL} = require('url')
const csvMediator = require('./csv-mediator')
const defaultOptions = require('./default-options')
const exportType = require('./export-type')
const fileExporter = require('./file-exporter')
const restClientOptions = require('./rest-client-options')

const loadOptions = (cli) => {
  const OWNER = 1
  const REPO = 2
  const segs = new URL(cli.pkg.repository.url).pathname
    .replace(cli.baseUrl, '')
    .split('/')
  restClientOptions.owner = segs[OWNER]
  restClientOptions.repo = segs[REPO].replace('.git', '')

  return Object.assign(defaultOptions, restClientOptions, {
    'baseUrl': cli.baseUrl,
    'dest': cli.flags.dest,
    'noAutoFilename': cli.flags.noAutoFilename,
    'owner': cli.flags.owner,
    'repo': cli.flags.repo,
    'resourceType': cli.flags.resourceType
  })
}

const getFileName = (cli) => {
  if (!cli.flags.noAutoFilename) {
    return fileExporter.decorateFileName(cli.flags)
  }
  return cli.flags.dest
}

const getResources = async (cli, opts) => {
  const {ALL, ISSUES, PULL_REQUESTS} = exportType.resource
  const resourceType = exportType.resource[cli.flags.resourceType.toUpperCase()]
  let resources = []
  switch (resourceType) {
      case ALL:
        resources = await csvMediator.getAll(opts)
        break
      case PULL_REQUESTS:
        resources = await csvMediator.getPullRequestsForRepo(opts)
        break
      case ISSUES:
      default:
        resources = await csvMediator.getIssuesForRepo(opts)
        break
  }
  const WHITESPACE = 2
  return JSON.stringify(resources, null, WHITESPACE)
}

const getData = async (cli, opts) => {
  const format = fileExporter.getExportFormat(cli.flags.dest)
  const json = await getResources(cli, opts)
  if (exportType.format.CSV === format) {
    const data = await csvMediator.toCsv(json)
    return data
  }
  return json
}

class CliController {
  constructor (cli) {
    this.cli = cli
    this.options = loadOptions(this.cli)
    this.data = null
    this.destination = null
  }

  async init () {
    this.data = await getData(this.cli, this.options)
    this.destination = getFileName(this.cli)
    return this.save(this.destination, this.data)
  }

  save (destination, data) {
    fileExporter.save(destination, data)
    return this
  }
}

module.exports = CliController
