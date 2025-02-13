/*
Copyright 2020 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import childProcess from 'child_process';

import HakEnv from '../../scripts/hak/hakEnv';
import { DependencyInfo } from '../../scripts/hak/dep';

export default async function(hakEnv: HakEnv, moduleInfo: DependencyInfo): Promise<void> {
    const tools = [['python3', '--version']]; // node-gyp uses python for reasons beyond comprehension

    for (const tool of tools) {
        await new Promise<void>((resolve, reject) => {
            const proc = childProcess.spawn(tool[0], tool.slice(1), {
                stdio: ['ignore'],
            });
            proc.on('exit', (code) => {
                if (code !== 0) {
                    reject("Can't find " + tool);
                } else {
                    resolve();
                }
            });
        });
    }
}
