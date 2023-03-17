// 提炼变量(引入解释性变量)
/**
 *  被提炼变量名应该能够清晰地描述变量的含义，具有表达力。
 *  如果这个变量名在更宽的上下文中也有意义， 就应该将其暴露出来，通常以函数的形式。
 */
// 做法
// 确认要提炼的表达式没有副作用。
// 声明一个不可修改的变量，把你想要提炼的表达式复制一份，以该表达式的结果值给这个变量赋值。
// 用这个新变量取代原来的表达式。
// 测试。
function old() {
    return order.quantity * order.itemPrice -
        Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
        Math.min(order.quantity * order.itemPrice * 0.1, 100);
}
// 重构后
function newFun() {
    const basePrice = order.quantity * order.itemPrice;
    const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
    const shipping = Math.min(basePrice * 0.1, 100);
    return basePrice - quantityDiscount + shipping;
}

// -------------------
function price(order) {
    //price is base price - quantity discount + shipping
    // 订单数量 * 订单单价 - 超过500的订单数 * 单价 * 0.05 + 订单数量 * 单价 * 0.1
    return order.quantity * order.itemPrice -
        Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
        Math.min(order.quantity * order.itemPrice * 0.1, 100);
}

// 1 提炼基本价格
function price(order) {
    //price is base price - quantity discount + shipping
    const basePrice = order.quantity * order.itemPrice;
    return order.quantity * order.itemPrice -
        Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
        Math.min(order.quantity * order.itemPrice * 0.1, 100);
}
// 2 取代原来表达式
function price(order) {
    //price is base price - quantity discount + shipping
    const basePrice = order.quantity * order.itemPrice;
    return basePrice -
        Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
        Math.min(order.quantity * order.itemPrice * 0.1, 100);
}

// 3 同样进行后面2块提炼
function price(order) {
    const basePrice = order.quantity * order.itemPrice;
    const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
    const shipping = Math.min(basePrice * 0.1, 100);
    return basePrice - quantityDiscount + shipping;
}

// 更宽的作用域------------------
class Order {
    constructor(aRecord) {
        this._data = aRecord;
    }
    get quantity() { return this._data.quantity; }
    get itemPrice() { return this._data.itemPrice; }
    get price() {
        return this.quantity * this.itemPrice -
            Math.max(0, this.quantity - 500) * this.itemPrice * 0.05 +
            Math.min(this.quantity * this.itemPrice * 0.1, 100);
    }
}

// 1 提炼为方法 而不是变量--可见性变高
class Order {
    constructor(aRecord) {
        this._data = aRecord;
    }
    get quantity() { return this._data.quantity; }
    get itemPrice() { return this._data.itemPrice; }
    get price() {
        return this.basePrice - this.quantityDiscount + this.shipping;
    }
    get basePrice() { return this.quantity * this.itemPrice; }
    get quantityDiscount() { return Math.max(0, this.quantity - 500) * this.itemPrice * 0.05; }
    get shipping() { return Math.min(this.basePrice * 0.1, 100); }
}