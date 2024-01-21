import { Handler } from '../handler';
import { Options } from '../options';
import { Context } from '../context';
import { Storage } from '../storage';

export class System {
    static query (handler: Handler, query: any): Set<any> {
        return handler.queryComponents(query)
    }

    declare name: string;
    declare handler: Handler;
    declare exclude: Set<string>;
    declare components: Set<string>;
    declare entities: Set<any>;

    constructor (handler: Handler, name: string = '', components: Set<string>, exclude: Set<string> = new Set()) {
        this.name = name || this.constructor.name
        this.handler = handler
        this.exclude = exclude
        this.components = components
    }
    
    query() {
        this.entities = System.query(this.handler, { with: this.components, without: this.exclude })
        return this.entities
    }
    
    execute (
        fn: (system: System, entity: string, data: any) => void,
        data: ((system: System) => any) | any = null
    ) {
        const entities = this.query()
        if (typeof data === 'function') {
            data = data(this)
        }
        for (const entity of entities) {
            fn(this, entity, data)
        }
    }
}

export function executeSystems (
    systems: System[],
    fn: (system: System, entity: string, data: any) => void,
    data: ((system: System) => any) | any = null
) {
    for (const system of systems) {
        system.execute(fn, data)
    }
}

export function filterSystems (
    names: string[],
    systems: System[],
    lowercase: boolean = true
) {
    return systems.filter(system => {
        const name = system.name
        return names.includes(lowercase ? name.toLowerCase() : name)
    })
}

export class SystemHandler extends Handler {
    declare systems: System[];

    constructor (context: Context | any, options: Options | any, actions: Object, _Storage = Storage) {
        super(context, options, actions, _Storage)
        this.systems = []
    }

    createSystem (name: string = '', components: Set<string>, exclude: Set<string> = new Set(), _System = System) {
        const system = new _System(this, name, components, exclude)
        this.systems.push(system)
        return system
    }

    removeSystem (system: System) {
        const index = this.systems.indexOf(system)
        if (index !== -1) {
            this.systems.splice(index, 1)
        }
    }

    executeSystems (
        fn: (system: System, entity: string, data: any) => void,
        data: ((handler: Handler) => any) | any = null,
        systems: ((handler: Handler) => System[]) | System[] = this.systems
    ) {
        if (typeof systems === 'function') {
            systems = systems(this)
        }
        if (typeof data === 'function') {
            data = data(this)
        }
        executeSystems(systems, fn, data)
    }

    filterSystems (
        names: string[],
        lowercase: boolean = true,
        systems: ((handler: Handler) => System[]) | System[] = this.systems
    ) {
        if (typeof systems === 'function') {
            systems = systems(this)
        }
        return filterSystems(names, systems, lowercase)
    }
}