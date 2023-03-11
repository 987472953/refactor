function tenPercentRaise(aPerson) {
    aPerson.salary = aPerson.salary.multiply(1.1);
}
function fivePercentRaise(aPerson) {
    aPerson.salary = aPerson.salary.multiply(1.05);
}

// 函数参数化
function raise(aPerson, factor) {
    aPerson.salary = aPerson.salary.multiply(1 + factor);
}


// 0
function baseCharge(usage) {
    if (usage < 0) return usd(0);
    const amount =
        bottomBand(usage) * 0.03
        + middleBand(usage) * 0.05
        + topBand(usage) * 0.07;
    return usd(amount);
}
function bottomBand(usage) {
    return Math.min(usage, 100);
}
function middleBand(usage) {
    return usage > 100 ? Math.min(usage, 200) - 100 : 0;
}
function topBand(usage) {
    return usage > 200 ? usage - 200 : 0;
}

// 2 先参数化 middleBand 方法
function withinBand(usage, bottom, top) {
    return usage > 100 ? Math.min(usage, 200) - 100 : 0;
}
function baseCharge(usage) {
    if (usage < 0) return usd(0);
    const amount =
        bottomBand(usage) * 0.03
        + withinBand(usage, 100, 200) * 0.05
        + topBand(usage) * 0.07;
    return usd(amount);
}

// 3 修改一个参数为传入参数
function withinBand(usage, bottom, top) {
    return usage > bottom ? Math.min(usage, 200) - bottom : 0;
}

// 4 另一个
function withinBand(usage, bottom, top) {
    return usage > bottom ? Math.min(usage, top) - bottom : 0;
}

// 5 修改方法调用
function baseCharge(usage) {
    if (usage < 0) return usd(0);
    const amount =
        withinBand(usage, 0, 100) * 0.03
        + withinBand(usage, 100, 200) * 0.05
        + topBand(usage) * 0.07;
    return usd(amount);
}
// function bottomBand(usage) {
//     return Math.min(usage, 100);
// }

// 6
function baseCharge(usage) {
    if (usage < 0) return usd(0);
    const amount =
        withinBand(usage, 0, 100) * 0.03
        + withinBand(usage, 100, 200) * 0.05
        + withinBand(usage, 200, Infinity) * 0.07;
    return usd(amount);
}
// function topBand(usage) {
//     return usage > 200 ? usage - 200 : 0;
// }