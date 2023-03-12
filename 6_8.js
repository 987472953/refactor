// 引入参数对象
// 这项重构真正的意义在于，它会催生代码中更深层次的改变。一旦识别出新的数据结构，我就可以重组程序的行为来使用这些结构

// 做法
// 如果暂时还没有一个合适的数据结构，就创建一个。
// 测试。
// 使用改变 函数声明 给原来的函数新增一个参数， 类型是新建的数据结构。
// 测试。
// 调整所有调用者， 传入新数据结构的适当实例。 每修改一处， 执行测试。
// 用新数据结构中的每项元素， 逐一取代参数列表中与之对应的参数项， 然后删除原来的参数。 测试。
function amountInvoiced(startDate, endDate) { }
function amountReceived(startDate, endDate) { }
function amountOverdue(startDate, endDate) { }
// 重构后
function amountInvoiced(aDateRange) { }
function amountReceived(aDateRange) { }
function amountOverdue(aDateRange) { }

// -----------------
const station = {
    name: "ZB1",
    readings: [
        { temp: 47, time: "2016-11-10 09:10" },
        { temp: 53, time: "2016-11-10 09:20" },
        { temp: 58, time: "2016-11-10 09:30" },
        { temp: 53, time: "2016-11-10 09:40" },
        { temp: 51, time: "2016-11-10 09:50" },
    ]
};
function readingsOutsideRange(station, min, max) {
    return station.readings
        .filter(r => r.temp < min || r.temp > max);
}
alerts = readingsOutsideRange(station,
    operatingPlan.temperatureFloor,
    operatingPlan.temperatureCeiling);

// 1 将参数声明为一个类
class NumberRange {
    constructor(min, max) {
        this._data = { min: min, max: max };
    }
    get min() { return this._data.min; }
    get max() { return this._data.max; }
}

// 2 把新的对象作为参数传给函数
function readingsOutsideRange(station, min, max, range) {
    return station.readings
        .filter(r => r.temp < min || r.temp > max);
}
alerts = readingsOutsideRange(station,
    operatingPlan.temperatureFloor,
    operatingPlan.temperatureCeiling,
    null);
// 3 修改传入对象
const range = new NumberRange(
    operatingPlan.temperatureFloor,
    operatingPlan.temperatureCeiling
);
alerts = readingsOutsideRange(station,
    operatingPlan.temperatureFloor,
    operatingPlan.temperatureCeiling,
    range);
// 4 修改函数，用传入对象替换传入参数
function readingsOutsideRange(station, min, max, range) {
    return station.readings
        .filter(r => r.temp < range.min || r.temp > range.max);
}
// 5 移除传入参数，将逻辑放入方法内
function readingsOutsideRange(station, range) {
    return station.readings
        .filter(r => !range.contains(r.temp));
}
class NumberRange {
    constructor(min, max) {
        this._data = { min: min, max: max };
    }
    get min() { return this._data.min; }
    get max() { return this._data.max; }
    contains(arg) {return (arg >= this.min && arg <= this.max);}
}
