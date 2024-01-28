import { Storage,
// Types
 } from '../../storage.js';
import { paginate, now } from '../../utils.js';
const { World, } = await import('miniplex/dist/miniplex.cjs.js');
export class MiniplexStorage extends Storage {
    constructor(storage, options) {
        super({
            ...(storage || {}),
            actors: new Map(),
            // components: new Map(),
            components: null,
            entities: new Map(),
            // inputs: new Map(),
            inputs: null,
        }, options);
        const { worldOptions = [], world = null, } = options;
        this.worldOptions = worldOptions;
        this.world = world || new World();
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
    destroyActor(id) {
        return this.destroyId(this.actors, id);
    }
    destroyComponent(id, key) {
        const entity = this.derefEntity(id);
        if (entity) {
            const prevValue = entity[key];
            // delete entity[key]
            this.world.removeComponent(entity, key);
            // this.world.reindex(entity)
            this.removeComponentsIndex(id, key, prevValue);
        }
    }
    destroyEntity(id) {
        return this.destroyId(this.entities, id);
    }
    destroyId(list, id) {
        const entity = list.get(id);
        if (entity) {
            this.world.remove(entity);
            list.delete(id);
            return true;
        }
        return false;
    }
    findComponents(id) {
        const entity = this.derefEntity(id);
        if (entity) {
            return entity;
        }
    }
    findComponent(id, key) {
        const entity = this.derefEntity(id);
        if (entity) {
            return entity[key];
        }
    }
    getActors(query = null, pageSize) {
        if (query !== null) {
            return super.getActors(query, pageSize);
        }
        const actors = Array.from(this.actors.keys());
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
            const actors = Array.from(this.actors.keys());
            const entities = Array.from(this.entities.keys());
            ids = actors.concat(entities);
        }
        const pages = paginate(ids, pageSize);
        return pages.map((page) => {
            const components = {};
            for (let id of page) {
                components[id] = this.derefEntity(id);
            }
            return components;
        });
    }
    getEntities(query = null, pageSize) {
        if (query !== null) {
            return super.getEntities(query, pageSize);
        }
        const entities = Array.from(this.entities.keys());
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
        const entity = this.derefEntity(id);
        if (entity) {
            const prevValue = entity[key];
            this.world.addComponent(entity, key, value);
            // this.world.reindex(entity)
            this.updateComponentsIndex(id, key, prevValue, value);
        }
    }
    storeEntity(id) {
        return this.storeId(this.entities, id);
    }
    storeId(list, id) {
        let entity = list.get(id);
        if (!entity) {
            entity = {};
            list.set(id, entity);
            this.world.add(entity);
            return true;
        }
        return false;
    }
    storeInput(id, input, tick = now()) {
        return super.storeInput(id, input, tick);
    }
}
