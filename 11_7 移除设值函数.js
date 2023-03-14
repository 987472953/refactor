// 移除设值函数
/**
 * 不希望在对象创建之后此字段还有机会被改变
 */
// 如果构造函数尚无法得到想要设入字段的值， 就使用 改变函数声明 将这个值以参数的形式传入构造函数。 在构造函数中调用设值函数， 对字段设值。
// 移除所有在构造函数之外对设值函数的调用， 改为使用新的构造函数。 每次修改之后都要测试。
// 使用 内联函数 消去设值函数。 如果可能的话， 把字段声明为不可变。
// 测试。
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