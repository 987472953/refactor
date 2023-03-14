// 将引用对象改为值对象
/**
 * 将一个可变对象改变为一个不可变的新对象
 * 值对象通常更容易理解， 主要因为它们是不可变的
 */
// 检查重构目标是否为不可变对象， 或者是否可修改为不可变对象。
// 用 移除设值函数 逐一去掉所有设值函数。
// 提供一个基于值的相等性判断函数， 在其中使用值对象的字段。
class Product {
    applyDiscount(arg) { this._price.amount -= arg; }
}

class Product {
    applyDiscount(arg) {
        this._price = new Money(this._price.amount - arg, this._price.currency);
    }
}

// 
class Person {
    constructor() {
        this._telephoneNumber = new TelephoneNumber();
    }
    get officeAreaCode() { return this._telephoneNumber.areaCode; }
    set officeAreaCode(arg) { this._telephoneNumber.areaCode = arg; }
    get officeNumber() { return this._telephoneNumber.number; }
    set officeNumber(arg) { this._telephoneNumber.number = arg; }
}

class TelephoneNumber {
    get areaCode() { return this._areaCode; }
    set areaCode(arg) { this._areaCode = arg; }
    get number() { return this._number; }
    set number(arg) { this._number = arg; }
}


// 1 移除设值函数
class TelephoneNumber {
    constructor(areaCode, number) {
        this._areaCode = areaCode;
        this._number = number;
    }
    get areaCode() { return this._areaCode; }
    get number() { return this._number; }
}

// 2 重新赋值整个对象
class Person {
    get officeAreaCode() { return this._telephoneNumber.areaCode; }
    set officeAreaCode(arg) {
        this._telephoneNumber = new TelephoneNumber(arg, this.officeNumber);
    }
    get officeNumber() { return this._telephoneNumber.number; }
    set officeNumber(arg) { this._telephoneNumber.number = arg; }
}

// 3 重新赋值整个对象 继续
class Person {
    get officeAreaCode() { return this._telephoneNumber.areaCode; }
    set officeAreaCode(arg) {
        this._telephoneNumber = new TelephoneNumber(arg, this.officeNumber);
    }
    get officeNumber() { return this._telephoneNumber.number; }
    set officeNumber(arg) {
        this._telephoneNumber = new TelephoneNumber(this.officeAreaCode, arg);
    }
}

// 4 相等性测试
class Person {
    get officeAreaCode() { return this._telephoneNumber.areaCode; }
    set officeAreaCode(arg) {
        this._telephoneNumber = new TelephoneNumber(arg, this.officeNumber);
    }
    get officeNumber() { return this._telephoneNumber.number; }
    set officeNumber(arg) {
        this._telephoneNumber = new TelephoneNumber(this.officeAreaCode, arg);
    }
    equals(other) {
        if (!(other instanceof TelephoneNumber)) return false;
        return this.areaCode === other.areaCode &&
            this.number === other.number;
    }
}

it('telephone equals', function () {
    assert(new TelephoneNumber("312", "555-0142").equals(new TelephoneNumber("312", "555-0142")));
});