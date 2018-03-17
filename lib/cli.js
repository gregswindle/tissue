#!/usr/bin/env node

const csvMediator = require('./csv-mediator')
const defaultOptions = require('./default-options')
const fsExtra = require('fs-extra')
const meow = require('meow')

const msg = {
  'usage': `
Usage
  $ grc [options] [info]
  $ github-resource-converter [options] [info]
Options
  --dest, -o       The CSV's destination path and file name.
                    [Default: './issues.csv']
  --host, -h        The domain name of the server. Set this value
                    for GitHub Enterprise instances.
                    [Default: 'api.github.com']
  --owner, -o       The GitHub account name or organization name.
  --path-prefix, -p For GitHub Enterprise instances, the value that
                    must occur to fulfill a REST API v3 request, e.g.,
                    'api/v3/'.
                    [Default: '']
  --protocol, -s    The access mechanism for the requested repository.
                    [Default: 'https:']
  --repo, -r        The name of the GitHub (or GitHub enterprise)
                    repository.
Info
  --help            Show this dialog.
  --version         Display the installed semantic version.
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
 * @memberOf {crc}
 */

const options = {
  'flags': {
    'dest': {
      'alias': 'd',
      'default': './issues.csv',
      'type': 'string'
    },
    'host': {
      'alias': 'h',
      'default': 'api.github.com'
    },
    'owner': {
      'alias': 'o',
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
      'alias': 'r',
      'type': 'string'
    }
  }
}

const loadOptions = (cli) => Object.assign({
  'baseUrl': `${cli.flags.protocol}//${cli.flags.host}`,
  'destination': cli.flags.dest,
  'owner': cli.flags.owner,
  'pathPrefix': cli.flags.pathPrefix,
  'repo': cli.flags.repo
}, defaultOptions)

const writeToFile = async (dest, data) => {
  try {
    console.log('Exporting to "%s"...', dest)
    await fsExtra.outputFile(dest, data)
  } catch (err) {
    console.error(err)
  }
}

const convertGitHubResource = async () => {
  const cli = meow(msg.usage, options)
  const opts = loadOptions(cli)
  const data = await csvMediator.issuesToCsv(opts)
  writeToFile(cli.flags.dest, data)
}

const main = () => {
  convertGitHubResource()
}

main()
