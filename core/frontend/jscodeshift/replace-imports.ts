/* Replace named imports to alias import

For instance:

import { TablerIcon,getRandomArbitrary } from "../../../../../shared";


getRandomArbitrary(1,10)
<TablerIcon/>

To :

import { SharedUi,SharedHelpers } from "../../../../../shared";

SharedHelpers.getRandomArbitrary(1,10)
<SharedUi.TablerIcon/>

*/

import core, { FileInfo, API, Collection, ImportDeclaration, ExpressionStatement, Identifier, JSXIdentifier } from 'jscodeshift';

import * as items from "./Items"

const sharedName = 'shared';

function transform(fileInfo: FileInfo, api: API) {
    const j = api.jscodeshift;
    const root = j(fileInfo.source);

    const importMap = {
        messages: items.MessagesItems,
        SharedHelpers: items.HelpersItems,
        SharedHooks: items.HooksItems,
        SharedConsts: items.ConstsItems,
        SharedTypes: items.TypesItems,
        SharedUi: items.UiItems
    };

    root.find(j.ImportDeclaration)
        .filter(path => typeof path.node.source.value === 'string' && path.node.source.value.includes(sharedName))
        .forEach(path => {
            path?.node?.specifiers?.forEach(specifier => {
                if (!specifier?.local?.name) return

                const name = specifier?.local?.name;

                for (const [group, arr] of Object.entries(importMap)) {
                    if (arr.includes(name)) {
                        specifier.local.name = group;
                        break;
                    }
                }
            });
        });

    root.find(j.Identifier)
        .forEach(path => {
            const name = path.node.name;
            for (const [group, arr] of Object.entries(importMap)) {
                if (arr.includes(name)) {
                    path.node.name = `${group}.${name}`;
                    break;
                }
            }
        });

    return root.toSource();
};

export default transform;