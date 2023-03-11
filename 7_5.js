// 提炼类
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