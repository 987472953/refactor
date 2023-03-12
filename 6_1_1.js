// 提炼函数
/**
 * 将意图与实现分开: 如果你需要花时间浏览一段代码才能弄清它到底在干什么， 那么就应该将其提炼到一个函数中， 并根据它所做的事为其命名
 * 超过6行, 就开始散发臭味?
 */
// 做法
// 创造一个新函数， 根据这个函数的意图来对它命名（以它“做什么”来命名， 而不是以它“怎样做”命名） 。
// 将待提炼的代码从源函数复制到新建的目标函数中。
// 仔细检查提炼出的代码， 看看其中是否引用了作用域限于源函数、 在提炼出的新函数中访问不到的变量。 若是， 以参数的形式将它们传递给新函数。
// 所有变量都处理完之后， 编译。
// 在源函数中， 将被提炼代码段替换为对目标函数的调用。
// 测试。
// 查看其他代码是否有与被提炼的代码段相同或相似之处。 如果有， 考虑使用以函数调用取代内联代码（222） 令其调用提炼出的新函数。
function printOwing(invoice) {
    printBanner();
    let outstanding = calculateOutstanding();
    //print details
    console.log(`name: ${invoice.customer}`);
    console.log(`amount: ${outstanding}`);
}
// 重构
function printOwing(invoice) {
    printBanner();
    let outstanding = calculateOutstanding();
    printDetails(outstanding);
    function printDetails(outstanding) {
        console.log(`name: ${invoice.customer}`);
        console.log(`amount: ${outstanding}`);
    }
}

// ----------------------
function printOwing(invoice) {
    let outstanding = 0;
    console.log("***********************");
    console.log("**** Customer Owes ****");
    console.log("***********************");
    // calculate outstanding
    for (const o of invoice.orders) {
        outstanding += o.amount;
    }
    // record due date
    const today = Clock.today;
    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
    //print details
    console.log(`name: ${invoice.customer}`);
    console.log(`amount: ${outstanding}`);
    console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
}

// 1 提炼打印
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
    //print details
    console.log(`name: ${invoice.customer}`);
    console.log(`amount: ${outstanding}`);
    console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
}
function printBanner() {
    console.log("***********************");
    console.log("**** Customer Owes ****");
    console.log("***********************");
}

// 2 提炼
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
    printDetails();
    function printBanner() {
        console.log("***********************");
        console.log("**** Customer Owes ****");
        console.log("***********************");
    }
    function printDetails() {
        console.log(`name: ${invoice.customer}`);
        console.log(`amount: ${outstanding}`);
        console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
    }
}