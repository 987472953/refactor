// 封装记录 / 以数据类取代记录
// 把方法的实现细节隐藏起来，通过方法名和参数来说明该方法做什么
// 把与业务逻辑无关的代码从方法内部剥离出来，便于维护和升级
// 利用设计模式（如工厂模式、单例模式等）来组织方法的实现，提高代码的复用性
organization = { name: "Acme Gooseberries", country: "GB" };
// 重构后
class Organization {
    constructor(data) {
        this._name = data.name;
        this._country = data.country;
    }
    get name() { return this._name; }
    set name(arg) { this._name = arg; }
    get country() { return this._country; }
    set country(arg) { this._country = arg; }
}

// --------------
const organization = { name: "Acme Gooseberries", country: "GB" };

result += `<h1>${organization.name}</h1>`;
organization.name = newName;

// 1 封装变量
function getRawDataOfOrganization() { return organization; }

result += `<h1>${getRawDataOfOrganization().name}</h1>`;
getRawDataOfOrganization().name = newName;

// 2 创建记录类，用类取代记录
class Organization {
    constructor(data) {
        this._data = data;
    }
}
const organization = new Organization({ name: "Acme Gooseberries", country: "GB" });
// function getRawDataOfOrganization() { return organization; }
function getRawDataOfOrganization() { return organization._data; }

result += `<h1>${getRawDataOfOrganization().name}</h1>`;
getRawDataOfOrganization().name = newName;

// 3 将记录展开到对象
class Organization {
    constructor(data) {
        this._data = data;
    }
    set name(aString) { this._data.name = aString; }
    get name() { return this._data.name; }
}
// function getRawDataOfOrganization() { return organization._data; }
function getOrganization() { return organization; }

result += `<h1>${getOrganization().name}</h1>`;
getOrganization().name = newName;

// 4 继续其他字段封装
class Organization {
    constructor(data) {
        this._name = data.name;
        this._country = data.country;
    }
    get name() { return this._name; }
    set name(aString) { this._name = aString; }
    get country() { return this._country; }
    set country(aCountryCode) { this._country = aCountryCode; }
}