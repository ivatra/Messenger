const os = require('os');

const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

function calcCountOfCoresRequired(arrLength, cOfCors) {
    const maxCount = cOfCors * (3 / 4);
    const outcome = arrLength / 50;
    return Math.min(Math.max(outcome, 4), maxCount);
}

function* getValueGenerator(values) {
    for (var value of values) {
        yield value
    }
}


function terminateWorkerIfDone(workers, workerId, generatorIsDone) {
    if (generatorIsDone === true)
        workers[workerId].terminate()

}

module.exports = function (filePath, args) {
    if (isMainThread) {
        const logProccesorsCount = os.cpus().length
        const countOfWorkers = calcCountOfCoresRequired(args.length, logProccesorsCount)

        const TIME = Date.now()

        const valueGenerator = getValueGenerator(args)

        var workers = []

        for (let index = 0; index < countOfWorkers; index++) {
            workers[index] = new Worker(__filename, { workerData: { id: index, filePath: filePath } })

            const value = valueGenerator.next()
            terminateWorkerIfDone(workers, index, value.done)

            workers[index].postMessage({ arg: value.value })
        }

        var countWorkersAreDone = 0

        for (let index = 0; index < countOfWorkers; index++) {
            workers[index].on('message', message => {
                const workerId = message.id

                const value = valueGenerator.next()
                terminateWorkerIfDone(workers, index, value.done)

                workers[workerId].postMessage({ arg: value.value })
            })

            workers[index].on('exit', () => {
                countWorkersAreDone++
                console.log(`worker ${index} on exit!`)

                if (countWorkersAreDone === countOfWorkers)
                    console.log(`TIME SPENT FOR FILLING : ${(Date.now() - TIME) / 1000} SEC`)
            })
        }
    }
}

var readModels = false
if (isMainThread === false) {
    if (!readModels){
        var modelHooks = require('../database/postqre/hooks/index')
        var readModels = true
    }

    parentPort.on('message', async (message) => {
        const workerId = workerData.id
        const filePathToExecute = workerData.filePath
        const arg = message.arg
        const func = require(filePathToExecute)

        await func(arg).then(
            () => {
                parentPort.postMessage({ id: workerId })
            }).catch(error => {
                console.log(error)
            })

    })
}