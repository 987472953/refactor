// 将查询函数和修改函数分离
/**
 * 明确表现出“有副作用”与“无副作用”两种函数之间的差异
 * 任何有返回值的函数， 都不应该有看得到的副作用
 */
// 复制整个函数，将其作为一个查询来命名。
// 从新建的查询函数中去掉所有造成副作用的语句。
// 执行静态检查。
// 查找所有调用原函数的地方。 如果调用处用到了该函数的返回值， 就将其改为
// 调用新建的查询函数， 并在下面马上再调用一次原函数。 每次修改之后都要测试。
// 从原函数中去掉返回值。
// 测试。
function alertForMiscreant(people) {
    for (const p of people) {
        if (p === "Don") {
            setOffAlarms();
            return "Don";
        }
        if (p === "John") {
            setOffAlarms();
            return "John";
        }
    }
    return "";
}

// 1 复制一个新相同函数, 去掉非查询操作
function findMiscreant(people) {
    for (const p of people) {
        if (p === "Don") {
            // setOffAlarms();
            return "Don";
        }
        if (p === "John") {
            // setOffAlarms();
            return "John";
        }
    }
    return "";
}

// 2 修改调用方
// const found = alertForMiscreant(people)
const found = findMiscreant(people);
alertForMiscreant(people);

// 3 删除原函数的返回值
function alertForMiscreant(people) {
    for (const p of people) {
        if (p === "Don") {
            setOffAlarms();
            return;
        }
        if (p === "John") {
            setOffAlarms();
            return;
        }
    }
    return;
}

// 4 替换函数
function alertForMiscreant(people) {
    if (findMiscreant(people) !== "") setOffAlarms();
}