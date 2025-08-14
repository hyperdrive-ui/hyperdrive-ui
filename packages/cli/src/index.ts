#!/usr/bin/env node

import { program } from 'commander'
import { init } from './commands/init.js'
import { add } from './commands/add.js'

program
  .name('@hyperdrive-ui/cli')
  .description('CLI for Hyperdrive UI components')
  .version('0.1.0')

program.addCommand(init)
program.addCommand(add)

// Support park-ui style syntax
const components = program
  .command('components')
  .description('Manage components')

components.addCommand(add)

program.parse()