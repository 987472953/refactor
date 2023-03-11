class Employee {
    //...
}
class Salesman extends Employee {
    get name() {
        // ...
    }
}
class Engineer extends Employee {
    get name() {
        // ...
    }
}

// 
class Employee {
    get name() {
        // ...
    }
}
class Salesman extends Employee {
    // ...
}
class Engineer extends Employee {
    // ...
}


// ----------
class Employee extends Party {
    get annualCost() {
        return this.monthlyCost * 12;
    }
}
class Department extends Party {
    get totalAnnualCost() {
        return this.monthlyCost * 12;
    }
}
// 1 统一函数名
class Department {
    get annualCost() {
        return this.monthlyCost * 12;
    }
}
// 2 将子类方法复制到父类
class Party {
    get annualCost() {
        return this.monthlyCost * 12;
    }
}
// 3 为父类添加陷阱
class Party {
    get monthlyCost() {
        throw new SubclassResponsibilityError();
    }
}