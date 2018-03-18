#!/usr/bin/env node

const csvMediator = require('./csv-mediator')
const defaultOptions = require('./default-options')
const exportType = require('./export-type')
const fileExporter = require('./file-exporter')
const meow = require('meow')

const msg = {
  'usage': `
Usage
  $ grc [options] [info]
  $ github-resource-converter [options] [info]

Options
  --dest, -o           The CSV's destination path and file name.
                       [Default: './resources.csv']
  --host, -h           The domain name of the server. Set this value
                       for GitHub Enterprise instances.
                       [Default: 'api.github.com']
  --no-timestamp, -t   Don't append an ISO 8601-like timestamp to the
                       output file.
                       [Default: false]
  --owner, -o          The GitHub account name or organization name.
  --path-prefix, -p    For GitHub Enterprise instances, the value that
                       must occur to fulfill a REST API v3 request, e.g.,
                       'api/v3/'.
                       [Default: '']
  --protocol, -s       The access mechanism for the requested repository.
                       [Default: 'https:']
  --repo, -r           The name of the GitHub (or GitHub enterprise)
                       repository.
  --resource-type, -r  "issues", "prs", or "all".
                       [Default: 'issues']

Info
  --help             Show this dialog.
  --version          Display the installed semantic version.

Examples
  $ grc --owner github --repo hub
  // => Exported CSV to /path/of/cwd/issues.csv.

  $ grc --owner github --repo hub -dest './reports/issues/YYYY-MM-DD.csv'
  // => Exported CSV to /path/to/reports/issues/YYYY-MM-DD.csv.

  $ grc --owner error --repo example
  // => [github-resource-converter] 2018-03-12T07:36:31.681Z ERROR HttpError: {
    'name': 'github-resource-converter',
    'hostname': 'localhost',
    'pid': 30937,
    'level': 50,
    'err': {
      'message': {
        'message': 'Not Found',
        'documentation_url': 'https://developer.github.com/v3'
      },
      'name': 'HttpError',
      'stack': 'HttpError: {"message":"Not Found","documentation_url":"https://developer.github.com/v3"}
                at response.text.then.message (/path/to/github-resource-converter/node_modules/@octokit/rest/lib/request/request.js:56:19)
                at <anonymous>
                at process._tickCallback (internal/process/next_tick.js:188:7)',
      'code': 404
    },
    'msg': {
      'message': 'Not Found',
      'documentation_url': 'https://developer.github.com/v3'
    },
    'time': '2018-03-12T07:36:31.681Z',
    'v': 0
  }
`
}

/**
 * Command-line interface options.
 * @type {object}
 * @memberOf {grc}
 */

const options = {
  'flags': {
    'dest': {
      'alias': 'd',
      'default': `./export.csv`,
      'type': 'string'
    },
    'host': {
      'alias': 'h',
      'default': 'api.github.com'
    },
    'no-timestamp': {
      'default': false,
      'type': 'boolean'
    },
    'owner': {
      'type': 'string'
    },
    'path-prefix': {
      'alias': 'p',
      'default': '',
      'type': 'string'
    },
    'protocol': {
      'alias': 's',
      'default': 'https:',
      'type': 'string'
    },
    'repo': {
      'type': 'string'
    },
    'resource-type': {
      'alias': 't',
      'default': 'issues',
      'type': 'string'
    }
  }
}

const loadOptions = (cli) => Object.assign(
  {
    'baseUrl': `${cli.flags.protocol}//${cli.flags.host}`,
    'dest': cli.flags.dest,
    'noTimestamp': cli.flags.noTimestamp,
    'owner': cli.flags.owner,
    'pathPrefix': cli.flags.pathPrefix,
    'repo': cli.flags.repo
  },
  defaultOptions
)

const getFileName = (cli) => {
  if (!cli.flags.noTimestamp) {
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
  const cli = meow(msg.usage, options)
  const opts = loadOptions(cli)
  const data = await getData(cli, opts)
  const dest = getFileName(cli)
  fileExporter.save(dest, data)
}

const main = () => {
  convertGitHubResource()
}

main()
