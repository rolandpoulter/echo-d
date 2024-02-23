import {
    // Storage,
    StorageOptions,
    StorageProps,
    Components,
    // Types,
    Inputs,
} from '../../storage';

import { Emitter } from '../../emitter';

import {
    AsyncStorage,
} from '../../storage/async';

import { ArrayTypes } from '../../types';
import { paginate, now } from '../../utils';

interface WorldOptions {
    defs: any[];
    [key: string]: any;
}

const {
    // System,
    // Type,
    World
} = await import('@lastolivegames/becsy/index.js');

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
    declare actors: Map<string, any> & string[];
    declare entities: Map<string, any> & string[];
    declare components: Map<string, any> & { [key: string]: any };
    
    declare worldOptions: any;
    declare world: any;
    
    // declare eids: Map<string, any>;
    
    constructor(storage: BecsyStorage | StorageProps, options: StorageOptions) {
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
            worldOptions = { defs: [] },
            world = null,
        } = options

        for (let key in this.types) {
            const type = this.types[key];
            if (typeof type[0] === 'string') {
                this.components.set(key, type[2]);
            } else switch (type) {
                case Boolean:
                case Number:
                case String:
                    this.components.set(key, new Map());
                    break;
            }
        }

        if (worldOptions && !(worldOptions as WorldOptions).defs) {
            (worldOptions as WorldOptions).defs = []
        }

        // if (!((worldOptions as WorldOptions).defs as any[]).length) {
        for (let component of this.components.values()) {
            if (!component) {
                continue
            }
            if ((component as any) instanceof Map) {
                continue
            }
            if ((worldOptions as WorldOptions).defs.indexOf(component) === -1) {
                (worldOptions as WorldOptions).defs.push(component)
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
            await world.terminate()
        } catch (err) {
            // console.warn(err)
        }
    }

    derefEntity(id: string) {
        if (this.actors.has(id)) {
            return this.actors.get(id)
        }
        if (this.entities.has(id)) {
            return this.entities.get(id)
        }
        return;
    }
    
    async destroyActor(id: string): Promise<boolean> {
        return this.destroyId(this.actors, id);
    }

    async destroyComponent(id: string, key: string) {
        const entity = this.derefEntity(id);
        const Component = this.components.get(key);
        if (entity === null || entity === undefined || !Component) {
            return;
        }
        const updateIndexes = () => {
            const prevValue = this.findComponent(id, key)
            this.removeComponentsIndex(id, key, prevValue)
        }
        if (Component instanceof Map) {
            const entity = Component.get(id);
            if (entity) {
                Component.delete(id);
            }
            updateIndexes()
        } else {
            // removeComponent(this.world, Component, eid);
            updateIndexes()
        }
    }

    async destroyEntity(id: string): Promise<boolean> {
        return this.destroyId(this.entities, id);
    }

    async destroyId(list: Map<string, number> | any, id: string): Promise<boolean> {
        const entity = list.get(id);
        if (entity) {
            entity.delete();
            list.delete(id);
            return true
        }
        return false
    }

    async findComponents(id: string) {
        const entity = this.derefEntity(id);
        if (entity === null || entity === undefined) {
            return;
        }
        return entity
    }

    findComponent(id: string, key: string) {
        const _ = undefined
        return this.findComponentProcess(id, key, _, _)
    }

    findComponentProcess(id: string, key: string, entity: any, Component: any) {
        entity = (entity === null || entity === undefined) ? this.derefEntity(id) : entity;
        Component = Component || this.components.get(key);
        if (entity === null || entity === undefined || !Component) {
            return;
        }
        if (Component instanceof Map) {
            return Component.get(id);
        } else {
            const type = this.types[key];
            const schema = type[3]
            const Type = ArrayTypes.get(type[0])
            const size = type[1]
            const value = new Type(size)
            const view = entity.has(Component) ? entity.read(Component) : undefined
            let i = 0
            if (view === null || view === undefined) {
                return value
            }
            for (let prop in schema) {
                if (prop === '$val') {
                    value.set(view)
                    break
                }
                value[i] = (view as any)[prop]
                i++
            }
            return value
        }
    }

    getActors(): Emitter<string[]> | string[] {
        return super.getActors();
    }

    getComponents(): Emitter<Components> | Components {
        return super.getComponents();
    }

    getEntities(): Emitter<string[]> | string[] {
        return super.getEntities();
    }

    getInputs(): Emitter<Inputs> | Inputs {
        return super.getInputs();
    }

    isActor(id: string) {
        return this.actors.has(id);
    }

    isEntity(id: string) {
        return this.entities.has(id);
    }

    listActors(query: any = null, pageSize: number): Emitter<string[][]> | string[][] {
        if (query !== null) {
            return super.listActors(query, pageSize);
        }
        const actors = Array.from(this.actors.keys())
        const pages = paginate(actors, pageSize)
        return pages;
        // return new Emitter<string[][]>(pages, true)
    }

    listComponents(query: any = null, pageSize: number): Emitter<Components[]> | Components[] {
        // const queryKeys = Object.keys(query);
        // const entities = this.world.with(...queryKeys);
        let ids
        if (query !== null) {
            ids = query
        } else {
            const actors = this.actors.keys()
            const entities = this.entities.keys()
            ids = [
                ...actors,
                ...entities
            ]
        }
        const pages = paginate(ids, pageSize)
        const _ = undefined
        return pages.map((page) => {
            const components: { [key: string]: any } = {}
            for (let id of page) {
                const entity = this.derefEntity(id)
                if (entity === null || entity === undefined) {
                    continue
                }
                const compList: string[] = this.componentsIndex.get(id) ?? []
                const component: { [key: string]: any } = {}
                for (let key of compList) {
                    component[key] = this.findComponentProcess(id, key, entity, _)
                }
                components[id] = component
            }
            return components
        })
        // return pages;
        // return new Emitter<Components[]>(pages, true)
    }

    listEntities(query: any = null, pageSize: number): Emitter<string[][]> | string[][] {
        if (query !== null) {
            return super.listEntities(query, pageSize);
        }
        const entities = this.entities.keys()
        const pages = paginate(entities, pageSize)
        return pages;
        // return new Emitter<string[][]>(pages, true)
    }

    listInputs(query: any = null, pageSize: number): Emitter<Inputs[]> | Inputs[] {
        return super.listInputs(query, pageSize);
    }

    async setActors(actors: string[]) {
        return super.setActors(actors);
    }

    async setComponents(components: Components) {
        return super.setComponents(components);
    }

    async setEntities(entities: any) {
        return super.setEntities(entities);
    }

    async setInputs(inputs: any) {
        return super.setInputs(inputs);
    }

    async storeActor(id: string): Promise<boolean> {
        return await this.storeId(this.actors, id);
    }

    async storeComponent(id: string, key: string, value: any) {
        const entity = this.derefEntity(id);
        if (entity !== null && entity !== undefined) {
            const Component = this.components.get(key);

            if (!Component) {
                return;
            }

            let prevValue = []

            if (Component instanceof Map) {
                prevValue = Component.get(id);
                Component.set(id, value);
            } else {
                if (!entity.has(Component)) {
                    entity.add(Component, {});
                }
    
                // entity[key] = value
                const type = this.types[key];
                const schema = type[3]
                const component: { [key: string]: any } = entity.write(Component)
                let i = 0;
                for (let prop in schema) {
                    if (prop === '$val') {
                        component.set(value)
                        break
                    }
                    component[prop] = value[i]
                    i++
                }
                // const world = await this.world;
                // world.addComponent(entity, key, component);
            }

            await this.updateComponentsIndex(id, key, prevValue, value)
        }
    }

    async storeEntity(id: string): Promise<boolean> {
        return await this.storeId(this.entities, id);
    }

    async storeId(list: Map<string, string> | any, id: string): Promise<boolean> {
        let entity = list.get(id);
        if (entity === null || entity === undefined) {
            const world = await this.world
            const entity = world.__dispatcher.createEntity(
                [] // (this.worldOptions.defaultComponents || this.worldOptions.defs)
            )
            const reference = entity.__registry.holdEntity(entity.__id)
            // const reference = entity.hold();
            list.set(id, reference);
            return true
        }
        return false
    }

    async storeInput(id: string, input: any, tick: number = now()): Promise<number> {
        return super.storeInput(id, input, tick);
    }
}
