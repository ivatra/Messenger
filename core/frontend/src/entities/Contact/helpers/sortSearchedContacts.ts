import { IContact } from "../types/Model";



export function sortByIsContact(list:IContact[]){
    return list.sort((a, b) => {
        if (a.status !== null && !b.status === null) {
            return -1; // a comes before b
        } else if (a.status === null && b.status !== null) {
            return 1; // a comes after b
        } else {
            return 0; // order doesn't matter
        }
    });
}