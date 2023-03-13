// 隐藏委托关系
/**
 * 将代码中的委托关系隐藏起来，以减少对象之间的耦合性和复杂性
 * 当委托关系可能会被频繁更改时，隐藏它可以减少对其他类的影响。
 * 当需要将委托关系的实现细节从客户端代码中隔离开来时，隐藏它可以提高代码的可维护性。
 * 当一个类委托了大量的操作给另一个类时，隐藏委托关系可以使代码更易于理解和维护。
 * 当需要对委托关系进行封装时，隐藏它可以提高代码的安全性，防止客户端代码对委托关系进行非法操作。
 */
// 对于每个委托关系中的函数， 在服务对象端建立一个简单的委托函数。
// 调整客户端， 令它只调用服务对象提供的函数。 每次调整后运行测试。
// 如果将来不再有任何客户端需要取用Delegate（受托类） ， 便可移除服务对象
// 中的相关访问函数。
// 测试。
manager = aPerson.department.manager;
// 重构后
manager = aPerson.manager;
class Person {
    get manager() {return this.department.manager;}
}

// ---------------------------
class Person {
    constructor(name) {
        this._name = name;
    }
    get name() {return this._name;}
    get department() {return this._department;}
    set department(arg) {this._department = arg;}
}

class Department{
    get chargeCode() {return this._chargeCode;}
    set chargeCode(arg) {this._chargeCode = arg;}
    get manager() {return this._manager;}
    set manager(arg) {this._manager = arg;}
}
// 客户端
manager = aPerson.department.manager;

// 1 Person中创建一个委托函数, 并修改manager调用
class Person {
    constructor(name) {
        this._name = name;
    }
    get name() {return this._name;}
    get department() {return this._department;}
    set department(arg) {this._department = arg;}
    get manager() {return this._department.manager;}
}
// manager = aPerson.department.manager;
manager = aPerson.manager;
