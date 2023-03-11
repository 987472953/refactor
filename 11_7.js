class Person {
    get name() { return this._name; }
    set name(arg) { this._name = arg; }
    get id() { return this._id; }
    set id(arg) { this._id = arg; }
}
function client() {
    const martin = new Person();
    martin.name = "martin";
    martin.id = "1234";
}

// 1
class Person {
    constructor(id) {
        this.id = id;
    }
}
function client() {
    const martin = new Person("1234");
    martin.name = "martin";
    martin.id = "1234";
}

// 2
class Person {
    constructor(id) {
        this._id = id;
    }
    get name() { return this._name; }
    set name(arg) { this._name = arg; }
    get id() { return this._id; }
    // set id(arg) { this._id = arg; }
}