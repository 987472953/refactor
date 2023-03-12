// 有局部变量 提炼函数
function printOwing(invoice) {
    let outstanding = 0;
    printBanner();
    // calculate outstanding
    for (const o of invoice.orders) {
        outstanding += o.amount;
    } // record due date

    const today = Clock.today;
    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
    //print details
    console.log(`name: ${invoice.customer}`);
    console.log(`amount: ${outstanding}`);
    console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
}
// 1 值传递
function printOwing(invoice) {
    let outstanding = 0;
    printBanner();
    // calculate outstanding
    for (const o of invoice.orders) {
        outstanding += o.amount;
    }
    // record due date
    const today = Clock.today;
    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
    printDetails(invoice, outstanding);
}
function printDetails(invoice, outstanding) {
    console.log(`name: ${invoice.customer}`);
    console.log(`amount: ${outstanding}`);
    console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
}

// 2 “设置到期日”的逻辑
function printOwing(invoice) {
    let outstanding = 0; printBanner();
    // calculate outstanding
    for (const o of invoice.orders) {
        outstanding += o.amount;
    }
    recordDueDate(invoice);
    printDetails(invoice, outstanding);
}
function printDetails(invoice, outstanding) {
    console.log(`name: ${invoice.customer}`);
    console.log(`amount: ${outstanding}`);
    console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
}
function recordDueDate(invoice) {
    const today = Clock.today;
    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
}