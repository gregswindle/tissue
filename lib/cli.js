#!/usr/bin/env node

const CliController = require('./cli-controller')
const defaultOptions = require('./default-options')
const meow = require('meow')

const main = () => {
  const cli = meow(defaultOptions.cli)
  const cliController = new CliController(cli)
  cliController.init()
}

main()
