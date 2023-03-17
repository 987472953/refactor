// 以查询取代临时变量
/**
 * 那些只被计算一次且之后不再被修改的变量
 */
// 检查变量在使用前是否已经完全计算完毕， 检查计算它的那段代码是否每次都
// 能得到一样的值。
// 如果变量目前不是只读的， 但是可以改造成只读变量， 那就先改造它。
// 测试。
// 将为变量赋值的代码段提炼成函数。
// 测试。
// 应用 内联变量 手法移除临时变量。
// const basePrice = this._quantity * this._itemPrice;
function oldFun() {
    if (basePrice > 1000)
        return basePrice * 0.95;
    else
        return basePrice * 0.98;
}
// 重构
// get basePrice() { this._quantity * this._itemPrice; }
// ...
function newFun() {
    if (this.basePrice > 1000)
        return this.basePrice * 0.95;
    else
        return this.basePrice * 0.98;
}

// 1
class Order {
    constructor(quantity, item) {
        this._quantity = quantity;
        this._item = item;
    }
    get price() {
        // var basePrice = this._quantity * this._item.price;
        const basePrice = this._quantity * this._item.price;
        var discountFactor = 0.98;
        if (basePrice > 1000) discountFactor -= 0.03;
        return basePrice * discountFactor;
    }
}
// 希望把basePrice和discountFactor两个临时变量变成函数
// 2
class Order {
    constructor(quantity, item) {
        this._quantity = quantity;
        this._item = item;
    }
    get price() {
        const basePrice = this.basePrice;
        var discountFactor = 0.98;
        if (basePrice > 1000) discountFactor -= 0.03;
        return basePrice * discountFactor;
    }
    get basePrice() {
        return this._quantity * this._item.price;
    }
}
// 3
class Order {
    constructor(quantity, item) {
        this._quantity = quantity;
        this._item = item;
    }
    get price() {
        // const basePrice = this.basePrice;
        var discountFactor = 0.98;
        if (this.basePrice > 1000) discountFactor -= 0.03;
        return this.basePrice * discountFactor;
    }
    get basePrice() {
        return this._quantity * this._item.price;
    }
}
// 4
class Order {
    constructor(quantity, item) {
        this._quantity = quantity;
        this._item = item;
    }
    get price() {
        // const discountFactor = this.discountFactor;
        // return this.basePrice * discountFactor;
        return this.basePrice * this.discountFactor;
    }
    get discountFactor() {
        var discountFactor = 0.98;
        if (this.basePrice > 1000) discountFactor -= 0.03;
        return discountFactor;
    }
    get basePrice() {
        return this._quantity * this._item.price;
    }
}


