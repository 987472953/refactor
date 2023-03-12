// 内联函数
// 可能重构了该函数的内部实现，导致其内容和其名称变得同样清晰
// 有一群组织不甚合理的函数。可以将它们都内联到一个大型函数中，再以我喜欢的方式重新提炼出小函数

// 做法
// 检查函数， 确定它不具多态性。
// 找出这个函数的所有调用点。
// 将这个函数的所有调用点都替换为函数本体。
// 每次替换之后，执行测试。
// 删除该函数的定义。
function getRating(driver) {
    return moreThanFiveLateDeliveries(driver) ? 2 : 1;
}
function moreThanFiveLateDeliveries(driver) {
    return driver.numberOfLateDeliveries > 5;
}
// 重构后
function getRating(driver) {
    return (driver.numberOfLateDeliveries > 5) ? 2 : 1;
}

// ---------------------
function rating(aDriver) {
    return moreThanFiveLateDeliveries(aDriver) ? 2 : 1;
}
function moreThanFiveLateDeliveries(aDriver) {
    return aDriver.numberOfLateDeliveries > 5;
}

// 1 直接复制出来进行替换
function rating(aDriver) {
    return aDriver.numberOfLateDeliveries > 5 ? 2 : 1;
}

// --------------------
function reportLines(aCustomer) {
    const lines = [];
    gatherCustomerData(lines, aCustomer);
    return lines;
}
function gatherCustomerData(out, aCustomer) {
    out.push(["name", aCustomer.name]);
    out.push(["location", aCustomer.location]);
}
// 1 复制并改名
function reportLines(aCustomer) {
    const lines = [];
    lines.push(["name", aCustomer.name]);
    lines.push(["location", aCustomer.location]);
    gatherCustomerData(lines, aCustomer);
    return lines;
} 
function gatherCustomerData(out, aCustomer) {
    // out.push(["name", aCustomer.name]);
    // out.push(["location", aCustomer.location]);
}