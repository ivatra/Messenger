/* Replace named imports to alias import

For instance:

<<<<<<< HEAD:core/frontend/jscodeshift/new-replace-imports.ts
import { TablerIcon,getRandomArbitrary } from "../../../../../shared";


getRandomArbitrary(1,10)
=======
import { TablerIcon,getRandomArbitrary,IUser } from "../../../../../shared";
import { Search } from "../../../../../shared";

interface Example extends IUser{
    a:number
}

getRandomArbitrary(1,10)
<Search/>
>>>>>>> detachedhead:jscodeshift/new-replace-imports.ts
<TablerIcon/>

To :

<<<<<<< HEAD:core/frontend/jscodeshift/new-replace-imports.ts
import { SharedUi,SharedHelpers } from "../../../../../shared";
=======
import { SharedUi,SharedHelpers,SharedTypes } from "../../../../../shared";

interface Example extends SharedTypes.IUser{
    a:number
}
>>>>>>> detachedhead:jscodeshift/new-replace-imports.ts

SharedHelpers.getRandomArbitrary(1,10)
<SharedUi.TablerIcon/>

*/

import core, { FileInfo, API, Collection, ImportDeclaration, ExpressionStatement, Identifier, JSXIdentifier } from 'jscodeshift';

<<<<<<< HEAD:core/frontend/jscodeshift/new-replace-imports.ts
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
=======
import { entriesOf } from "./entriesOf"

import * as items from "./Items"

type RootType = Collection<any>

type jType = core.JSCodeshift

type GroupNames = 'messages' | 'SharedHelpers' | 'SharedHooks' | 'SharedConsts' | 'SharedTypes' | 'SharedUi'

type GroupType = Partial<Record<GroupNames, string[]>>;

const MessagesGroup: GroupType = { 'messages': items.MessagesItems };
const HelpersGroup: GroupType = { 'SharedHelpers': items.HelpersItems };
const HooksGroup: GroupType = { 'SharedHooks': items.HooksItems };
const ConstsGroup: GroupType = { 'SharedConsts': items.ConstsItems };
const TypesGroup: GroupType = { 'SharedTypes': items.TypesItems };
const UiGroup: GroupType = { 'SharedUi': items.UiItems };

const Groups = [
    MessagesGroup,
    HelpersGroup,
    HooksGroup,
    ConstsGroup,
    TypesGroup,
    UiGroup
]

const sharedName = 'shared'

function fetchOrganizedImportNames(node: ImportDeclaration) {
    if (!node.specifiers) return null

    const importNames: GroupType = {}

    for (var specifier of node.specifiers) {
        const name = specifier.local?.name

        if (!name) continue

        groupLoop: for (let group of Groups) {
            for (const [groupName, arr] of entriesOf(group)) {
                if (arr.includes(name)) {
                    if (importNames[groupName]) {
                        importNames[groupName]?.push(name)
                    } else {
                        importNames[groupName] = [name]
                    }
                    break groupLoop
                }
            }
<<<<<<<< HEAD:core/frontend/jscodeshift/replace-imports.ts
        }

    }

    return importNames
}

// If there are more than 1 import declaration from shared we are fucked
function replaceAndGetImports(root: RootType, j: jType): GroupType | null {
    let organizedImports: GroupType | null = null

    root
        .find(j.ImportDeclaration)
        .filter(path => {
            return typeof path.node.source.value === 'string' && path.node.source.value.includes(sharedName);
        }).
        forEach(path => {
            const { node } = path

            organizedImports = fetchOrganizedImportNames(node)

            if (!organizedImports || !node.specifiers) return

            const importGroups = Object.keys(organizedImports)
            const groupsLen = importGroups.length

            for (var i = 0; i < groupsLen; i++) {
                const local = node.specifiers[i].local;

                if (!local || !local.name) continue;
                local.name = importGroups[i];
            }

            node.specifiers.splice(groupsLen)

        })


    return organizedImports
}


function replaceIdentifiers(root: RootType, j: jType, organizedImports: GroupType) {

    const replaceIdentifier = (Identifier: Identifier | JSXIdentifier) => {
        const variableName = Identifier.name
        for (const [groupName, arr] of entriesOf(organizedImports)) {
            if (arr.includes(variableName)) {
                Identifier.name = groupName + '.' + variableName
                break
            }
        }
    }

    root
        .find(j.Identifier)
        .filter(path => path.parentPath.value.type !== 'ImportSpecifier')
        .forEach(path => replaceIdentifier(path.node));

    root
        .find(j.JSXIdentifier)
        .forEach(path => replaceIdentifier(path.node));
}

function transform(fileInfo: FileInfo, api: API) {
    const j = api.jscodeshift
    const root = j(fileInfo.source)

    const organizedImports = replaceAndGetImports(root, j)

    if (organizedImports) {
        replaceIdentifiers(root, j, organizedImports)
    }

    return root.toSource()

========
        });
    
    return root.toSource();
>>>>>>>> detachedhead:jscodeshift/new-replace-imports.ts
};

export default transform


>>>>>>> detachedhead:jscodeshift/new-replace-imports.ts
