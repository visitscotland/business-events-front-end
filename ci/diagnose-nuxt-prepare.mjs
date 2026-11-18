import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';

const require = createRequire(import.meta.url);
const packagePath = require.resolve('nuxt/package.json');
const { version, bin } = require(packagePath);
const entry = typeof bin === 'string' ? bin : bin.nuxt;

console.log(`Diagnosing Nuxt ${version} prepare on Node ${process.versions.node} (${process.platform}/${process.arch})`);
const result = spawnSync(process.execPath, [resolve(dirname(packagePath), entry), 'prepare'], {
    stdio: 'inherit',
});
console.log(`Nuxt prepare termination: ${JSON.stringify({
    status: result.status,
    signal: result.signal,
    error: result.error?.message,
})}`);
