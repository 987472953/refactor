// 以委托取代子类
/**
 * 继承只能用于处理一个方向上的变化
 * 继承给类之间引入了非常紧密的关系。 在超类上做任何修改， 都很可能破坏子类
 */
// 如果构造函数有多个调用者， 首先用 以工厂函数取代构造函数 把构造函数包装起来。
// 创建一个空的委托类， 这个类的构造函数应该接受所有子类特有的数据项， 并且经常以参数的形式接受一个指回超类的引用。
// 在超类中添加一个字段， 用于安放委托对象。
// 修改子类的创建逻辑， 使其初始化上述委托字段， 放入一个委托对象的实例。
// 选择一个子类中的函数， 将其移入委托类。
// 使用 搬移函数 手法搬移上述函数， 不要删除源类中的委托代码。
// 如果被搬移的源函数还在子类之外被调用了， 就把留在源类中的委托代码从子类移到超类， 并在委托代码之前加上卫语句， 检查委托对象存在。
// 如果子类之外已经没有其他调用者， 就用移除死代码 去掉已经没人使用的委托代码。
// 测试。
// 重复上述过程， 直到子类中所有函数都搬到委托类。
// 找到所有调用子类构造函数的地方， 逐一将其改为使用超类的构造函数。
// 测试。
// 运用移除死代码 去掉子类。
class Order {
    get daysToShip() {
        return this._warehouse.daysToShip;
    }
}
class PriorityOrder extends Order {
    get daysToShip() {
        return this._priorityPlan.daysToShip;
    }
}
// 重构后
class Order {
    get daysToShip() {
        return (this._priorityDelegate)
            ? this._priorityDelegate.daysToShip
            : this._warehouse.daysToShip;
    }
}
class PriorityOrderDelegate {
    get daysToShip() {
        return this._priorityPlan.daysToShip
    }
}

// 预定某个演出---------------------
class Booking {
    constructor(show, date) {
        this._show = show;
        this._date = date;
    }
    get hasTalkback() {
        return this._show.hasOwnProperty('talkback') && !this.isPeakDay;
    }
    get basePrice() {
        let result = this._show.price;
        if (this.isPeakDay) result += Math.round(result * 0.15);
        return result;
    }
}
// 这是个高级预定
class PremiumBooking extends Booking {
    constructor(show, date, extras) {
        super(show, date);
        this._extras = extras;
    }
    get hasTalkback() {
        return this._show.hasOwnProperty('talkback');
    }
    get basePrice() {
        return Math.round(super.basePrice + this._extras.premiumFee);
    }
    get hasDinner() {
        return this._extras.hasOwnProperty('dinner') && !this.isPeakDay;
    }
}
// 客户端 普通预定
aBooking = new Booking(show,date);
// 客户端 高级预定
aBooking = new PremiumBooking(show, date, extras);
// 1 以工厂函数取代构造函数
function createBooking(show, date) {
    return new Booking(show, date);
}
function createPremiumBooking(show, date, extras) {
    return new PremiumBooking (show, date, extras);
}
// 普通预定
aBooking = createBooking(show, date);
// 高级预定
aBooking = createPremiumBooking(show, date, extras);
// 2 新建一个委托类
class PremiumBookingDelegate {
    constructor(hostBooking, extras) {
        // 预定的对象
        this._host = hostBooking;
        // 只有子类才需要的数据
        this._extras = extras;
    }
}
// 3 在超类中添加一个字段，用于安放委托对象。
class Booking {
    constructor(show, date) {
        this._show = show;
        this._date = date;
    }
    get hasTalkback() {
        return this._show.hasOwnProperty('talkback') && !this.isPeakDay;
    }
    get basePrice() {
        let result = this._show.price;
        if (this.isPeakDay) result += Math.round(result * 0.15);
        return result;
    }
    _bePremium(extras) {
        this._premiumDelegate = new PremiumBookingDelegate(this, extras);
    }
}
function createPremiumBooking(show, date, extras) {
    const result = new PremiumBooking(show, date, extras);
    result._bePremium(extras);
    return result;
}

// 4 搬移子类的重新方法
class PremiumBookingDelegate{
    constructor(hostBooking, extras) {
        // 普通的booking对象
        this._host = hostBooking;
        // 只有子类才需要的数据
        this._extras = extras;
    }
    get hasTalkback() {
        return this._host._show.hasOwnProperty('talkback');
    }
}
class PremiumBooking extends Booking {
    constructor(show, date, extras) {
        super(show, date);
        this._extras = extras;
    }
    get hasTalkback() {
        // return this._show.hasOwnProperty('talkback');
        return this._premiumDelegate.hasOwnProperty('talkback');
    }
    get basePrice() {
        return Math.round(super.basePrice + this._extras.premiumFee);
    }
    get hasDinner() {
        return this._extras.hasOwnProperty('dinner') && !this.isPeakDay;
    }
}

// 5 删除子类方法, 超类使用委托类进行分发
class Booking {
    constructor(show, date) {
        this._show = show;
        this._date = date;
    }
    get hasTalkback() {
        // return this._show.hasOwnProperty('talkback') && !this.isPeakDay;
        return (this._premiumDelegate)
            ? this._premiumDelegate.hasTalkback
            : this._show.hasOwnProperty('talkback') && !this.isPeakDay;
    }
    get basePrice() {
        let result = this._show.price;
        if (this.isPeakDay) result += Math.round(result * 0.15);
        return result;
    }
    _bePremium(extras) {
        this._premiumDelegate = new PremiumBookingDelegate(this, extras);
    }
}
class PremiumBooking extends Booking {
    constructor(show, date, extras) {
        super(show, date);
        this._extras = extras;
    }
    get basePrice() {
        return Math.round(super.basePrice + this._extras.premiumFee);
    }
    get hasDinner() {
        return this._extras.hasOwnProperty('dinner') && !this.isPeakDay;
    }
}

// 6 操作basePrice, 子类调用了超类的basePrice
class Booking {
    constructor(show, date) {
        this._show = show;
        this._date = date;
    }
    get hasTalkback() {
        return (this._premiumDelegate)
            ? this._premiumDelegate.hasTalkback
            : this._show.hasOwnProperty('talkback') && !this.isPeakDay;
    }
    get basePrice() {
        let result = this._show.price;
        if (this.isPeakDay) result += Math.round(result * 0.15);
        // return result;
        return (this._premiumDelegate)
            ? this._premiumDelegate.extendBasePrice(result)
            : result;
    }
    _bePremium(extras) {
        this._premiumDelegate = new PremiumBookingDelegate(this, extras);
    }
}
class PremiumBookingDelegate{
    constructor(hostBooking, extras) {
        // 普通的booking对象
        this._host = hostBooking;
        // 只有子类才需要的数据
        this._extras = extras;
    }
    get hasTalkback() {
        return this._host._show.hasOwnProperty('talkback');
    }
    extendBasePrice(base) {
        // return Math.round(super.basePrice + this._extras.premiumFee);
        return Math.round(base + this._extras.premiumFee);
    }
}
// 7 将子类新方法 hasDinner 移动到委托类中
class PremiumBookingDelegate{
    constructor(hostBooking, extras) {
        // 普通的booking对象
        this._host = hostBooking;
        // 只有子类才需要的数据
        this._extras = extras;
    }
    get hasTalkback() {
        return this._host._show.hasOwnProperty('talkback');
    }
    extendBasePrice(base) {
        // return Math.round(super.basePrice + this._extras.premiumFee);
        return Math.round(base + this._extras.premiumFee);
    }
    get hasDinner() {
        return this._extras.hasOwnProperty('dinner') && !this.isPeakDay;
    }
}