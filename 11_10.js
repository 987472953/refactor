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