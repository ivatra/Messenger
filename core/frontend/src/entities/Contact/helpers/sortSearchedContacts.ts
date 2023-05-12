import { IContact } from "../types/Model";



export function sortByIsContact(list:IContact[]){
    return list.sort((a, b) => {
        if (a.status !== null && !b.status === null) {
            return -1;
        } else if (a.status === null && b.status !== null) {
            return 1; 
        } else {
            return 0;
        }
    });
}