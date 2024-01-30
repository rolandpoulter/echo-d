import { hasComponent } from 'bitecs';
import { Storage,
// Types
 } from '../../storage.js';
import { ArrayTypes } from '../../types.js';
import { paginate } from '../../utils.js';
// interface WorldOptions {
//     defs: any[];
//     [key: string]: any;
// }
const bitecs = await import('bitecs');
const { createWorld, 
// Types,
defineComponent, removeComponent, removeEntity, 
// defineQuery,
entityExists, addEntity, addComponent, 
// getEntityComponents,
resetWorld, deleteWorld,
// pipe,
 } = bitecs;
export class BitECSStorage extends Storage {
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
        worldOptions, world, } = options;
        this.worldOptions = worldOptions;
        this.world = world || createWorld(); // worldOptions);
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
    cleanup(reset = false) {
        resetWorld(this.world);
        deleteWorld(this.world);
        if (reset && bitecs.resetGlobals) {
            bitecs.resetGlobals();
        }
    }
    derefEntityId(id) {
        if (this.actors.has(id)) {
            return this.actors.get(id);
        }
        if (this.entities.has(id)) {
            return this.entities.get(id);
        }
        return;
    }
    destroyActor(id) {
        return this.destroyId(this.actors, id);
    }
    destroyComponent(id, key) {
        const eid = this.derefEntityId(id);
        const Component = this.components.get(key);
        if ((eid === undefined || eid === null) || !Component) {
            return;
        }
        const updateIndexes = () => {
            const prevValue = this.findComponentProcess(id, key, Component, eid);
            this.removeComponentsIndex(id, key, prevValue);
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
    findComponents(id) {
        const eid = this.derefEntityId(id);
        if (eid === null || eid === undefined) {
            return;
        }
        return eid;
    }
    findComponent(id, key) {
        const _ = undefined;
        return this.findComponentProcess(id, key, _, _);
    }
    findComponentProcess(id, key, eid, Component) {
        eid = (eid === undefined || eid === null) ? this.derefEntityId(id) : eid;
        Component = Component || this.components.get(key);
        if (eid === null || eid === undefined || !Component) {
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
        const _ = undefined;
        return pages.map((page) => {
            const components = {};
            for (let id of page) {
                const eid = this.derefEntityId(id);
                if (eid === undefined || eid === null) {
                    continue;
                }
                const entity = {};
                const compList = this.componentsIndex.get(id) ?? [];
                for (let key of compList) {
                    entity[key] = this.findComponentProcess(id, key, eid, _);
                }
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
        let entity = this.derefEntityId(id);
        if (entity !== null && entity !== undefined) {
            if (!entityExists(this.world, entity)) {
                entity = addEntity(this.world);
                if (this.isActor(id)) {
                    this.actors.set(id, entity);
                }
                else {
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
            let prevValue = []; // TODO: create an array or object based on the type
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
            this.updateComponentsIndex(id, key, prevValue, value);
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
