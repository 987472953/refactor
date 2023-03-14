// 以子类取代类型码
/**
 * 类型码字段--枚举、 符号、 字符串或者数字
 */
// 自封装类型码字段。
// 任选一个类型码取值， 为其创建一个子类。 覆写类型码类的取值函数， 令其返回该类型码的字面量值。
// 创建一个选择器逻辑， 把类型码参数映射到新的子类。
// 测试。
// 针对每个类型码取值， 重复上述“创建子类、 添加选择器逻辑”的过程。 每次修
// 改后执行测试。
// 去除类型码字段。
// 测试。
// 使用 函数下移 和以 多态取代条件表达式 处理原本访问了类型码的函数。 全部处理完后， 就可以移除类型码的访问函数
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
