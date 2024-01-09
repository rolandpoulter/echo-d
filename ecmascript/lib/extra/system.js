import { Handler } from '../handler.js';
import { Storage } from '../storage.js';
export class System {
    static query(handler, query) {
        return handler.queryComponents(query);
    }
    constructor(handler, components, exclude = new Set()) {
        this.handler = handler;
        this.exclude = exclude;
        this.components = components;
    }
    query() {
        this.entities = System.query(this.handler, { with: this.components, without: this.exclude });
        return this.entities;
    }
    execute(fn) {
        const entities = this.query();
        const handler = this.handler;
        for (const entity of entities) {
            fn(handler, entity);
        }
    }
}
export function executeSystems(systems, fn) {
    for (const system of systems) {
        system.execute(fn);
    }
}
export class SystemHandler extends Handler {
    constructor(context, options, actions, _Storage = Storage) {
        super(context, options, actions, _Storage);
        this.systems = [];
    }
    createSystem(components, exclude = new Set(), _System = System) {
        const system = new _System(this, components, exclude);
        this.systems.push(system);
        return system;
    }
    removeSystem(system) {
        const index = this.systems.indexOf(system);
        if (index !== -1) {
            this.systems.splice(index, 1);
        }
    }
    executeSystems(fn) {
        executeSystems(this.systems, fn);
    }
}
