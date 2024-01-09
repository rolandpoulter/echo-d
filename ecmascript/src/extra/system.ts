import { Handler } from '../handler';
import { Options } from '../options';
import { Context } from '../context';
import { Storage } from '../storage';

export class System {
    static query (handler: Handler, query: any): Set<any> {
        return handler.queryComponents(query)
    }

    declare handler: Handler;
    declare exclude: Set<string>;
    declare components: Set<string>;
    declare entities: Set<any>;

    constructor (handler: Handler, components: Set<string>, exclude: Set<string> = new Set()) {
        this.handler = handler
        this.exclude = exclude
        this.components = components
    }
    
    query() {
        this.entities = System.query(this.handler, { with: this.components, without: this.exclude })
        return this.entities
    }
    
    execute (fn: (handler: Handler, entity: string) => void) {
        const entities = this.query()
        const handler = this.handler
        for (const entity of entities) {
            fn(handler, entity)
        }
    }
}

export function executeSystems (systems: System[], fn: (handler: Handler, entity: string) => void) {
    for (const system of systems) {
        system.execute(fn)
    }
}

export class SystemHandler extends Handler {
    declare systems: System[];

    constructor (context: Context | any, options: Options | any, actions: Object, _Storage = Storage) {
        super(context, options, actions, _Storage)
        this.systems = []
    }

    createSystem (components: Set<string>, exclude: Set<string> = new Set(), _System = System) {
        const system = new _System(this, components, exclude)
        this.systems.push(system)
        return system
    }

    removeSystem (system: System) {
        const index = this.systems.indexOf(system)
        if (index !== -1) {
            this.systems.splice(index, 1)
        }
    }

    executeSystems (fn: (handler: Handler, entity: string) => void) {
        executeSystems(this.systems, fn)
    }
}