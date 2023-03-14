// 引入特例
/**
 * 引入Null对象
 *
 */
// 给重构目标添加检查特例的属性， 令其返回false。
// 创建一个特例对象， 其中只有检查特例的属性， 返回true。
// 对“与特例值做比对”的代码运用 提炼函数 ， 确保所有客户端都使用这
// 个新函数， 而不再直接做特例值的比对。
// 将新的特例对象引入代码中， 可以从函数调用中返回， 也可以在变换函数中生成。
// 修改特例比对函数的主体， 在其中直接使用检查特例的属性。
// 测试。
// 使用 函数组合成类 或 函数组合成变换， 把通用的特例处理逻辑
// 都搬移到新建的特例对象中。
// 对特例比对函数使用内联函数 ， 将其内联到仍然需要的地方
class Site {
    get customer() { return this._customer; }
}

class Customer {
    get name() {
        //...
    }
    get billingPlan() {
        // ... 
    }
    set billingPlan(arg) {
        // ... 
    }
    get paymentHistory() {
        // ... 
    }
}
function client1() {
    const aCustomer = site.customer;
    // ... lots of intervening code ...
    let customerName;
    if (aCustomer === "unknown") customerName = "occupant";
    else customerName = aCustomer.name;
}

function client2() {
    const plan = (aCustomer === "unknown") ?
        registry.billingPlans.basic
        : aCustomer.billingPlan;
}

function client3() {
    if (aCustomer !== "unknown") aCustomer.billingPlan = newPlan;
}

function client4() {
    const weeksDelinquent = (aCustomer === "unknown") ?
        0 : aCustomer.paymentHistory.weeksDelinquentInLastYear;
}

// 1 创建特例对象, 并用方法标识(非js语言应该存在继承)
class Customer {
    get isUnknown() { return false; }
}
class UnknownCustomer {
    get isUnknown() { return true; }
}

// 2 将调用方抽为方法
function isUnknown(arg) {
    if (!((arg instanceof Customer) || (arg === "unknown")))
        throw new Error(`investigate bad value: <${arg}>`);
    return (arg === "unknown");
}

// 3 修改调用方
function client1() {
    const aCustomer = site.customer;
    // ... lots of intervening code ...
    let customerName;
    // if (aCustomer === "unknown") customerName = "occupant";
    if (isUnknown(aCustomer)) customerName = "occupant";
    else customerName = aCustomer.name;
}

function client2() {
    // const plan = (aCustomer === "unknown") ?registry.billingPlans.basic: aCustomer.billingPlan;
    const plan = (isUnknown(aCustomer)) ? registry.billingPlans.basic : aCustomer.billingPlan;
}

function client3() {
    // if (aCustomer !== "unknown") aCustomer.billingPlan = newPlan;
    if (!isUnknown(aCustomer)) aCustomer.billingPlan = newPlan;
}

function client4() {
    // const weeksDelinquent = (aCustomer === "unknown") ?
    //     0 : aCustomer.paymentHistory.weeksDelinquentInLastYear;
    const weeksDelinquent = isUnknown(aCustomer) ?
        0 : aCustomer.paymentHistory.weeksDelinquentInLastYear;
}

// 4 修改 获得customer 方法
class Site {
    get customer() {
        return (this._customer === "unknown") ? new UnknownCustomer() : this._customer;
    }
}
function isUnknown(arg) {
    if (!(arg instanceof Customer || arg instanceof UnknownCustomer))
        throw new Error(`investigate bad value: <${arg}>`);
    return arg.isUnknown;
}

// 5 UnknownCustomer 添加参数
class UnknownCustomer {
    get name() { return "occupant"; }
}

// 6 去掉条件逻辑 取值情况
function client1() {
    const aCustomer = site.customer;
    // let customerName;
    // if (isUnknown(aCustomer)) customerName = "occupant";
    // else customerName = aCustomer.name;
    let customerName = aCustomer.name;
}
// 7 添加其他参数
class UnknownCustomer {
    get name() { return "occupant"; }
    get billingPlan() { return registry.billingPlans.basic; }
    set billingPlan(arg) { /* ignore */ }
}

// 8 修改其他client
function client2() {
    // const plan = (isUnknown(aCustomer)) ? registry.billingPlans.basic : aCustomer.billingPlan;
    const plan = aCustomer.billingPlan;
}

// 9 特例对象是一个新对象 赋值情况
function client3() {
    // if (!isUnknown(aCustomer)) aCustomer.billingPlan = newPlan;
    aCustomer.billingPlan = newPlan;
}

// 10 特殊情况 添加中间类
class UnknownCustomer {
    get name() { return "occupant"; }
    get billingPlan() { return registry.billingPlans.basic; }
    set billingPlan(arg) { /* ignore */ }
    get paymentHistory() { return new NullPaymentHistory(); }
}
class NullPaymentHistory {
    get weeksDelinquentInLastYear() { return 0; }
}

function client4() {
    // const weeksDelinquent = isUnknown(aCustomer) ?
    //     0 : aCustomer.paymentHistory.weeksDelinquentInLastYear;
    const weeksDelinquent = aCustomer.paymentHistory.weeksDelinquentInLastYear;
}