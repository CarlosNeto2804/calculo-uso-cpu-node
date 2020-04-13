const os = require("os");

const division = (a, b) => a / b
const difference = (a, b) => a - b;
const percentage_cpu = (idleDifference, totalDifference) => 100 - ~~((100 * idleDifference) / totalDifference);
const calc = (cpus = os.cpus()) => {
    var totalIdle = 0,
        totalTick = 0;
    for (const iterator of cpus) {
        for (type in iterator.times) {
            totalTick += iterator.times[type];
        }
        totalIdle += iterator.times.idle;
    }
    return { idle: division(totalIdle,cpus.length), total: division(totalTick,cpus.length) };
};
const startMeasure = calc();
const main = () => {
    const endMeasure = calc();
    const idleDifference = difference(endMeasure.idle, startMeasure.idle)
    const totalDifference = difference(endMeasure.total, startMeasure.total)
    const percentageCPU = percentage_cpu(idleDifference, totalDifference)
    console.log(percentageCPU + "% CPU Usage.");
}
setInterval(() => {
    main()
}, process.env.INTERVAL || 500);