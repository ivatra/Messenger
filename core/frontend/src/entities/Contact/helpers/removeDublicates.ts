import { ISearchedContact } from "../types/Model"

export function removeDublicates(list1: ISearchedContact[], list2: ISearchedContact[]){
    return list1
        .concat(list2)
        .filter((contact, index, array) => array.map(c => c.id).indexOf(contact.id) === index)
}