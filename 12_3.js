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