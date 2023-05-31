

type arr = { id: string | number }[]

export function convertArrToDict(arr: arr) {
   return  Object.fromEntries(arr.map(element => [element.id, arr]));
}