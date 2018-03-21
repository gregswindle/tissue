#!/usr/bin/env node

const {URL} = require('url')
const csvMediator = require('./csv-mediator')
const defaultOptions = require('./default-options')
const exportType = require('./export-type')
const fileExporter = require('./file-exporter')
const meow = require('meow')
const restClientOptions = require('./rest-client-options')

const msg = {
  'usage': `
Usage

  $ grc [options] [info]
  $ github-resource-converter [options] [info]

Options

  --base-url           The GitHub REST API v3 URL origin, or a
                       GitHub Enterprise URL origin and path-prefix.
                       [Default: 'https://api.github.com']
  --dest,          -d  The CSV's destination path and file name.
                       [Default: './resources.csv']
  --no-auto-filename       Don't append an ISO 8601-like timestamp to the
                       output file.
                       [Default: false]
  --owner,         -o  The GitHub account name or organization name.
  --repo,          -r  The name of the GitHub (or GitHub enterprise)
                       repository.
  --resource-type, -t  "issues", "prs", or "all".
                       [Default: 'issues']

Info

  --help     Show this dialog.
  --version  Display the installed semantic version.

Examples

  $ grc --owner github --repo hub
    // => Exported CSV to /path/of/cwd/issues.csv.

  $ grc --owner github --repo hub -dest './reports/issues/YYYY-MM-DD.csv'
    // => Exported CSV to /path/to/reports/issues/YYYY-MM-DD.csv.

  $ grc --owner example --repo error
    // =>
    [2018-03-19T08:04:06.596Z] ERROR: github-resource-converter/00000 on localhost: Cannot destructure property \`data\` of 'undefined' or 'null'.
      TypeError: Cannot destructure property \`data\` of 'undefined' or 'null'.
          at paginate (/p/a/t/h/github-resource-converter/lib/base-resource-converter.js:39:16)
          at <anonymous>
          at process._tickCallback (internal/process/next_tick.js:188:7)
`
}

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

const convertGitHubResource = async () => {
  const cli = meow(msg.usage, defaultOptions.cli)
  const opts = loadOptions(cli)
  const data = await getData(cli, opts)
  const dest = getFileName(cli)
  fileExporter.save(dest, data)
}

const main = () => {
  convertGitHubResource()
}

main()
