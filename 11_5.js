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