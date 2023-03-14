// 构造函数本体上移
/**
 *
 */
// 如果超类还不存在构造函数， 首先为其定义一个。 确保让子类调用超类的构造函数。
// 使用 移动语句 将子类中构造函数中的公共语句移动到超类的构造函数调用语句之后。
// 逐一移除子类间的公共代码， 将其提升至超类构造函数中。 对于公共代码中引用到的变量， 将其作为参数传递给超类的构造函数。
// 测试。
// 如果存在无法简单提升至超类的公共代码， 先应用 提炼函数 ， 再利用 函数上移 提升之。
class Party {
    // ...
}
class Employee extends Party {
    constructor(name, id, monthlyCost) {
        super();
        this._id = id;
        this._name = name;
        this._monthlyCost = monthlyCost;
    }
}
// 
class Party {
    constructor(name) {
        this._name = name;
    }
}
class Employee extends Party {
    constructor(name, id, monthlyCost) {
        super(name);
        this._id = id;
        this._monthlyCost = monthlyCost;
    }
}

// ----------
class Party { }
class Employee extends Party {
    constructor(name, id, monthlyCost) {
        super();
        this._id = id;
        this._name = name;
        this._monthlyCost = monthlyCost;
    }
    // rest of class...
}
class Department extends Party {
    constructor(name, staff) {
        super();
        this._name = name;
        this._staff = staff;
    }
    // rest of class...
}

// 1 父类创建构造函数
class Party {
    constructor(name) {
        this._name = name;
    }
}
// 2 子类调用
class Employee {
    constructor(name, id, monthlyCost) {
        super(name);
        this._id = id;
        this._monthlyCost = monthlyCost;
    }
}


// 对 isPrivileged 提炼超类
class Employee {
    constructor(name) {
        // ...
    }
    get isPrivileged() {
        // ...
    }
    assignCar() {
        // ...
    }
}
class Manager extends Employee {
    constructor(name, grade) {
        super(name);
        this._grade = grade;
        if (this.isPrivileged) this.assignCar(); // every subclass does this
    }
    get isPrivileged() {
        return this._grade > 4;
    }
}

// 1 提炼函数
class Manager {
    constructor(name, grade) {
        super(name);
        this._grade = grade;
        this.finishConstruction();
    }
    finishConstruction() {
        if (this.isPrivileged) this.assignCar();
    }
    get isPrivileged() {
        return this._grade > 4;
    }
}

// 2 函数上移
class Employee {
    constructor(name) {
        // ...
    }
    get isPrivileged() {
        // ...
    }
    assignCar() {
        // ...
    }
    finishConstruction() {
        if (this.isPrivileged) this.assignCar();
    }
}
class Manager {
    constructor(name, grade) {
        super(name);
        this._grade = grade;
        this.finishConstruction();
    }
    get isPrivileged() {
        return this._grade > 4;
    }
}