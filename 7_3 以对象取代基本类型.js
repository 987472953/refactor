// 以对象取代基本类型
/**
 * 当一个字符串来表示“电话号码”的概念时, 随着它需要“格式化”“抽取区号”之类的特殊行为。
 * 就应该以对象取代基本类型
 */
// 如果变量尚未被封装起来， 先使用 封装变量 封装它。
// 为这个数据值创建一个简单的类。 类的构造函数应该保存这个数据值， 并为它提供一个取值函数。
// 执行静态检查。
// 修改第一步得到的设值函数， 令其创建一个新类的对象并将其存入字段， 如果有必要的话， 同时修改字段的类型声明。
// 修改取值函数， 令其调用新类的取值函数， 并返回结果。
// 测试。
// 考虑对第一步得到的访问函数使用 函数改名 ， 以便更好反映其用途。
// 考虑应用 将引用对象改为值对象 或 将值对象改为引用对象， 明确指出新对象的角色是值对象还是引用对象。
const orders = [
    { "priority": "hight" }
]
orders.filter(o => "high" === o.priority || "rush" === o.priority);
// 重构后
orders.filter(o => o.priority.higherThan(new Priority("normal")))


// 过程
// 1
class Order {
    constructor(data) {
        this.priority = data.priority;
    }
    get priority() { return this.priority; }
    set priority(aString) { this.priority = aString; }
}

highPriorityCount = orders.filter(o => "high" === o.priority || "rush" === o.priority).length;


// 2
class Order {
    constructor(priority) {
        this._priority = priority;
    }
    // get priority() { return this._priority; }
    // get priority() { return this._priority.toString(); }
    get priorityString() { return this._priority.toString(); }
    // set priority(aString) { this._priority = aString; }
    set priority(aString) { this._priority = new Priority(aString); }
}
class Priority {
    constructor(value) { this._value = value; }
    toString() { return this._value; }
}

highPriorityCount = orders
    .filter(o => "high" === o.priorityString || "rush" === o.priorityString)
    .length;

// 3
class Order {
    constructor(priority) {
        this._priority = priority;
    }
    get priority() { return this._priority; }
    get priorityString() { return this._priority.toString(); }
    set priority(aString) { this._priority = new Priority(aString); }
}

class Priority {
    constructor(value) {
        if (value instanceof Priority) return value;
        this._value = value;
    }
    toString() { return this._value; }
}

// 4
class Priority {
    constructor(value) {
        if (value instanceof Priority) return value;
        if (Priority.legalValues().includes(value))
            this._value = value;
        else
            throw new Error(`<${value}> is invalid for Priority`);
    }
    toString() { return this._value; }
    get _index() { return Priority.legalValues().findIndex(s => s === this._value); }
    static legalValues() { return ['low', 'normal', 'high', 'rush']; }
    equals(other) { return this._index === other._index; }
    higherThan(other) { return this._index > other._index; }
    lowerThan(other) { return this._index < other._index; }
}

highPriorityCount = orders.filter(o => o.priority.higherThan(new Priority("normal"))).length;