function createEmployee(name, type) {
    return new Employee(name, type);
}
// 重构
function createEmployee(name, type) {
    switch (type) {
        case "engineer": return new Engineer(name);
        case "salesman": return new Salesman(name);
        case "manager": return new Manager(name);
    }
}

// -----------------
class Employee {
    constructor(name, type) {
        this.validateType(type);
        this._name = name;
        this._type = type;
    }
    validateType(arg) {
        if (!["engineer", "manager", "salesman"].includes(arg))
            throw new Error(`Employee cannot be of type ${arg}`);
    }
    toString() { return `${this._name} (${this._type})`; }
}

// 1 封装变量type
class Employee {
    get type() { return this._type; }
    toString() { return `${this._name} (${this.type})`; }
}
class Engineer extends Employee {
    get type() { return "engineer"; }
}

// 2 创建工厂方法取代构造函数
function createEmployee(name, type) {
    return new Employee(name, type);
}

// 3 使用工厂方法进行选择
function createEmployee(name, type) {
    switch (type) {
        case "engineer": return new Engineer(name, type);
    }
    return new Employee(name, type);
}
// 4 实现子类的type
class Salesman extends Employee {
    get type() { return "salesman"; }
}
class Manager extends Employee {
    get type() { return "manager"; }
}
function createEmployee(name, type) {
    switch (type) {
        case "engineer": return new Engineer(name, type);
        case "salesman": return new Salesman(name, type);
        case "manager": return new Manager(name, type);
    }
    return new Employee(name, type);
}
// 5 去掉父类的type
class Employee {
    constructor(name, type) {
        this.validateType(type);
        this._name = name;
        // this._type = type;
    }
    // get type() { return this._type; }
    toString() { return `${this._name} (${this.type})`; }
}
// 6 逐渐去掉type
class Employee {
    constructor(name, type) {
        // this.validateType(type);
        this._name = name;
    }
}
function createEmployee(name, type) {
    switch (type) {
        case "engineer": return new Engineer(name, type);
        case "salesman": return new Salesman(name, type);
        case "manager": return new Manager(name, type);
        default: throw new Error(`Employee cannot be of type ${type}`);
    }
    // return new Employee(name, type);
}
// 7 完全去掉type
class Employee {
    constructor(name) {
        this._name = name;
    }
}
function createEmployee(name, type) {
    switch (type) {
        case "engineer": return new Engineer(name);
        case "salesman": return new Salesman(name);
        case "manager": return new Manager(name);
        default: throw new Error(`Employee cannot be of type ${type}`);
    }
}
