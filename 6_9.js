// 函数组合成类
/**
 * 将函数组合成类可以提高代码的可维护性，因为它可以将相关功能组合在一起，并提供更清晰的代码结构
 * 功能非常复杂并且需要许多函数和数据结构，那么组合成类可能更有意义。
 * 一组函数形影不离地操作同一块数据(通常是将这块数据作为参数传递给函数)时应该进行组合
 */
// 做法
// 运用 封装记录 对多个函数共用的数据记录加以封装。
// 对于使用该记录结构的每个函数， 运用 搬移函数 将其移入新类。
// 用以处理该数据记录的逻辑可以用 提炼函数 提炼出来， 并移入新类。
function base(aReading) { }
function taxableCharge(aReading) { }
function calculateBaseCharge(aReading) { }
// 重构后
class Reading {
    base() { }
    taxableCharge() { }
    calculateBaseCharge() { }
}

// ----------------------------
reading = {customer: "ivan", quantity: 10, month: 5, year: 2017};

// 调用者1
const aReading = acquireReading();
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;
// 调用者2
const aReading = acquireReading();
const base = (baseRate(aReading.month, aReading.year) * aReading.quantity);
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));
// 调用者3
const aReading = acquireReading();
const basicChargeAmount = calculateBaseCharge(aReading);
function calculateBaseCharge(aReading) {
    return baseRate(aReading.month, aReading.year) * aReading.quantity;
}

// 1 将 reading 封装成类
class Reading {
    constructor(data) {
        this._customer = data.customer;
        this._quantity = data.quantity;
        this._month = data.month;
        this._year = data.year;
    }
    get customer() {return this._customer;}
    get quantity() {return this._quantity;}
    get month() {return this._month;}
    get year() {return this._year;}
}
// 调用者3
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const basicChargeAmount = calculateBaseCharge(aReading);
function calculateBaseCharge(aReading) {
    return baseRate(aReading.month, aReading.year) * aReading.quantity;
}

// 2 将函数搬移到类中
class Reading {
    constructor(data) {
        this._customer = data.customer;
        this._quantity = data.quantity;
        this._month = data.month;
        this._year = data.year;
    }
    get customer() {return this._customer;}
    get quantity() {return this._quantity;}
    get month() {return this._month;}
    get year() {return this._year;}
    get calculateBaseCharge() {
        return baseRate(this.month, this.year) * this.quantity;
    }
}
// 调用者3
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const basicChargeAmount = aReading.calculateBaseCharge;
// 3 函数改名
class Reading {
    constructor(data) {
        this._customer = data.customer;
        this._quantity = data.quantity;
        this._month = data.month;
        this._year = data.year;
    }
    get customer() {return this._customer;}
    get quantity() {return this._quantity;}
    get month() {return this._month;}
    get year() {return this._year;}
    get baseCharge() {
        return baseRate(this.month, this.year) * this.quantity;
    }
}
// 调用者3
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const basicChargeAmount = aReading.baseCharge;

// 4 修改其他地方调用
// 调用者1
// const aReading = acquireReading();
// const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const baseCharge = aReading.baseCharge;
// 调用者2
// const aReading = acquireReading();
// const base = (baseRate(aReading.month, aReading.year) * aReading.quantity);
// const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const taxableCharge = Math.max(0, aReading.baseCharge - taxThreshold(aReading.year));

// 5 提炼调用者2
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const taxableCharge = taxableChargeFn(aReading);
function taxableChargeFn(aReading) {
    return Math.max(0, aReading.baseCharge - taxThreshold(aReading.year));
}

// 6 同2搬移方法到类中
class Reading {
    constructor(data) {
        this._customer = data.customer;
        this._quantity = data.quantity;
        this._month = data.month;
        this._year = data.year;
    }
    get customer() {return this._customer;}
    get quantity() {return this._quantity;}
    get month() {return this._month;}
    get year() {return this._year;}
    get baseCharge() {
        return baseRate(this.month, this.year) * this.quantity;
    }
    get taxableCharge() {
        return Math.max(0, this.baseCharge - taxThreshold(this.year));
    }
}

const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const taxableCharge = aReading.taxableCharge;