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