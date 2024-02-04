import { parse, stringify } from 'https://deno.land/x/xml/mod.ts'

const xml = await Deno.readTextFile('test/report/deno-report.xml')

const report = parse(xml)

/*
<testsuites name="jest tests" tests="242" failures="0" errors="0" time="0.334">
  <testsuite name="echo" errors="0" failures="0" skipped="49" timestamp="2024-02-04T01:20:25" time="0.311" tests="242">
    <testcase classname="echo should be defined" name="echo should be defined" time="0.001">
        <skipped/>
        <failed/>
    </testcase>

--- deno needs to be fixed so it looks like jest ---

<testsuites name="deno test" tests="1" failures="0" errors="0" time="0.312">
    <testsuite name="https://deno.land/std@0.210.0/testing/_test_suite.ts" tests="1" disabled="0" errors="0" failures="0">
        <testcase name="echo" time="0.194" filename="https://deno.land/std@0.210.0/testing/_test_suite.ts" line="191" col="10">
            <properties>
                <property name="step[passed]" value="should be defined"/>
*/

const prolog = '<?xml version="1.0" encoding="UTF-8"?>';

const testsuite = {
    '@name': report.testsuites.testsuite.testcase['@name'],
    '@time': report.testsuites.testsuite.testcase['@time'],
    '@errors': 0,
    '@failures': 0,
    '@skipped': 0,
    '@tests': 0,
};

const testcase = [];
const properties = report.testsuites.testsuite.testcase.properties.property;
properties.forEach((property) => {
    const prop = {
        '@name': property['@value'],
        '@classname': property['@value'],
    }
    if (isFinite(property['@time'])) {
        prop['@time'] = property['@time']
    }
    testsuite['@tests'] += 1;
    switch (property['@name']) {
        // case 'step[passed]':
        //     prop.passed = {}
        //     break;
        case 'step[skipped]':
            prop.skipped = {}
            testsuite['@skipped'] += 1;
            break;
        case 'step[error]':
            prop.error = {}
            testsuite['@errors'] += 1;
            break;
        case 'step[failed]':
            prop.failed = {}
            testsuite['@failures'] += 1;
            break;
    }
    testcase.push(prop)
})

testsuite.testcase = testcase;

const output = {
    testsuites: {
        '@name': 'jest test',
        '@time': report.testsuites['@time'],
        '@tests': testsuite['@tests'],
        '@failures': testsuite['@failures'],
        '@errors': testsuite['@errors'],
        testsuite,
    }
}

const xmlOutput = prolog + '\n' + stringify(output)

await Deno.writeTextFile('test/report/jest-report.xml', xmlOutput)

// console.log(xmlOutput)

Deno.exit(0)