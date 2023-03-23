export function extractCommonFields<T extends object>(subject: T, subject2: object): [Partial<T>, boolean] {
    const commonFields: Partial<T> = {};
    let countOfItems = 0;

    for (const key in subject) {
        if (key in subject2) {
            countOfItems++;
            commonFields[key as keyof T] = (subject2 as Record<keyof T, unknown>)[key as keyof T] as T[keyof T];
        }
    }
    const subjectLength = Object.keys(subject).length;

    const areSubjectsSame = countOfItems === subjectLength

    return [commonFields, areSubjectsSame];
}
