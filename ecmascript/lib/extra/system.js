import { Handler } from '../handler.js';
import { Storage } from '../storage.js';
export class System {
    static query(handler, query) {
        return handler.queryComponents(query);
    }
    constructor(handler, name = '', components, exclude = new Set()) {
        this.name = name || this.constructor.name;
        this.handler = handler;
        this.exclude = exclude;
        this.components = components;
    }
    query() {
        this.entities = System.query(this.handler, { with: this.components, without: this.exclude });
        return this.entities;
    }
    execute(fn, data = null) {
        const entities = this.query();
        if (typeof data === 'function') {
            data = data(this);
        }
        for (const entity of entities) {
            fn(this, entity, data);
        }
    }
}
export function executeSystems(systems, fn, data = null) {
    for (const system of systems) {
        system.execute(fn, data);
    }
}
export function filterSystems(names, systems, lowercase = true) {
    return systems.filter(system => {
        const name = system.name;
        return names.includes(lowercase ? name.toLowerCase() : name);
    });
}
export class SystemHandler extends Handler {
    constructor(context, options, actions, _Storage = Storage) {
        super(context, options, actions, _Storage);
        this.systems = [];
    }
    createSystem(name = '', components, exclude = new Set(), _System = System) {
        const system = new _System(this, name, components, exclude);
        this.systems.push(system);
        return system;
    }
    removeSystem(system) {
        const index = this.systems.indexOf(system);
        if (index !== -1) {
            this.systems.splice(index, 1);
        }
    }
    executeSystems(fn, data = null, systems = this.systems) {
        if (typeof systems === 'function') {
            systems = systems(this);
        }
        if (typeof data === 'function') {
            data = data(this);
        }
        executeSystems(systems, fn, data);
    }
    filterSystems(names, lowercase = true, systems = this.systems) {
        if (typeof systems === 'function') {
            systems = systems(this);
        }
        return filterSystems(names, systems, lowercase);
    }
}
