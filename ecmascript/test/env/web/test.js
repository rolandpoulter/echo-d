// test('echo loaded', async () => {})

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { promises as fsPromises } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('echo', () => {
    beforeAll(async () => {
        // await page.goto('https://google.com');
        const testPath = join(__dirname, 'page/tester.html');
        const contentHtml = await fsPromises.readFile(testPath, { encoding: 'utf8' });
        await page.setContent(contentHtml);
    });
  
    it('can be loaded', async () => {
        const echoCheck = await page.evaluate(() => echoCheck())
        expect(echoCheck).toBe(true);
    });

    it('can create a context', async () => {
        const echoContextCheck = await page.evaluate(() => echoContextCheck())
        expect(echoContextCheck).toBe(true);
    });

    xit('can run context spec', async () => {
        const echoContextSpec = await page.evaluate(() => echoContextSpec())
        expect(echoContextSpec).toBe(true);
    })
});