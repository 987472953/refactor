// 内联类
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
