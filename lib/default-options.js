const meow = require('meow')
const restClientOptions = require('./rest-client-options')

/*
 * Const loadOptions = cli => {
 *   const OWNER = 1
 *   const REPO = 2
 *   const segs = new URL(cli.pkg.repository.url).pathname
 *     .replace(cli.baseUrl, '')
 *     .split('/')
 *   restClientOptions.owner = segs[OWNER]
 *   restClientOptions.repo = segs[REPO].replace('.git', '')
 */

/*
 *   Return Object.assign(defaultOptions, restClientOptions, {
 *     baseUrl: cli.baseUrl,
 *     dest: cli.flags.dest,
 *     noAutoFilename: cli.flags.noAutoFilename,
 *     owner: cli.flags.owner,
 *     repo: cli.flags.repo,
 *     resourceType: cli.flags.resourceType
 *   })
 * }
 */

const cliOptions = {
  'flags': {
    'baseUrl': {
      'default': 'https://api.github.com',
      'type': 'string'
    },
    'dest': {
      'alias': 'd',
      'default': `./export.csv`,
      'type': 'string'
    },
    'no-auto-filename': {
      'default': false,
      'type': 'boolean'
    },
    'owner': {
      'alias': 'o',
      'type': 'string'
    },
    'repo': {
      'alias': 'r',
      'type': 'string'
    },
    'resource-type': {
      'alias': 't',
      'default': 'issues',
      'type': 'string'
    }
  }
}

const meta = meow(cliOptions)

/**
 * Input options, especillay for the CLI.
 * @type {object}
 * @memberOf {grc}
 */

const defaultOptions = {
  'api': restClientOptions,
  'cli': cliOptions,
  meta
}

module.exports = defaultOptions
