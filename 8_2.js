// 数据结构已经不适应于需求，就应该马上修缮它
// 修改一条记录时，总是需要同时改动另一条记录，那么说明很可能有字段放错了位置
// 更新一个字段时，需要同时在多个结构中做出修改
class Customer {
    get plan() { return this._plan; }
    get discountRate() { return this._discountRate; }
}

class Customer {
    get plan() { return this._plan; }
    get discountRate() { return this.plan.discountRate; }
}

// 折扣率 discountRate 搬移到 CustomerContract
class Customer {
    constructor(name, discountRate) {
        this._name = name;
        this._discountRate = discountRate;
        // 合同
        this._contract = new CustomerContract(dateToday());
    }
    get discountRate() { return this._discountRate; }
    becomePreferred() {
        this._discountRate += 0.03;
        // other nice things
    }
    applyDiscount(amount) {
        return amount.subtract(amount.multiply(this._discountRate));
    }
}

class CustomerContract {
    constructor(startDate) {
        this._startDate = startDate;
    }
}

// 1 封装变量 _discountRate
class Customer {
    constructor(name, discountRate) {
        this._name = name;
        this._setDiscountRate(discountRate);
        this._contract = new CustomerContract(dateToday());
    }
    get discountRate() { return this._discountRate; }
    _setDiscountRate(aNumber) { this._discountRate = aNumber; }
    becomePreferred() {
        this._setDiscountRate(this.discountRate + 0.03);
        // other nice things
    }
    applyDiscount(amount) {
        return amount.subtract(amount.multiply(this.discountRate));
    }
}

// 2 添加被移动字段
class CustomerContract {
    constructor(startDate, discountRate) {
        this._startDate = startDate;
        this._discountRate = discountRate;
    }
    get discountRate() { return this._discountRate; }
    set discountRate(arg) { this._discountRate = arg; }
}

// 3 
class Customer {
    constructor(name, discountRate) {
        this._name = name;
        this._setDiscountRate(discountRate);
        this._contract = new CustomerContract(dateToday());
    }
    get discountRate() { return this._contract.discountRate; }
    _setDiscountRate(aNumber) { this._contract.discountRate = aNumber; }
}

// -----------------------------------------------------------------

class Account {
    constructor(number, type, interestRate) {
        this._number = number;
        this._type = type;
        this._interestRate = interestRate;
    }
    get interestRate() { return this._interestRate; }
}

class AccountType {
    constructor(nameString) {
        this._name = nameString;
    }
}

// 1 被移动类
class AccountType {
    constructor(nameString, interestRate) {
        this._name = nameString;
        this._interestRate = interestRate;
    }
    get interestRate() { return this._interestRate; }
}

// 2 添加断言, 运行一段时间检查是否有异常
class Account {
    constructor(number, type, interestRate) {
        this._number = number;
        this._type = type;
        assert(interestRate === this._type.interestRate);
        this._interestRate = interestRate;
    }
    get interestRate() { return this._interestRate; }
}

// 3 删掉移动字段
class Account {
    constructor(number, type) {
        this._number = number;
        this._type = type;
    }
    get interestRate() { return this._type.interestRate; }
}