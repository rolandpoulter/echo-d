import { System, SystemHandler, filterSystems } from '../lib/extra/system.js'

import { createEchoD } from './echo.js'

export function createSystems(echo) {
    echo.createSystem('position', new Set(['position']), new Set(), System)

    echo.createSystem('color', new Set(['color']))
}

export function executeColorSystem(echo) {
    echo.executeSystems(
        (system, entity, { store }) => {
            console.log('color', entity, store.fetchComponent(entity, 'color'))
        },
        (handler) => ({ store: handler.context.store, }),
        (handler) => filterSystems(handler.systems, ['color'])
    )
}

export function executePositionSystem(echo) {
    echo.executeSystems(
        (system, entity, { store }) => {
            console.log('position', entity, store.fetchComponent(entity, 'position'))
        },
        (handler) => ({ store: handler.context.store, }),
        (handler) => filterSystems(handler.systems, ['position'])
    )
}

export function executeAllSystems(echo) {
    echo.executeSystems(
        (system, entity, { store }) => {
            console.log(system.name, entity, store.fetchComponent(entity, system.name))
        },
        (handler) => ({ store: handler.context.store, }),
    )
}   

export const createSystemsEchoD = (options = {}, actions, Handler = SystemHandler) => createEchoD(options, Handler, actions)

export function systemsExample() {
    const echo = createSystemsEchoD()
    createSystems(echo)
    executeColorSystem(echo)
    executePositionSystem(echo)
    executeAllSystems(echo)
    return echo
}

export default systemsExample()
