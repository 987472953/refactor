// 提炼超类
/**
 * 继承和委托之间的选择，目的都是把重复的行为收拢一处。
 * 提炼超类通常是比较简单的做法， 所以应该首选这个方案。
 * 即便选错了， 也可以使用 以委托取代超类 进行重构
 */
// 为原本的类新建一个空白的超类
// 测试。
// 使用构造函数本体上移 、 函数上移 和字段上移 手法，
// 逐一将子类的共同元素上移到超类。
// 检查留在子类中的函数， 看它们是否还有共同的成分。 如果有， 可以先用 提炼函数 将其提炼出来， 再用函数上移 搬到超类。
// 检查所有使用原本的类的客户端代码， 考虑将其调整为使用超类的接口
class Department {
    get totalAnnualCost() {}
    get name() {}
    get headCount() {}
}
class Employee {
    get annualCost() {}
    get name() {}
    get id() {}
}
// 重构后
class Party {
    get name() {}
    get annualCost() {}
}
class Department extends Party {
    get annualCost() {}
    get headCount() {}
}
class Employee extends Party {
    get annualCost() {}
    get id() {}
}

// 都有名字 也都有月度成本(monthly cost)和年度成本(annual cost)-------------------------
class Employee {
    constructor(name, id, monthlyCost) {
        this._id = id;
        this._name = name;
        this._monthlyCost = monthlyCost;
    }
    get monthlyCost() {return this._monthlyCost;}
    get name() {return this._name;}
    get id() {return this._id;}
    get annualCost() {
        return this.monthlyCost * 12;
    }
}
class Department {
    constructor(name, staff){
        this._name = name;
        this._staff = staff;
    }
    get staff() {return this._staff.slice();}
    get name() {return this._name;}
    get totalMonthlyCost() {
        return this.staff
            .map(e => e.monthlyCost)
            .reduce((sum, cost) => sum + cost);
    }
    get headCount() {
        return this.staff.length;
    }
    get totalAnnualCost() {
        return this.totalMonthlyCost * 12;
    }
}
// 1 创建一个空的超类
class Party {}
class Employee extends Party {}
class Department extends Party {}
// 2 修改构造器 将name进行上移
class Party {
    constructor(name){
        this._name = name;
    }
    get name() {return this._name;}
}
class Employee extends Party {
    constructor(name, id, monthlyCost) {
        super(name);
        this._id = id;
        this._monthlyCost = monthlyCost;
    }
    get name() {return this._name;}
}
class Department extends Party {
    constructor(name, staff){
        super(name);
        this._staff = staff;
    }
    get name() {return this._name;}
}
// 3 totalAnnualCost annualCost 实现稍有不同 改变函数声明 将它们的名字统一
class Department extends Party {
    constructor(name, staff){
        super(name);
        this._staff = staff;
    }
    get staff() {return this._staff.slice();}
    get name() {return this._name;}
    // get totalMonthlyCost() {
    get monthlyCost() {
        return this.staff
            .map(e => e.monthlyCost)
            .reduce((sum, cost) => sum + cost);
    }
    get headCount() {
        return this.staff.length;
    }
    // get totalAnnualCost() {
    get annualCost() {
        // return this.totalMonthlyCost * 12;
        return this.monthlyCost * 12;
    }
}
class Employee extends Party {
    constructor(name, id, monthlyCost) {
        super(name);
        this._id = id;
        this._monthlyCost = monthlyCost;
    }
    get id() {return this._id;}
    get name() {return this._name;}
    get monthlyCost() {return this._monthlyCost;}
    get annualCost() {
        return this.monthlyCost * 12;
    }
}
// 4 函数上移
class Party {
    constructor(name){
        this._name = name;
    }
    get name() {return this._name;}
    get annualCost() {
        return this.monthlyCost * 12;
    }
}
class Department extends Party {
    constructor(name, staff){
        super(name);
        this._staff = staff;
    }
    get staff() {return this._staff.slice();}
    get name() {return this._name;}
    get monthlyCost() {
        return this.staff
            .map(e => e.monthlyCost)
            .reduce((sum, cost) => sum + cost);
    }
    get headCount() {
        return this.staff.length;
    }
    // get annualCost() {
    //     return this.monthlyCost * 12;
    // }
}
class Employee extends Party {
    constructor(name, id, monthlyCost) {
        super(name);
        this._id = id;
        this._monthlyCost = monthlyCost;
    }
    get id() {return this._id;}
    get name() {return this._name;}
    get monthlyCost() {return this._monthlyCost;}
    // get annualCost() {
    //     return this.monthlyCost * 12;
    // }
}