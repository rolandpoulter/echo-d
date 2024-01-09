import EchoD, {
    // Context as EchoDContext,
    // Options as EchoDOptions,
    Node as EchoDNode
} from '../lib/index.js'

// const echoDOptions = new EchoDOptions({}, EchoDNode.actions)
// const echoDContext = new EchoDContext({}, options, MiniplexStorage)

const echoD = new EchoD(
    // echoDOptions,
    {},
    // echoDContext,
    {},
    EchoDNode.actions,
)

export default echoD
