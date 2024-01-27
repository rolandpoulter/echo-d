import {
    Storage,
    StorageOptions,
    StorageProps,
    Components,
    Types
} from '../../storage';

import { paginate, now } from '../../utils';
import { InputPayload } from '../../actions/actor';

const {
    World,
} = await import('miniplex/dist/miniplex.cjs.js');

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

export class MiniplexStorage extends Storage {
    declare world: any;
    declare actors: Map<string, any> & string[];
    declare entities: Map<string, any> & string[];
    declare components: Map<string, any> & { [key: string]: any };
    // declare inputs: Map<string, any> & string[];

    declare worldOptions: any;

    constructor(storage: MiniplexStorage | StorageProps, options: StorageOptions) {
        super({
            ...(storage || {}),
            actors: new Map(),
            // components: new Map(),
            components: null,
            entities: new Map(),
            // inputs: new Map(),
            inputs: null,
        }, options);

        const {
            worldOptions = [] as any[],
        } = options;

        this.worldOptions = worldOptions;
        this.world = storage?.world || new World();
    }

    destroyActor(id: string): boolean {
        return this.destroyId(this.actors, id);
    }

    destroyComponent(id: string, key: string) {
        const entity = this.actors.get(id) || this.entities.get(id);
        if (entity) {
            const prevValue = entity[key]
            // delete entity[key]
            this.world.removeComponent(entity, key);
            // this.world.reindex(entity)
            this.componentsIndex.remove(id, key);
            if (this.indexes[key]) {
                const index = this.indexes[key]
                if (this.isActor(id)) {
                    index.actors.remove(id, prevValue)
                } else {
                    index.entities.remove(id, prevValue)
                }
            }
        }
    }

    destroyEntity(id: string): boolean {
        return this.destroyId(this.entities, id);
    }

    destroyId(list: Map<string, string> | any, id: string): boolean {
        const entity = list.get(id);
        if (entity) {
            this.world.remove(entity);
            list.delete(id);
            return true
        }
        return false
    }

    fetchComponents(id: string) {
        const entity = this.actors.get(id) || this.entities.get(id);
        if (entity) {
            return entity;
        }
    }

    fetchComponent(id: string, key: string) {
        const entity = this.actors.get(id) || this.entities.get(id);
        if (entity) {
            return entity[key];
        }
    }

    getActors(query: any = null, pageSize: number) {
        if (query !== null) {
            return super.getActors(query, pageSize);
        }
        const actors = Array.from(this.actors.keys())
        return paginate(actors, pageSize)
    }

    getComponents(query: any = null, pageSize: number) {
        // const queryKeys = Object.keys(query);
        // const entities = this.world.with(...queryKeys);
        let ids
        if (query !== null) {
            ids = query
        } else {
            const actors = Array.from(this.actors.keys())
            const entities = Array.from(this.entities.keys())
            ids = actors.concat(entities)
        }
        const pages = paginate(ids, pageSize)
        return pages.map((page) => {
            const components: { [key: string]: any } = {}
            for (let id of page) {
                components[id] = this.actors.get(id) || this.entities.get(id)
            }
            return components
        })
    }

    getEntities(query: any = null, pageSize: number) {
        if (query !== null) {
            return super.getEntities(query, pageSize);
        }
        const entities = Array.from(this.entities.keys())
        return paginate(entities, pageSize)
    }

    getInputs(query: any = null, pageSize: number) {
        return super.getInputs(query, pageSize);
    }

    isActor(id: string) {
        return this.actors.has(id);
    }

    isEntity(id: string) {
        return this.entities.has(id);
    }

    setActors(actors: string[]) {
        return super.setActors(actors);
    }

    setComponents(components: Components) {
        return super.setComponents(components);
    }

    setEntities(entities: any) {
        return super.setEntities(entities);
    }

    setInputs(inputs: any) {
        return super.setInputs(inputs);
    }

    storeActor(id: string) {
        return this.storeId(this.actors, id);
    }

    storeComponent(id: string, key: string, value: any) {
        const entity = this.actors.get(id) || this.entities.get(id);
        if (entity) {
            const prevValue = entity[key]
            // entity[key] = value
            this.world.addComponent(entity, key, value);
            // this.world.reindex(entity)
            this.componentsIndex.set(id, key);
            if (this.indexes[key]) {
                const index = this.indexes[key]
                if (this.isActor(id)) {
                    index.actors.store(id, value, prevValue)
                } else {
                    index.entities.store(id, value, prevValue)
                }
            }
        }
    }

    storeEntity(id: string) {
        return this.storeId(this.entities, id);
    }

    storeId(list: any, id: string): boolean {
        let entity = list.get(id);
        if (!entity) {
            entity = {}
            list.set(id, entity);
            this.world.add(entity);
            return true
        }
        return false
    }

    storeInput(id: string, input: InputPayload, tick: number = now()) {
        return super.storeInput(id, input, tick);
    }
}
