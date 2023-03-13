// 以对象取代基本类型
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