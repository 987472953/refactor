// 函数参数化
/**
 * 将函数中的某个公用的部分，作为参数传入
 * 两个函数逻辑非常相似，只有一些字面量值不同，可以将其合并成一个函数，以参数的形式传入不同的值
 */
// 从一组相似的函数中选择一个。
// 运用 改变函数声明 ，把需要作为参数传入的字面量添加到参数列表中。
// 修改该函数所有的调用处，使其在调用时传入该字面量值。
// 测试。修改函数体，令其使用新传入的参数。 每使用一个新参数都要测试。
// 对于其他与之相似的函数，逐一将其调用处改为调用已经参数化的函数。 每次修改后都要测试
function tenPercentRaise(aPerson) {
    aPerson.salary = aPerson.salary.multiply(1.1);
}
function fivePercentRaise(aPerson) {
    aPerson.salary = aPerson.salary.multiply(1.05);
}

// 重构后
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