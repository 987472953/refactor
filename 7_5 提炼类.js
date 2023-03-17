// 提炼类
/**
 *  类会不断成长扩展
 */
// 决定如何分解类所负的责任。
// 创建一个新的类， 用以表现从旧类中分离出来的责任。
// 构造旧类时创建一个新类的实例， 建立“从旧类访问新类”的连接关系。
// 对于你想搬移的每一个字段， 运用 搬移字段 搬移之。 每次更改后运行测试。
// 使用 搬移函数 将必要函数搬移到新类。 先搬移较低层函数（也就是“被其他函数调用”多于“调用其他函数”者） 。 每次更改后运行测试。
// 检查两个类的接口， 去掉不再需要的函数， 必要时为函数重新取一个适合新环境的名字。
// 决定是否公开新的类。 如果确实需要， 考虑对新类应用 将引用对象改为值对象 使其成为一个值对象。
class Person {
    get officeAreaCode() { return this._officeAreaCode; }
    get officeNumber() { return this._officeNumber; }
}
// 重构后
class Person {
    get officeAreaCode() { return this._telephoneNumber.areaCode; }
    get officeNumber() { return this._telephoneNumber.number; }
}
class TelephoneNumber {
    get areaCode() { return this._areaCode; }
    get number() { return this._number; }
}

// 1
class Person {
    get name() { return this._name; }
    set name(arg) { this._name = arg; }
    get telephoneNumber() { return `(${this.officeAreaCode}) ${this.officeNumber}`; }
    get officeAreaCode() { return this._officeAreaCode; }
    set officeAreaCode(arg) { this._officeAreaCode = arg; }
    get officeNumber() { return this._officeNumber; }
    set officeNumber(arg) { this._officeNumber = arg; }
}

class TelephoneNumber {
}

// 2
class Person {
    constructor() {
        this._telephoneNumber = new TelephoneNumber();
    }
    get name() { return this._name; }
    set name(arg) { this._name = arg; }
    get telephoneNumber() { return `(${this.officeAreaCode}) ${this.officeNumber}`; }
    // get officeAreaCode() { return this._officeAreaCode; }
    get officeAreaCode() { return this._telephoneNumber.officeAreaCode; }
    // set officeAreaCode(arg) { this._officeAreaCode = arg; }
    set officeAreaCode(arg) { this._telephoneNumber.officeAreaCode = arg; }
    get officeNumber() { return this._officeNumber; }
    set officeNumber(arg) { this._officeNumber = arg; }
}

class TelephoneNumber {
    get officeAreaCode() { return this._officeAreaCode; }
    set officeAreaCode(arg) { this._officeAreaCode = arg; }
}

// 3
class Person {
    constructor() {
        this._telephoneNumber = new TelephoneNumber();
    }
    get name() { return this._name; }
    set name(arg) { this._name = arg; }
    get telephoneNumber() { return `(${this.officeAreaCode}) ${this.officeNumber}`; }
    get officeAreaCode() { return this._telephoneNumber.officeAreaCode; }
    set officeAreaCode(arg) { this._telephoneNumber.officeAreaCode = arg; }
    // get officeNumber() { return this._officeNumber; }
    // set officeNumber(arg) { this._officeNumber = arg; }
    get officeNumber() { return this._telephoneNumber.officeNumber; }
    set officeNumber(arg) { this._telephoneNumber.officeNumber = arg; }
}

class TelephoneNumber {
    get officeAreaCode() { return this._officeAreaCode; }
    set officeAreaCode(arg) { this._officeAreaCode = arg; }
    get officeNumber() { return this._officeNumber; }
    set officeNumber(arg) { this._officeNumber = arg; }
    get telephoneNumber() { return `(${this.officeAreaCode}) ${this.officeNumber}`; }
}

// 4
class Person {
    constructor() {
        this._telephoneNumber = new TelephoneNumber();
    }
    get name() { return this._name; }
    set name(arg) { this._name = arg; }
    // get telephoneNumber() { return `(${this.officeAreaCode}) ${this.officeNumber}`; }
    get telephoneNumber() { return `(${this.officeAreaCode}) ${this.officeNumber}`; }
    get officeAreaCode() { return this._telephoneNumber.officeAreaCode; }
    set officeAreaCode(arg) { this._telephoneNumber.officeAreaCode = arg; }
    get officeNumber() { return this._telephoneNumber.officeNumber; }
    set officeNumber(arg) { this._telephoneNumber.officeNumber = arg; }
}

class TelephoneNumber {
    get officeAreaCode() { return this._officeAreaCode; }
    set officeAreaCode(arg) { this._officeAreaCode = arg; }
    get officeNumber() { return this._officeNumber; }
    set officeNumber(arg) { this._officeNumber = arg; }
    get telephoneNumber() { return `(${this.officeAreaCode}) ${this.officeNumber}`; }
}

// 5
class Person {
    constructor() {
        this._telephoneNumber = new TelephoneNumber();
    }
    get name() { return this._name; }
    set name(arg) { this._name = arg; }
    // get telephoneNumber() { return `(${this.officeAreaCode}) ${this.officeNumber}`; }
    get telephoneNumber() { return this.telephoneNumber.toString(); }
    

    // get officeAreaCode() { return this._telephoneNumber.officeAreaCode; }
    // set officeAreaCode(arg) { this._telephoneNumber.officeAreaCode = arg; }
    // get officeNumber() { return this._telephoneNumber.officeNumber; }
    // set officeNumber(arg) { this._telephoneNumber.officeNumber = arg; }
    get officeAreaCode() { return this._telephoneNumber.areaCode; }
    set officeAreaCode(arg) { this._telephoneNumber.areaCode = arg; }
    get officeNumber() { return this._telephoneNumber.number; }
    set officeNumber(arg) { this._telephoneNumber.number = arg; }
}

class TelephoneNumber {
    // get officeAreaCode() { return this._officeAreaCode; }
    // set officeAreaCode(arg) { this._officeAreaCode = arg; }
    // get officeNumber() { return this._officeNumber; }
    // set officeNumber(arg) { this._officeNumber = arg; }
    get areaCode() { return this._areaCode; }
    set areaCode(arg) { this._areaCode = arg; }
    get number() { return this._number; }
    set number(arg) { this._number = arg; }
    // get telephoneNumber() { return `(${this.officeAreaCode}) ${this.officeNumber}`; }
    toString() { return `(${this.areaCode}) ${this.number}`; }
}

// 6
class Person {
    constructor() {
        this._telephoneNumber = new TelephoneNumber();
    }
    get name() { return this._name; }
    set name(arg) { this._name = arg; }
    get telephoneNumber() { return this.telephoneNumber.toString(); }
    
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
    toString() { return `(${this.areaCode}) ${this.number}`; }
}