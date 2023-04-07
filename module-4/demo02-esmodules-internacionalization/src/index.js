import readline from 'readline';

import Draftlog from 'draftlog';
import chalk from 'chalk'
import chalkTable from 'chalk-table'

import Person from './person.js';

import database from '../database.json';

Draftlog(console).addLineListener(process.stdin);

const options = {
    leftPad: 2,
    columns: [
        { field: "id", name: chalk.cyan("ID") },
        { field: "vehicles", name: chalk.magenta("Vehicles") },
        { field: "kmTraveled", name: chalk.cyan("Km Traveled") },
        { field: "from", name: chalk.cyan("From") },
        { field: "to", name: chalk.cyan("To") },
    ]
}

const table = chalkTable(options, database.map(person => new Person(person).formatted('pt-BR')))
const print = console.draft(table)