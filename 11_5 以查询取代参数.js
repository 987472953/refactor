// 以查询取代参数
/**
 * 以函数取代参数
 * 函数的参数列表应该总结该函数的可变性
 * 参数列表应该尽量避免重复，并且参数列表越短就越容易理解
 */
// 如果有必要， 使用 提炼函数 将参数的计算过程提炼到一个独立的函数中。
// 将函数体内引用该参数的地方改为调用新建的函数。 每次修改后执行测试。
// 全部替换完成后， 使用 改变函数声明 将该参数去掉。
availableVacation(anEmployee, anEmployee.grade);
function availableVacation(anEmployee, grade) {
    // calculate vacation...
}
// 重构
availableVacation(anEmployee)
function availableVacation(anEmployee) {
    const grade = anEmployee.grade;
    // calculate vacation..
}

// ------
class Order {
    get finalPrice() {
        const basePrice = this.quantity * this.itemPrice;
        let discountLevel;
        if (this.quantity > 100) discountLevel = 2;
        else discountLevel = 1;
        return this.discountedPrice(basePrice, discountLevel);
    }
    discountedPrice(basePrice, discountLevel) {
        switch (discountLevel) {
            case 1: return basePrice * 0.95;
            case 2: return basePrice * 0.9;
        }
    }
}

// 1 以查询取代零时变量
class Order {
    get finalPrice() {
        const basePrice = this.quantity * this.itemPrice;
        return this.discountedPrice(basePrice, this.discountLevel);
    }
    get discountLevel() {
        return (this.quantity > 100) ? 2 : 1;
    }
}

// 2
class Order {
    get finalPrice() {
        const basePrice = this.quantity * this.itemPrice;
        return this.discountedPrice(basePrice, this.discountLevel);
    }
    get discountLevel() {
        return (this.quantity > 100) ? 2 : 1;
    }
    discountedPrice(basePrice, discountLevel) {
        switch (this.discountLevel) {
            case 1: return basePrice * 0.95;
            case 2: return basePrice * 0.9;
        }
    }
}

// 3 改变函数 discountedPrice 声明
class Order {
    get finalPrice() {
        const basePrice = this.quantity * this.itemPrice;
        return this.discountedPrice(basePrice);
    }
    get discountLevel() {
        return (this.quantity > 100) ? 2 : 1;
    }
    discountedPrice(basePrice) {
        switch (this.discountLevel) {
            case 1: return basePrice * 0.95;
            case 2: return basePrice * 0.9;
        }
    }
}