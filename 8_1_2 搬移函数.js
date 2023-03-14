class Account {
    get bankCharge() {
        let result = 4.5;
        if (this._daysOverdrawn > 0) result += this.overdraftCharge;
        return result;
    }
    get overdraftCharge() {
        if (this.type.isPremium) {
            const baseCharge = 10;
            if (this.daysOverdrawn <= 7)
                return baseCharge;
            else
                return baseCharge + (this.daysOverdrawn - 7) * 0.85;
        } else
            return this.daysOverdrawn * 1.75;
    }
}

// 1 移动 overdraftCharge
class AccountType {
    overdraftCharge(daysOverdrawn) {
        if (this.isPremium) {
            const baseCharge = 10;
            if (daysOverdrawn <= 7)
                return baseCharge;
            else
                return baseCharge + (daysOverdrawn - 7) * 0.85;
        }
        else
            return daysOverdrawn * 1.75;
    }
}

// 2 修改原来的overdraftCharge方法
class Account {
    get bankCharge() {
        let result = 4.5;
        if (this._daysOverdrawn > 0) result += this.overdraftCharge;
        return result;
    }
    get overdraftCharge() {
        return this.type.overdraftCharge(this.daysOverdrawn);
    }
}

// 3 看情况内联
class Account {
    get bankCharge() {
        let result = 4.5;
        if (this._daysOverdrawn > 0)
            result += this.type.overdraftCharge(this.daysOverdrawn);
        return result;
    }
}

// 4 当 overdraftCharge 较多依赖 account时 直接传this
class Account {
    get bankCharge() {
        let result = 4.5;
        if (this._daysOverdrawn > 0) result += this.overdraftCharge;
        return result;
    }
    get overdraftCharge() {
        return this.type.overdraftCharge(this);
    }
}

class AccountType {
    overdraftCharge(account) {
        if (this.isPremium) {
            const baseCharge = 10;
            if (account.daysOverdrawn <= 7)
                return baseCharge;
            else
                return baseCharge + (account.daysOverdrawn - 7) * 0.85;
        } else
            return account.daysOverdrawn * 1.75;
    }
}
