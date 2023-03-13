//对局部变量再赋值
function printOwing(invoice) {
    let outstanding = 0;
    printBanner();
    // calculate outstanding
    for (const o of invoice.orders) {
        outstanding += o.amount;
    }
    recordDueDate(invoice);
    printDetails(invoice, outstanding);
}

// 1 变量声明移动到使用处之前
function printOwing(invoice) {
    printBanner();// calculate outstanding
    let outstanding = 0;
    for (const o of invoice.orders) {
        outstanding += o.amount;
    }
    recordDueDate(invoice);
    printDetails(invoice, outstanding);
}

// 2 把想要提炼的代码复制到新函数(idea 直接提炼)
function printOwing(invoice) {
    printBanner();
    // calculate outstanding
    let outstanding = 0;
    for (const o of invoice.orders) {
        outstanding += o.amount;
    }
    recordDueDate(invoice);
    printDetails(invoice, outstanding);
}
function calculateOutstanding(invoice) {
    let outstanding = 0;
    for (const o of invoice.orders) {
        outstanding += o.amount;
    }
    return outstanding;
}

// 编译
// 3 修改原来的代码，令其调用新函数
function printOwing(invoice) {
    printBanner();
    let outstanding = calculateOutstanding(invoice);
    recordDueDate(invoice);
    printDetails(invoice, outstanding);
}
function calculateOutstanding(invoice) {
    let outstanding = 0;
    for (const o of invoice.orders) {
        outstanding += o.amount;
    }
    return outstanding;
}

// 4 修改函数返回结果名
function printOwing(invoice) {
    printBanner();
    const outstanding = calculateOutstanding(invoice);
    recordDueDate(invoice);
    printDetails(invoice, outstanding);
}
function calculateOutstanding(invoice) {
    let result = 0;
    for (const o of invoice.orders) {
        result += o.amount;
    }
    return result;
}