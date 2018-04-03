#!/usr/bin/env node

const CliController = require('./cli-controller')
const defaultOptions = require('./default-options')
const meow = require('meow')

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

const main = () => {
  const inputs = meow(msg.usage, defaultOptions.cli)
  const cliController = new CliController(inputs)
  cliController.init()
}

main()
