
export function clusterByAlignment<T extends HTMLElement>(nodeArr: NodeListOf<T>,tolerance:number):T[][] {
    var newArr: T[] = []
    var doubleArr: T[][] = []
    for (var i = 0; i < nodeArr.length; i++) {
        newArr.push(nodeArr[i]);

        if (i === nodeArr.length - 1) {
            doubleArr.push(newArr);
            break;
        }

        const currentTopHeight = nodeArr[i].getBoundingClientRect().top;
        const nextTopHeight = nodeArr[i + 1].getBoundingClientRect().top
        const subjectsAlignedHorizontally = Math.abs(currentTopHeight - nextTopHeight) < tolerance;

        if (!subjectsAlignedHorizontally) {
            doubleArr.push(newArr);
            newArr = [];
        }
    }
    return doubleArr
}