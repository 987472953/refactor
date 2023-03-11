function oldFun() {
    const names = [];
    for (const i of input) {
        if (i.job === "programmer")
            names.push(i.name);
    }
}

function newFun() {
    const names = input
        .filter(i => i.job === "programmer")
        .map(i => i.name);
}

// ----------------

function acquireData(input) {
    const lines = input.split("\n");
    let firstLine = true;
    const result = [];
    for (const line of lines) {
        if (firstLine) {
            firstLine = false;
            continue;
        }
        if (line.trim() === "") continue;
        const record = line.split(",");
        if (record[1].trim() === "India") {
            result.push({ city: record[0].trim(), phone: record[2].trim() });
        }
    }
    return result;
}

// 1 创建一个独立的变量， 用来存放参与循环过程的集合值
function acquireData(input) {
    const lines = input.split("\n");
    let firstLine = true;
    const result = [];
    const loopItems = lines
    for (const line of loopItems) {
        if (firstLine) {
            firstLine = false;
            continue;
        }
        if (line.trim() === "") continue;
        const record = line.split(",");
        if (record[1].trim() === "India") {
            result.push({ city: record[0].trim(), phone: record[2].trim() });
        }
    }
    return result;
}

// 2 忽略CSV文件的第一行数据
function acquireData(input) {
    const lines = input.split("\n");
    // let firstLine = true;
    const result = [];
    const loopItems = lines
        .slice(1);
    for (const line of loopItems) {
        // if (firstLine) {
        //     firstLine = false;
        //     continue;
        // }
        if (line.trim() === "") continue;
        const record = line.split(",");
        if (record[1].trim() === "India") {
            result.push({ city: record[0].trim(), phone: record[2].trim() });
        }
    }
    return result;
}

// 3 过滤
function acquireData(input) {
    const lines = input.split("\n");
    const result = [];
    const loopItems = lines
        .slice(1)
        .filter(line => line.trim() !== "")
        ;
    for (const line of loopItems) {
        // if (line.trim() === "") continue;
        const record = line.split(",");
        if (record[1].trim() === "India") {
            result.push({ city: record[0].trim(), phone: record[2].trim() });
        }
    }
    return result;
}

// 4 数据的一行转换成数组
function acquireData(input) {
    const lines = input.split("\n");
    const result = [];
    const loopItems = lines
        .slice(1)
        .filter(line => line.trim() !== "")
        .map(line => line.split(","))
        ;
    for (const line of loopItems) {
        const record = line;//.split(",");
        if (record[1].trim() === "India") {
            result.push({ city: record[0].trim(), phone: record[2].trim() });
        }
    }
    return result;
}

// 5 过滤
function acquireData(input) {
    const lines = input.split("\n");
    const result = [];
    const loopItems = lines
        .slice(1)
        .filter(line => line.trim() !== "")
        .map(line => line.split(","))
        .filter(record => record[1].trim() === "India")
        ;
    for (const line of loopItems) {
        const record = line;
        // if (record[1].trim() === "India") {
        result.push({ city: record[0].trim(), phone: record[2].trim() });
        // }
    }
    return result;
}

// 6 转换为对象
function acquireData(input) {
    const lines = input.split("\n");
    const result = [];
    const loopItems = lines
        .slice(1)
        .filter(line => line.trim() !== "")
        .map(line => line.split(","))
        .filter(record => record[1].trim() === "India")
        .map(record => ({ city: record[0].trim(), phone: record[2].trim() }))
        ;
    for (const line of loopItems) {
        const record = line;
        result.push(line);
    }
    return result;
}

// 7 赋值给result
function acquireData(input) {
    const lines = input.split("\n");
    const result = lines
        .slice(1)
        .filter(line => line.trim() !== "")
        .map(line => line.split(","))
        .filter(record => record[1].trim() === "India")
        .map(record => ({ city: record[0].trim(), phone: record[2].trim() }))
        ;
    // for (const line of loopItems) {
    //     const record = line;
    //     result.push(line);
    // }
    return result;
}