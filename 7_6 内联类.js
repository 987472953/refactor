// 内联类
/**
 * 一个类不再承担足够责任
 * 有两个类， 想重新安排它们肩负的职责， 并让它们产生关联
 */
// 对于待内联类（源类） 中的所有public函数， 在目标类上创建一个对应的函数， 新创建的所有函数应该直接委托至源类。
// 修改源类public方法的所有引用点， 令它们调用目标类对应的委托方法。 每次更改后运行测试。
// 将源类中的函数与数据全部搬移到目标类， 每次修改之后进行测试， 直到源类变成空壳为止。
// 删除源类， 为它举行一个简单的“丧礼”
class Person {
    get officeAreaCode() { return this._telephoneNumber.areaCode; }
    get officeNumber() { return this._telephoneNumber.number; }
}
class TelephoneNumber {
    get areaCode() { return this._areaCode; }
    get number() { return this._number; }
}
// 重构后
class Person {
    get officeAreaCode() { return this._officeAreaCode; }
    get officeNumber() { return this._officeNumber; }
}


// 1
class TrackingInformation {
    get shippingCompany() { return this._shippingCompany; }
    set shippingCompany(arg) { this._shippingCompany = arg; }
    get trackingNumber() { return this._trackingNumber; }
    set trackingNumber(arg) { this._trackingNumber = arg; }
    get display() {
        return `${this.shippingCompany}: ${this.trackingNumber}`;
    }
}

class Shipment {
    get trackingInfo() {
        return this._trackingInformation.display;
    }
    get trackingInformation() { return this._trackingInformation; }
    set trackingInformation(aTrackingInformation) {
        this._trackingInformation = aTrackingInformation;
    }
}

aShipment.trackingInformation.shippingCompany = request.vendor;

// 2
class Shipment {
    set shippingCompany(arg) { this._trackingInformation.shippingCompany = arg; }
}
aShipment.shippingCompany = request.vendor;
