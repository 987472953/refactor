// 保持对象完整
/**
 * 代码从一个对象结构中导出几个值，然后又把这几个值一起传递给一个函数，更应该把整个记录传给这个函数
 */
// 新建一个空函数， 给它以期望中的参数列表（即传入完整对象作为参数） 。
// 在新函数体内调用旧函数， 并把新的参数（即完整对象） 映射到旧的参数列表（即来源于完整对象的各项数据） 。
// 执行静态检查。
// 逐一修改旧函数的调用者， 令其使用新函数， 每次修改之后执行测试。
// 所有调用处都修改过来之后， 使用内联函数（115） 把旧函数内联到新函数体内。
// 给新函数改名， 从重构开始时的容易搜索的临时名字， 改为使用旧函数的名字， 同时修改所有调用处。
const low = aRoom.daysTempRange.low;
const high = aRoom.daysTempRange.high;
if (aPlan.withinRange(low, high)) {

}

// 重构
if (aPlan.withinRange(aRoom.daysTempRange)) {

}


// ---
function client() {
    const low = aRoom.daysTempRange.low;
    const high = aRoom.daysTempRange.high;
    if (!aPlan.withinRange(low, high))
        alerts.push("room temperature went outside range");
}
class HeatingPlan {
    withinRange(bottom, top) {
        return (bottom >= this._temperatureRange.low) && (top <= this._temperatureRange.high);
    }
}

// 1 为 withinRange 添加个空函数
class HeatingPlan {
    xxNEWwithinRange(aNumberRange) {
    }
}

// 2 新函数中调用
class HeatingPlan {
    xxNEWwithinRange(aNumberRange) {
        return this.withinRange(aNumberRange.low, aNumberRange.high);
    }
}

// 3 修改调用方
function client() {
    // const low = aRoom.daysTempRange.low;
    // const high = aRoom.daysTempRange.high;
    if (!aPlan.xxNEWwithinRange(aRoom.daysTempRange))
        alerts.push("room temperature went outside range");
}

// 4 函数内联
class HeatingPlan {
    xxNEWwithinRange(aNumberRange) {
        return (aNumberRange.low >= this._temperatureRange.low) &&
            (aNumberRange.high <= this._temperatureRange.high);
    }
}

// 5 修改方法名

// ----------------
function client2() {
    const low = aRoom.daysTempRange.low;
    const high = aRoom.daysTempRange.high;
    if (!aPlan.withinRange(low, high))
        alerts.push("room temperature went outside range");
}

// 1
function client2() {
    const low = aRoom.daysTempRange.low;
    const high = aRoom.daysTempRange.high;
    const isWithinRange = aPlan.withinRange(low, high);
    if (!isWithinRange)
        alerts.push("room temperature went outside range");
}
// 2
function client2() {
    const tempRange = aRoom.daysTempRange;
    const low = tempRange.low;
    const high = tempRange.high;
    const isWithinRange = aPlan.withinRange(low, high);
    if (!isWithinRange)
        alerts.push("room temperature went outside range");
}
// 3 提炼函数
function client2() {
    const tempRange = aRoom.daysTempRange;
    const isWithinRange = xxNEWwithinRange(aPlan, tempRange);
    if (!isWithinRange)
        alerts.push("room temperature went outside range");
}
function xxNEWwithinRange(aPlan, tempRange) {
    const low = tempRange.low;
    const high = tempRange.high;
    const isWithinRange = aPlan.withinRange(low, high);
    return isWithinRange;
}
// 4 搬移函数到对象
function client2() {
    const tempRange = aRoom.daysTempRange;
    const isWithinRange = aPlan.xxNEWwithinRange(tempRange);
    if (!isWithinRange)
        alerts.push("room temperature went outside range");
}
class HeatingPlan {
    xxNEWwithinRange(tempRange) {
        const low = tempRange.low;
        const high = tempRange.high;
        const isWithinRange = this.withinRange(low, high);
        return isWithinRange;
    }
}