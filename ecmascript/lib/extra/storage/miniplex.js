import { Storage } from '../../storage.js';
import { paginate } from '../../utils.js';
const { World, } = await import('miniplex/dist/miniplex.cjs.js');
export class MiniplexStorage extends Storage {
    // declare inputs: Map<string, any> & string[];
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
        const { worldOptions = [], } = options;
        this.world = storage?.world || new World(worldOptions);
    }
    destroyActor(id) {
        return this.destroyId(this.actors, id);
    }
    destroyComponent(id, key) {
        const entity = this.actors.get(id) || this.entities.get(id);
        if (entity) {
            const prevValue = entity[key];
            // delete entity[key]
            this.world.removeComponent(entity, key);
            // this.world.reindex(entity)
            this.componentsIndex.remove(id, key);
            if (this.indexes[key]) {
                const index = this.indexes[key];
                if (this.isActor(id)) {
                    index.actors.remove(id, prevValue);
                }
                else {
                    index.entities.remove(id, prevValue);
                }
            }
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
    fetchComponents(id) {
        const entity = this.actors.get(id) || this.entities.get(id);
        if (entity) {
            return entity;
        }
    }
    fetchComponent(id, key) {
        const entity = this.actors.get(id) || this.entities.get(id);
        if (entity) {
            return entity[key];
        }
    }
    getActors(query, pageSize) {
        if (query !== null) {
            return super.getActors(query, pageSize);
        }
        const actors = Array.from(this.actors.keys());
        return paginate(actors, pageSize);
    }
    getComponents(query, pageSize) {
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
                components[id] = this.actors.get(id) || this.entities.get(id);
            }
            return components;
        });
    }
    getEntities(query, pageSize) {
        if (query !== null) {
            return super.getEntities(query, pageSize);
        }
        const entities = Array.from(this.entities.keys());
        return paginate(entities, pageSize);
    }
    getInputs(query, pageSize) {
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
        const entity = this.actors.get(id) || this.entities.get(id);
        if (entity) {
            const prevValue = entity[key];
            // entity[key] = value
            this.world.addComponent(entity, key, value);
            // this.world.reindex(entity)
            this.componentsIndex.set(id, key);
            if (this.indexes[key]) {
                const index = this.indexes[key];
                if (this.isActor(id)) {
                    index.actors.store(id, value, prevValue);
                }
                else {
                    index.entities.store(id, value, prevValue);
                }
            }
        }
    }
    storeEntity(id) {
        return this.storeId(this.entities, id);
    }
    storeId(list, id) {
        const entity = list.get(id);
        if (!entity) {
            list.set(id, entity);
            this.world.add(entity);
            return true;
        }
        return false;
    }
    storeInput(id, input, tick = Date.now()) {
        return super.storeInput(id, input, tick);
    }
}
