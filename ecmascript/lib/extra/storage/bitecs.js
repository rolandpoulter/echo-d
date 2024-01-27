import { hasComponent } from 'bitecs';
import { Storage } from '../../storage.js';
import { ArrayTypes } from '../../types.js';
import { paginate } from '../../utils.js';
// interface WorldOptions {
//     defs: any[];
//     [key: string]: any;
// }
const { createWorld, 
// Types,
defineComponent, removeComponent, removeEntity, 
// defineQuery,
entityExists, addEntity, addComponent, getEntityComponents,
// pipe,
 } = await import('bitecs');
export function defaultGetGroupedValue(value, i, types, key) {
    const type = types[key];
    if (Array.isArray(type)) {
        return value.slice(i * type[1], (i + 1) * type[1]);
    }
    return value[i];
}
export function defaultSetGroupedValue(value, _types, _key) {
    return value;
}
export class BitECSStorage extends Storage {
    constructor(storage, options) {
        super({
            ...(storage || {}),
            actors: new Map(),
            components: new Map(),
            entities: new Map(),
            // inputs: new Map(),
            inputs: null,
        }, options);
        for (let key in this.types) {
            const type = this.types[key];
            if (typeof type[0] === 'string') {
                this.components.set(key, type[2] || defineComponent(type[3], type[4]));
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
        let { 
        // types,
        // indexes,
        worldOptions, } = options;
        /*
        worldOptions = worldOptions || { defs: [] }

        if (worldOptions && !(worldOptions as WorldOptions).defs) {
            (worldOptions as WorldOptions).defs = []
        }

        if (!((worldOptions as WorldOptions).defs as any[]).length) {
             for (let component of this.components.values()) {
                if (!component) {
                    continue
                }
                if ((component as any) instanceof Map) {
                    continue
                }
                (worldOptions as WorldOptions).defs.push(component)
            }
        }
        */
        this.worldOptions = worldOptions;
        this.world = storage?.world || createWorld(); // worldOptions);
        this.eids = storage?.eids || new Map();
        /*
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
    destroyActor(id) {
        return this.destroyId(this.actors, id);
    }
    destroyComponent(id, key) {
        const eid = this.getEID(id);
        const Component = this.components.get(key);
        if ((eid === undefined || eid === null) || !Component) {
            return;
        }
        const updateIndexes = () => {
            const prevValue = this.fetchComponentProcess(id, key, Component, eid);
            if (this.indexes[key]) {
                const index = this.indexes[key];
                if (this.isActor(id)) {
                    index.actors.remove(id, prevValue);
                }
                else {
                    index.entities.remove(id, prevValue);
                }
            }
        };
        if (Component instanceof Map) {
            if (Component.has(eid)) {
                Component.delete(eid);
            }
            updateIndexes();
        }
        else {
            if (entityExists(this.world, eid)) {
                if (hasComponent(this.world, Component, eid)) {
                    removeComponent(this.world, Component, eid);
                }
            }
            updateIndexes();
        }
    }
    destroyEntity(id) {
        return this.destroyId(this.entities, id);
    }
    destroyId(list, id) {
        const eid = list.get(id);
        if (eid !== null && eid !== undefined) {
            if (entityExists(this.world, eid)) {
                removeEntity(this.world, eid);
            }
            if (list.has(id)) {
                list.delete(id);
            }
            return true;
        }
        return false;
    }
    fetchComponents(id) {
        const eid = this.getEID(id);
        if (eid !== null && eid !== undefined) {
            return;
        }
        return eid;
    }
    fetchComponent(id, key) {
        return this.fetchComponentProcess(id, key, undefined, undefined);
    }
    fetchComponentProcess(id, key, Component, eid) {
        eid = (eid === undefined || eid === null) ? this.getEID(id) : eid;
        Component = Component || this.components.get(key);
        if ((eid !== null && eid !== undefined) || !Component) {
            return;
        }
        if (Component instanceof Map) {
            return Component.get(eid);
        }
        else {
            const type = this.types[key];
            const schema = type[3];
            const Type = ArrayTypes.get(type[0]);
            const size = type[1];
            const value = new Type(size);
            let i = 0;
            for (let prop in schema) {
                value[i] = Component[prop][eid];
                i++;
            }
            return value;
        }
    }
    getActors(query = null, pageSize) {
        if (query !== null) {
            return super.getActors(query, pageSize);
        }
        const actors = this.actors.keys();
        return paginate(actors, pageSize);
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
        const compEntries = this.components.entries();
        const compLookup = new Map();
        for (let [key, value] of compEntries) {
            compLookup.set(value, key);
        }
        return pages.map((page) => {
            const components = {};
            for (let id of page) {
                const eid = this.getEID(id);
                if (eid === undefined || eid === null) {
                    continue;
                }
                const entity = {};
                const compList = getEntityComponents(this.world, eid);
                compList.forEach((Component) => {
                    const key = compLookup.get(Component);
                    if (!key) {
                        return;
                    }
                    // TODO: fix this
                    // const val = this.fetchComponentProcess(id, key, Component, eid)
                    let val;
                    if (Component instanceof Map) {
                        val = Component.get(eid);
                    }
                    else {
                        const type = this.types[key];
                        const schema = type[3];
                        const Type = ArrayTypes.get(type[0]);
                        const size = type[1];
                        const value = new Type(size);
                        let i = 0;
                        for (let prop in schema) {
                            value[i] = Component[prop][eid];
                            i++;
                        }
                        val = value;
                    }
                    entity[key] = val;
                });
                components[id] = entity;
            }
            return components;
        });
    }
    getEntities(query = null, pageSize) {
        if (query !== null) {
            return super.getEntities(query, pageSize);
        }
        const entities = this.entities.keys();
        return paginate(entities, pageSize);
    }
    getInputs(query = null, pageSize) {
        return super.getInputs(query, pageSize);
    }
    getEID(id) {
        if (this.actors.has(id)) {
            return this.actors.get(id);
        }
        if (this.entities.has(id)) {
            return this.entities.get(id);
        }
        return;
    }
    isActor(id) {
        return this.actors.has(id);
    }
    isEntity(id) {
        return this.entities.has(id);
    }
    setActors(actors) {
        return super.setActors(actors);
    }
    setComponents(components) {
        return super.setComponents(components);
    }
    setEntities(entities) {
        return super.setEntities(entities);
    }
    setInputs(inputs) {
        return super.setInputs(inputs);
    }
    storeActor(id) {
        return this.storeId(this.actors, id);
    }
    storeComponent(id, key, value) {
        let entity = this.getEID(id);
        if (entity !== null && entity !== undefined) {
            if (!entityExists(this.world, entity)) {
                entity = addEntity(this.world);
                if (this.isActor(id)) {
                    // this.actors.delete(id);
                    this.actors.set(id, entity);
                }
                else {
                    // this.entities.delete(id);
                    this.entities.set(id, entity);
                }
            }
            const Component = this.components.get(key);
            if (!Component) {
                return;
            }
            if (!hasComponent(this.world, Component, entity)) {
                addComponent(this.world, Component, entity);
            }
            let prevValue = []; // TODO: fix this
            if (Component instanceof Map) {
                prevValue = Component.get(entity);
                Component.set(entity, value);
            }
            else {
                const type = this.types[key];
                const schema = type[3];
                let i = 0;
                for (let prop in schema) {
                    prevValue[i] = Component[prop][entity];
                    Component[prop][entity] = value[i];
                    i++;
                }
            }
            // this.world.reindex(entity)
            if (this.indexes[key]) {
                const index = this.indexes[key];
                if (this.isActor(id)) {
                    index.actors.remove(id, prevValue);
                    index.actors.set(id, value);
                }
                else {
                    index.entities.remove(id, prevValue);
                    index.entities.set(id, value);
                }
            }
        }
    }
    storeEntity(id) {
        return this.storeId(this.entities, id);
    }
    storeId(list, id) {
        let entity = list.get(id);
        if (entity == null && entity == undefined) {
            entity = addEntity(this.world);
            list.set(id, entity);
            return true;
        }
        else if (!entityExists(this.world, entity)) {
            // list.delete(id);
            entity = addEntity(this.world);
            list.set(id, entity);
            return true;
        }
        return false;
    }
    storeInput(id, input, tick = 0) {
        return super.storeInput(id, input, tick);
    }
}
