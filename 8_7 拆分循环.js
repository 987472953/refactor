//拆分循环
/**
 * 让一个循环只做一件事情
 */
// 复制一遍循环代码。
// 识别并移除循环中的重复代码， 使每个循环只做一件事。
// 测试。
function oldLoop() {
    let averageAge = 0;
    let totalSalary = 0;
    for (const p of people) {
        averageAge += p.age;
        totalSalary += p.salary;
    }
    averageAge = averageAge / people.length;
}
// 重构后
function newLoop() {
    let totalSalary = 0;
    for (const p of people) {
        totalSalary += p.salary;
    }
    let averageAge = 0;
    for (const p of people) {
        averageAge += p.age;
    }
    averageAge = averageAge / people.length;

}

// -------
function step0() {
    let youngest = people[0] ? people[0].age : Infinity;
    let totalSalary = 0;
    for (const p of people) {
        if (p.age < youngest) youngest = p.age;
        totalSalary += p.salary;
    }
    return `youngestAge: ${youngest}, totalSalary: ${totalSalary}`;
}

// 1
function step1() {
    let youngest = people[0] ? people[0].age : Infinity;
    let totalSalary = 0;
    for (const p of people) {
        if (p.age < youngest) youngest = p.age;
        totalSalary += p.salary;
    }
    for (const p of people) {
        if (p.age < youngest) youngest = p.age;
        totalSalary += p.salary;
    }
    return `youngestAge: ${youngest}, totalSalary: ${totalSalary}`;
}

// 2
function step2() {
    let youngest = people[0] ? people[0].age : Infinity;
    let totalSalary = 0;
    for (const p of people) {
        totalSalary += p.salary;
    }
    for (const p of people) {
        if (p.age < youngest) youngest = p.age;
    }
    return `youngestAge: ${youngest}, totalSalary: ${totalSalary}`;
}

// 3
function step3() {
    return `youngestAge: ${youngestAge()}, totalSalary: ${totalSalary()}`;

    function totalSalary() {
        let totalSalary = 0;
        for (const p of people) {
            totalSalary += p.salary;
        }
        return totalSalary;
    }
    function youngestAge() {
        let youngest = people[0] ? people[0].age : Infinity;
        for (const p of people) {
            if (p.age < youngest) youngest = p.age;
        }
        return youngest;
    }
}

// 4
function step4() {
    return `youngestAge: ${youngestAge()}, totalSalary: ${totalSalary()}`;
    function totalSalary() {
        return people.reduce((total, p) => total + p.salary, 0);
    }
    function youngestAge() {
        return Math.min(...people.map(p => p.age));
    }
}

