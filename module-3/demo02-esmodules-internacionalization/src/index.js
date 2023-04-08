import { save } from './repository.js'

import Person from './person.js';

import TerminalController from './terminalController.js';

import database from '../database.json';

const DEFAULT_LANG = 'pt-BR';
const STOP_TERM = ':q';

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop () {
    try {
        const answer = await terminalController.question("What??")
        console.log('answer:', answer)
        if (answer === STOP_TERM) {
            terminalController.closeTerminal();
            console.log('process finished!')
            return;
        }
        const person = Person.generateInstanceFromString(answer);
        terminalController.updateTable(person.formatted(DEFAULT_LANG))
        await save(person)
        
        mainLoop()
    }
    catch (err) {
        console.error(err)
        return mainLoop();
    }
}

await mainLoop();