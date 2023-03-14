// 字段改名
/**
 *
 */
// 如果记录的作用域较小， 可以直接修改所有该字段的代码， 然后测试。 后面的步骤就都不需要了。
// 如果记录还未封装， 请先使用 封装记录 。
// 在对象内部对私有字段改名， 对应调整内部访问该字段的函数。
// 测试。
// 如果构造函数的参数用了旧的字段名， 运用 改变函数声明 将其改名。
// 运用 函数改名 给访问函数改名。
organization = { name: "Acme Gooseberries", country: "GB" };

// 将 name 改名为 title
// 1 封装记录
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
organization = new Organization({ name: "Acme Gooseberries", country: "GB" });

// 取值函数、 设值函数、 构造函数以及内部数据结构
// 2 修改内部数据结构
class Organization {
    constructor(data) {
        this._title = data.name;
        this._country = data.country;
    }
    get name() { return this._title; }
    set name(aString) { this._title = aString; }
    get country() { return this._country; }
    set country(aCountryCode) { this._country = aCountryCode; }
}

// 3 构造函数 title name 同时存在, title优先级高
class Organization {
    constructor(data) {
        this._title = (data.title !== undefined) ? data.title : data.name;
        this._country = data.country;
    }
    get name() { return this._title; }
    set name(aString) { this._title = aString; }
    get country() { return this._country; }
    set country(aCountryCode) { this._country = aCountryCode; }
}

// 4 设值函数
const organization = new Organization({ title: "Acme Gooseberries", country: "GB" });

// 5 移除name
class Organization {
    constructor(data) {
        this._title = data.title;
        this._country = data.country;
    }
    get name() { return this._title; }
    set name(aString) { this._title = aString; }
    get country() { return this._country; }
    set country(aCountryCode) { this._country = aCountryCode; }
}

// 6 修改取值函数名
class Organization {
    constructor(data) {
        this._title = data.title;
        this._country = data.country;
    }
    get title() { return this._title; }
    set title(aString) { this._title = aString; }
    get country() { return this._country; }
    set country(aCountryCode) { this._country = aCountryCode; }
}