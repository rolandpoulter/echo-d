import {
    Storage,
    StorageOptions,
    StorageProps,
    Components,
    // Types
} from '../../storage';

import { paginate, now } from '../../utils';
import { InputPayload } from '../../actions/actor';

const {
    World,
} = await import('miniplex/dist/miniplex.cjs.js');

export class MiniplexStorage extends Storage {
    declare actors: Map<string, any> & string[];
    declare entities: Map<string, any> & string[];
    declare components: Map<string, any> & { [key: string]: any };
    // declare inputs: Map<string, any> & string[];
    
    declare worldOptions: any;
    declare world: any;

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
            world = null,
        } = options;

        this.worldOptions = worldOptions;
        this.world = world || new World();
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

    destroyActor(id: string): boolean {
        return this.destroyId(this.actors, id);
    }

    destroyComponent(id: string, key: string) {
        const entity = this.derefEntity(id);
        if (entity) {
            const prevValue = entity[key]
            // delete entity[key]
            this.world.removeComponent(entity, key);
            // this.world.reindex(entity)
            this.removeComponentsIndex(id, key, prevValue);
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

    findComponents(id: string) {
        const entity = this.derefEntity(id);
        if (entity) {
            return entity;
        }
    }

    findComponent(id: string, key: string) {
        const entity = this.derefEntity(id);
        if (entity) {
            return entity[key];
        }
    }

    getActors() {
        return super.getActors();
    }

    getComponents() {
        return super.getComponents();
    }

    getEntities() {
        return super.getEntities();
    }

    getInputs() {
        return super.getInputs();
    }

    isActor(id: string) {
        return this.actors.has(id);
    }

    isEntity(id: string) {
        return this.entities.has(id);
    }

    listActors(query: any = null, pageSize: number) {
        if (query !== null) {
            return super.listActors(query, pageSize);
        }
        const actors = Array.from(this.actors.keys())
        return paginate(actors, pageSize)
    }

    listComponents(query: any = null, pageSize: number) {
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
                components[id] = this.derefEntity(id)
            }
            return components
        })
    }

    listEntities(query: any = null, pageSize: number) {
        if (query !== null) {
            return super.listEntities(query, pageSize);
        }
        const entities = Array.from(this.entities.keys())
        return paginate(entities, pageSize)
    }

    listInputs(query: any = null, pageSize: number) {
        return super.listInputs(query, pageSize);
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
        const entity = this.derefEntity(id);
        if (entity) {
            const prevValue = entity[key]
            // if (entity[key] === undefined || entity[key] === null) {
            //     this.world.addComponent(entity, key, value);
            // }
            entity[key] = value;
            this.world.reindex(entity)
            this.updateComponentsIndex(id, key, prevValue, value);
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
