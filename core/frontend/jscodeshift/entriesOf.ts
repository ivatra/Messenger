export type entryOf<o> = {
    [k in keyof o]-?: [k, Exclude<o[k], undefined>]
}[o extends readonly unknown[] ? keyof o & number : keyof o] &
    unknown

export type entriesOf<o extends object> = entryOf<o>[] & unknown

export const entriesOf = <o extends object>(o: o) =>
    Object.entries(o) as entriesOf<o>