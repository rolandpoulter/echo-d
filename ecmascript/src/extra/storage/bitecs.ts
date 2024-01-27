import {
    Storage,
    StorageOptions,
    StorageProps,
    Components, 
    Types
} from '../../storage';

import { ArrayTypes } from '../../types';
import { paginate, now } from '../../utils';

// interface WorldOptions {
//     defs: any[];
//     [key: string]: any;
// }

const {
    createWorld,
    // Types,
    defineComponent,
    removeComponent,
    removeEntity,
    // defineQuery,
    addEntity,
    addComponent,
    // pipe,
} = await import('bitecs')

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

export class BitECSStorage extends Storage {
    declare eids: Map<string, any>;
    declare world: any;
    declare actors: Map<string, any> & string[];
    declare entities: Map<string, any> & string[];
    declare components: Map<string, any> & { [key: string]: any };

    declare worldOptions: any;

    constructor(storage: BitECSStorage | StorageProps, options: StorageOptions) {
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
            } else switch (type) {
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
            worldOptions,
        } = options

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

    destroyActor(id: string): boolean {
        return this.destroyId(this.actors, id);
    }

    destroyComponent(id: string, key: string) {
        const eid = this.actors.get(id) || this.entities.get(id);
        const Component = this.components.get(key);
        if (!eid || !Component) {
            return;
        }
        const updateIndexes = () => {
            const prevValue = this.fetchComponent(id, key)
            if (this.indexes[key]) {
                const index = this.indexes[key]
                if (this.isActor(id)) {
                    index.actors.remove(id, prevValue)
                } else {
                    index.entities.remove(id, prevValue)
                }
            }
        }
        if (Component instanceof Map) {
            const entity = Component.get(eid);
            if (entity) {
                Component.delete(eid);
            }
            updateIndexes()
        } else {
            removeComponent(this.world, Component, eid);
            updateIndexes()
        }
    }

    destroyEntity(id: string): boolean {
        return this.destroyId(this.entities, id);
    }

    destroyId(list: Map<string, number> | any, id: string): boolean {
        const eid = list.get(id);
        if (eid) {
            removeEntity(this.world, eid);
            list.delete(id);
            return true
        }
        return false
    }

    fetchComponents(id: string) {
        const eid = this.actors.get(id) || this.entities.get(id);
        if (!eid) {
            return;
        }
        return eid
    }

    fetchComponent(id: string, key: string) {
        const eid = this.actors.get(id) || this.entities.get(id);
        const Component = this.components.get(key);
        if (!eid || !Component) {
            return;
        }
        if (Component instanceof Map) {
            return Component.get(eid);
        } else {
            const type = this.types[key];
            const schema = type[3]
            const Type = ArrayTypes.get(type[0])
            const size = type[1]
            const value = new Type(size)
            let i = 0
            for (let prop in schema) {
                value[i] = Component[prop][eid]
                i++
            }
            return value
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

    storeActor(id: string): boolean {
        return this.storeId(this.actors, id);
    }

    storeComponent(id: string, key: string, value: any) {
        const entity = this.actors.get(id) || this.entities.get(id);
        if (entity) {
            const prevValue = entity[key]
            // entity[key] = value
            
            // const type = this.types[key];
            // const schema = type[3]
            const component = this.components.get(key);
            // let i = 0;
            // for (let prop in schema) {
            //     component[prop] = value[i]
            //     i++
            // }
            addComponent(this.world, entity, component, value);
            // this.world.reindex(entity)
            if (this.indexes[key]) {
                const index = this.indexes[key]
                if (this.isActor(id)) {
                    index.actors.remove(id, prevValue)
                    index.actors.set(id, value)
                } else {
                    index.entities.remove(id, prevValue)
                    index.entities.set(id, value)
                }
            }
        }
    }

    storeEntity(id: string): boolean {
        return this.storeId(this.entities, id);
    }

    storeId(list: Map<string, string> | any, id: string): boolean {
        let entity = list.get(id);
        if (!entity) {
            entity = addEntity(this.world);
            list.set(id, entity);
            return true
        }
        return false
    }

    storeInput(id: string, input: any, tick: number = now()) {
        return super.storeInput(id, input, tick);
    }
}
