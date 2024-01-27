// import { describe, it } from 'mocha'
// import { expect, mockFn } from 'earl'

import * as echo from '../../../../dist/module/lib.echo-d.js'

// import contextSpec from '../../../spec/context.js'

window.echoCheck = function checkEcho() {
    if (echo) {
        return true
    }
    return false
}

window.echoContextCheck = function checkEchoContext() {
    const { Context } = echo
    const context = new Context()
    if (context) {
        return true
    }
    return false
}

/*
window.echoContextSpec = function echoContextSpec() {
    const { Context } = echo
    try {
        contextSpec(Context, {
            describe,
            it,
            expect: expect,
            mock: mockFn,
        })
    } catch (err) {
        console.error(err)
        return false
    }
    return true;
}
*/