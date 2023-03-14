// 以函数取代命令
/**
 * 如果这个函数不是太复杂， 那么命令对象可能显得费而不惠，
 */
// 运用 提炼函数 ， 把“创建并执行命令对象”的代码单独提炼到一个函数中
// 对命令对象在执行阶段用到的函数， 逐一使用 内联函数
// 使用 改变函数声明 ， 把构造函数的参数转移到执行函数。
// 对于所有的字段， 在执行函数中找到引用它们的地方， 并改为使用参数。 每次修改后都要测试。
// 把“调用构造函数”和“调用执行函数”两步都内联到调用方（也就是最终要替换命令对象的那个函数） 。
// 测试。
// 用 移除死代码 把命令类消去。
class ChargeCalculator {
    constructor(customer, usage) {
        this._customer = customer;
        this._usage = usage;
    }
    execute() {
        return this._customer.rate * this._usage;
    }
}
// 
function charge(customer, usage) {
    return customer.rate * usage;
}

// ------------
class ChargeCalculator {
    constructor(customer, usage, provider) {
        this._customer = customer;
        this._usage = usage;
        this._provider = provider;
    }
    get baseCharge() {
        return this._customer.baseRate * this._usage;
    }
    get charge() {
        return this.baseCharge + this._provider.connectionCharge;
    }
}

monthCharge = new ChargeCalculator(customer, usage, provider).charge;

// 1 将命令模式变为方法调用
monthCharge = charge(customer, usage, provider);
function charge(customer, usage, provider) {
    return new ChargeCalculator(customer, usage, provider).charge;
}
// 2 提炼返回值
class ChargeCalculator {
    // get charge() {
    //     return this.baseCharge + this._provider.connectionCharge;
    // }
    get charge() {
        const baseCharge = this.baseCharge;
        return baseCharge + this._provider.connectionCharge;
    }
}
// 3 将 baseCharge 内联
class ChargeCalculator {
    get baseCharge() {
        return this._customer.baseRate * this._usage;
    }
    // get charge() {
    //     const baseCharge = this.baseCharge;
    //     return baseCharge + this._provider.connectionCharge;
    // }
    get charge() {
        const baseCharge = this._customer.baseRate * this._usage;
        return baseCharge + this._provider.connectionCharge;
    }
}
// 4 把构造函数传参移到主函数
class ChargeCalculator {
    constructor(customer, usage, provider) {
        this._customer = customer;
        this._usage = usage;
        this._provider = provider;
    }
    charge(customer, usage, provider) {
        const baseCharge = this._customer.baseRate * this._usage;
        return baseCharge + this._provider.connectionCharge;
    }
}

// 5 改变调用
function charge(customer, usage, provider) {
    return new ChargeCalculator(customer, usage, provider)
        .charge(customer, usage, provider);
}

// 6 逐步删除构造函数
class ChargeCalculator {
    charge(customer, usage, provider) {
        const baseCharge = customer.baseRate * usage;
        return baseCharge + provider.connectionCharge;
    }
}