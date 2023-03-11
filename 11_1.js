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