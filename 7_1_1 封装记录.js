// 封装记录 / 以数据类取代记录
/**
 * 把方法的实现细节隐藏起来，通过方法名和参数来说明该方法做什么
 * 把与业务逻辑无关的代码从方法内部剥离出来，便于维护和升级
 * 利用设计模式（如工厂模式、单例模式等）来组织方法的实现，提高代码的复用性
 */
// 对持有记录的变量使用 封装变量 ， 将其封装到一个函数中
// 创建一个类， 将记录包装起来， 并将记录变量的值替换为该类的一个实例。 然后在类上定义一个访问函数， 用于返回原始的记录。 修改封装变量的函数， 令其使用这个访问函数。
// 测试。
// 新建一个函数， 让它返回该类的对象， 而非那条原始的记录
// 对于该记录的每处使用点， 将原先返回记录的函数调用替换为那个返回实例对象的函数调用。 使用对象上的访问函数来获取数据的字段， 如果该字段的访问函数还不存在， 那就创建一个。 每次更改之后运行测试。
// 移除类对原始记录的访问函数， 那个容易搜索的返回原始数据的函数也要一并删除。
// 测试。
// 如果记录中的字段本身也是复杂结构， 考虑对其再次应用 封装记录 或 封装集合 手法。
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