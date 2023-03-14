// 函数上移
/**
 * 某个函数在各个子类中的函数体都相同
 * 如果两个函数工作流程大体相似， 但实现细节略有差异， 那么我会考虑先借助塑造模板函数构造出相同的函数， 然后再提升它们。
 */
// 检查待提升函数， 确定它们是完全一致的。
// 检查函数体内引用的所有函数调用和字段都能从超类中调用到。
// 如果待提升函数的签名不同， 使用改变函数声明（124） 将那些签名都修改为
// 你想要在超类中使用的签名。在超类中新建一个函数， 将某一个待提升函数的代码复制到其中。执行静态检查。
// 移除一个待提升的子类函数。
// 测试。
// 逐一移除待提升的子类函数， 直到只剩下超类中的函数为止
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