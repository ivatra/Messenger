import { ISearchedContact } from "../types/Model"


export function sortSearchedContacts(list:ISearchedContact[]){
    return list.sort((a, b) => {
        if (a.isContact && !b.isContact) {
            return -1; // a comes before b
        } else if (!a.isContact && b.isContact) {
            return 1; // a comes after b
        } else {
            return 0; // order doesn't matter
        }
    });
}