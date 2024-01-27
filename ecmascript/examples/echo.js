import EchoD, {
    // Context as EchoDContext,
    // Options as EchoDOptions,
    Node as EchoDNode
} from '../lib/index.js'

// const echoDOptions = new EchoDOptions({}, EchoDNode.actions)
// const echoDContext = new EchoDContext({}, options, MiniplexStorage)

export const createEchoD = (options = {}, Handler = EchoD, actions = EchoDNode.actions) => new Handler(
    // echoDContext,
    {},
    // echoDOptions,
    options,
    actions,
)

export const getWorld = (echo) => echo.context.store.world

export function echoExample(options) {
    const echo = createEchoD(options)
    const world = getWorld(echo)
    return { echo, world }
}

export const Handler = EchoD

export default echoExample()