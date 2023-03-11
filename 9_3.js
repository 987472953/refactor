// 以查询取派生变量
class D {
    get discountedTotal() { return this._discountedTotal; }
    set discount(aNumber) {
        const old = this._discount;
        this._discount = aNumber;
        this._discountedTotal += old - aNumber;
    }
}

class New {
    get discountedTotal() { return this._baseTotal - this._discount; }
    set discount(aNumber) { this._discount = aNumber; }
}

// 丑陋代码
class ProductionPlan {
    get production() { return this._production; }
    applyAdjustment(anAdjustment) {
        this._adjustments.push(anAdjustment);
        this._production += anAdjustment.amount;
    }
}

// 1 断言
class ProductionPlan {
    get production() {
        assert(this._production === this.calculatedProduction);
        return this._production;
    }
    get calculatedProduction() {
        return this._adjustments
            .reduce((sum, a) => sum + a.amount, 0);
    }
    applyAdjustment(anAdjustment) {
        this._adjustments.push(anAdjustment);
        this._production += anAdjustment.amount;
    }
}

// 2 移除断言
class ProductionPlan {
    get production() {
        // assert(this._production === this.calculatedProduction);
        return this.calculatedProduction;
    }
    get calculatedProduction() {
        return this._adjustments
            .reduce((sum, a) => sum + a.amount, 0);
    }
    applyAdjustment(anAdjustment) {
        this._adjustments.push(anAdjustment);
        this._production += anAdjustment.amount;
    }
}

// 3 内联
class ProductionPlan {
    get production() {
        return this._adjustments
            .reduce((sum, a) => sum + a.amount, 0);
    }
}

// 4 删除重复赋值
class ProductionPlan {
    applyAdjustment(anAdjustment) {
        this._adjustments.push(anAdjustment);
        // this._production += anAdjustment.amount;
    }
}

// ----------- 
class ProductionPlan {
    constructor(production) {
        this._production = production;
        this._adjustments = [];
    }
    get production() { 
        // 引入断言后, 若_production不为0 就有问题
        // assert(this._production === this.calculatedProduction);
        return this._production; 
    }
    applyAdjustment(anAdjustment) {
        this._adjustments.push(anAdjustment);
        this._production += anAdjustment.amount;
    }
    get calculatedProduction() {
        return this._adjustments
            .reduce((sum, a) => sum + a.amount, 0);
    }
}

// 拆分变量
class ProductionPlan {
    constructor(production) {
        this._initialProduction = production;
        this._productionAccumulator = 0;
        this._adjustments = [];
    }
    get production() {
        return this._initialProduction + this._productionAccumulator;
    }
    applyAdjustment(anAdjustment) {
        this._adjustments.push(anAdjustment);
        this._production += anAdjustment.amount;
    }
}
// 下面同1