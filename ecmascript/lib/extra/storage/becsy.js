import { AsyncStorage, } from '../../storage/async.js';
import { ArrayTypes } from '../../types.js';
import { paginate, now } from '../../utils.js';
const { 
// System,
// Type,
World } = await import('@lastolivegames/becsy/index.js');
/*
export function defaultGetGroupedValue (value: any | any[], i: number, types: Types, key: string): any {
    const type = types[key]
    if (Array.isArray(type)) {
        return value.slice(i * type[1], (i + 1) * type[1])
    }
    return value[i]
}

export function defaultSetGroupedValue (value: any, _types: Types, _key: string): any {
    return value;
}
*/
export class BecsyStorage extends AsyncStorage {
    // declare eids: Map<string, any>;
    constructor(storage, options) {
        super({
            ...(storage || {}),
            actors: new Map(),
            components: new Map(),
            entities: new Map(),
            // inputs: new Map(),
            inputs: null,
        }, options);
        const { 
        // types,
        // indexes,
        worldOptions = { defs: [] }, world = null, } = options;
        for (let key in this.types) {
            const type = this.types[key];
            if (typeof type[0] === 'string') {
                this.components.set(key, type[2]);
            }
            else
                switch (type) {
                    case Boolean:
                    case Number:
                    case String:
                        this.components.set(key, new Map());
                        break;
                }
        }
        if (worldOptions && !worldOptions.defs) {
            worldOptions.defs = [];
        }
        // if (!((worldOptions as WorldOptions).defs as any[]).length) {
        for (let component of this.components.values()) {
            if (!component) {
                continue;
            }
            if (component instanceof Map) {
                continue;
            }
            if (worldOptions.defs.indexOf(component) === -1) {
                worldOptions.defs.push(component);
            }
        }
        // }
        this.worldOptions = worldOptions;
        this.world = world || World.create(this.worldOptions);
        /*
        this.eids = storage?.eids || new Map();
        
        for (let key in this.actors) {
            this.eids.set(key, addEntity(this.world));
        }

        for (let key in this.entities) {
            this.eids.set(key, addEntity(this.world));
        }

        for (let key in this.components) {
            for (let id in this.components[key]) {
                addComponent(this.world, this.components[key][id], this.ids[id]);
            }
        }
        */
    }
    async cleanup() {
        const world = await this.world;
        try {
            world.__dispatcher.registry.releaseComponentTypes();
            await world.terminate();
        }
        catch (err) {
            // console.warn(err)
        }
    }
    derefEntity(id) {
        if (this.actors.has(id)) {
            return this.actors.get(id);
        }
        if (this.entities.has(id)) {
            return this.entities.get(id);
        }
        return;
    }
    async destroyActor(id) {
        return this.destroyId(this.actors, id);
    }
    async destroyComponent(id, key) {
        const entity = this.derefEntity(id);
        const Component = this.components.get(key);
        if (entity === null || entity === undefined || !Component) {
            return;
        }
        const updateIndexes = () => {
            const prevValue = this.findComponent(id, key);
            this.removeComponentsIndex(id, key, prevValue);
        };
        if (Component instanceof Map) {
            const entity = Component.get(id);
            if (entity) {
                Component.delete(id);
            }
            updateIndexes();
        }
        else {
            // removeComponent(this.world, Component, eid);
            updateIndexes();
        }
    }
    async destroyEntity(id) {
        return this.destroyId(this.entities, id);
    }
    async destroyId(list, id) {
        const entity = list.get(id);
        if (entity) {
            entity.delete();
            list.delete(id);
            return true;
        }
        return false;
    }
    async findComponents(id) {
        const entity = this.derefEntity(id);
        if (entity === null || entity === undefined) {
            return;
        }
        return entity;
    }
    findComponent(id, key) {
        const _ = undefined;
        return this.findComponentProcess(id, key, _, _);
    }
    findComponentProcess(id, key, entity, Component) {
        entity = (entity === null || entity === undefined) ? this.derefEntity(id) : entity;
        Component = Component || this.components.get(key);
        if (entity === null || entity === undefined || !Component) {
            return;
        }
        if (Component instanceof Map) {
            return Component.get(id);
        }
        else {
            const type = this.types[key];
            const schema = type[3];
            const Type = ArrayTypes.get(type[0]);
            const size = type[1];
            const value = new Type(size);
            const view = entity.has(Component) ? entity.read(Component) : undefined;
            let i = 0;
            if (view === null || view === undefined) {
                return value;
            }
            for (let prop in schema) {
                if (prop === '$val') {
                    value.set(view);
                    break;
                }
                value[i] = view[prop];
                i++;
            }
            return value;
        }
    }
    getActors(query = null, pageSize) {
        if (query !== null) {
            return super.getActors(query, pageSize);
        }
        const actors = Array.from(this.actors.keys());
        const pages = paginate(actors, pageSize);
        return pages;
        // return new Emitter<string[][]>(pages, true)
    }
    getComponents(query = null, pageSize) {
        // const queryKeys = Object.keys(query);
        // const entities = this.world.with(...queryKeys);
        let ids;
        if (query !== null) {
            ids = query;
        }
        else {
            const actors = this.actors.keys();
            const entities = this.entities.keys();
            ids = [
                ...actors,
                ...entities
            ];
        }
        const pages = paginate(ids, pageSize);
        const _ = undefined;
        return pages.map((page) => {
            const components = {};
            for (let id of page) {
                const entity = this.derefEntity(id);
                if (entity === null || entity === undefined) {
                    continue;
                }
                const compList = this.componentsIndex.get(id);
                const component = {};
                for (let key of compList) {
                    component[key] = this.findComponentProcess(id, key, entity, _);
                }
                components[id] = component;
            }
            return components;
        });
        // return pages;
        // return new Emitter<Components[]>(pages, true)
    }
    getEntities(query = null, pageSize) {
        if (query !== null) {
            return super.getEntities(query, pageSize);
        }
        const entities = this.entities.keys();
        const pages = paginate(entities, pageSize);
        return pages;
        // return new Emitter<string[][]>(pages, true)
    }
    getInputs(query = null, pageSize) {
        return super.getInputs(query, pageSize);
    }
    isActor(id) {
        return this.actors.has(id);
    }
    isEntity(id) {
        return this.entities.has(id);
    }
    async setActors(actors) {
        return super.setActors(actors);
    }
    async setComponents(components) {
        return super.setComponents(components);
    }
    async setEntities(entities) {
        return super.setEntities(entities);
    }
    async setInputs(inputs) {
        return super.setInputs(inputs);
    }
    async storeActor(id) {
        return await this.storeId(this.actors, id);
    }
    async storeComponent(id, key, value) {
        const entity = this.derefEntity(id);
        if (entity !== null && entity !== undefined) {
            const Component = this.components.get(key);
            if (!Component) {
                return;
            }
            if (!entity.has(Component)) {
                entity.add(Component, {});
            }
            let prevValue = [];
            if (Component instanceof Map) {
                prevValue = Component.get(id);
                Component.set(id, value);
            }
            else {
                // entity[key] = value
                const type = this.types[key];
                const schema = type[3];
                const component = entity.write(Component);
                let i = 0;
                for (let prop in schema) {
                    if (prop === '$val') {
                        component.set(value);
                        break;
                    }
                    component[prop] = value[i];
                    i++;
                }
                // const world = await this.world;
                // world.addComponent(entity, key, component);
            }
            await this.updateComponentsIndex(id, key, prevValue, value);
        }
    }
    async storeEntity(id) {
        return await this.storeId(this.entities, id);
    }
    async storeId(list, id) {
        let entity = list.get(id);
        if (entity === null || entity === undefined) {
            const world = await this.world;
            const entity = world.__dispatcher.createEntity([] // (this.worldOptions.defaultComponents || this.worldOptions.defs)
            );
            const reference = entity.__registry.holdEntity(entity.__id);
            // const reference = entity.hold();
            list.set(id, reference);
            return true;
        }
        return false;
    }
    async storeInput(id, input, tick = now()) {
        return super.storeInput(id, input, tick);
    }
}
