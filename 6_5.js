// 改变函数声明(函数改名)
/*
函数改名或者修改参数列表
*/
// 简单做法
// 如果想要移除一个参数， 需要先确定函数体内没有使用该参数。
// 修改函数声明， 使其成为你期望的状态。
// 找出所有使用旧的函数声明的地方， 将它们改为使用新的函数声明。
// 测试。

// 迁移式做法
// 如果有必要的话， 先对函数体内部加以重构， 使后面的提炼步骤易于开展。
// 使用 提炼函数 将函数体提炼成一个新函数。
// 如果你打算沿用旧函数的名字， 可以先给新函数起一个易于搜索的临时名字。如果提炼出的函数需要新增参数， 用前面的简单做法添加即可。
// 测试。
// 对旧函数使用 内联函数。
// 如果新函数使用了临时的名字， 再次使用改变函数声明将其改回原来的名字。
// 测试。
function circum(radius) {
    // ...
}
// 重构后
function circumference(radius) {
    // ...
}

// 迁移式做法-------------
function circum(radius) {
    return 2 * Math.PI * radius;
}

// 1 提炼函数
function circum(radius) {
    return circumference(radius);
}
function circumference(radius) {
    return 2 * Math.PI * radius;
}

// 添加参数-------------
function circum(radius) {
    return circumference(radius);
}

function tmp_circum(radius, isPriority) {
    return circumference(radius, isPriority);
}

// 把参数改为属性(把传类变为传值)----------
function inNewEngland(aCustomer) {
    return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(aCustomer.address.state);
}
// 1 提炼属性
function inNewEngland(aCustomer) {
    const stateCode = aCustomer.address.state;
    return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}
// 2 提炼函数
function inNewEngland(aCustomer) {
    const stateCode = aCustomer.address.state;
    return xxNEWinNewEngland(stateCode);
}
function xxNEWinNewEngland(stateCode) {
    return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}
// 3 修改调用方