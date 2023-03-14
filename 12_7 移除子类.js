// 移除子类
/**
 * 子类所支持的变化可能会被搬移到别处，甚至完全去除
 * 有时添加子类是为了应对未来的功能，结果构想中的功能压根没被构造出来， 或者用了另一种方式构造
 */
// 使用 以工厂函数取代构造函数 ， 把子类的构造函数包装到超类的工厂函数中。
// 如果有任何代码检查子类的类型， 先用 提炼函数 把类型检查逻辑包装
// 起来， 然后用 搬移函数 将其搬到超类。 每次修改后执行测试。
// 新建一个字段， 用于代表子类的类型。
// 将原本针对子类的类型做判断的函数改为使用新建的类型字段。
// 删除子类。
// 测试。
class Person {
    get genderCode() {return "X";}
}
class Male extends Person {
    get genderCode() {return "M";}
}
class Female extends Person {
    get genderCode() {return "F";}
}
// 重构后
class Person {
    get genderCode() {return this._genderCode;}
}

// ----------------
class Person {
    constructor(name) {
        this._name = name;
    }
    get name() {return this._name;}
    get genderCode() {return "X";}
}
class Male extends Person {
    get genderCode() {return "M";}
}
class Female extends Person {
    get genderCode() {return "F";}
}
// 客户端使用 1
const numberOfMales = people.filter(p => p instanceof Male).length;
// 客户端使用 2
function loadFromInput(data) {
    const result = [];
    data.forEach(aRecord => {
        let p;
        switch (aRecord.gender) {
            case 'M': p = new Male(aRecord.name); break;
            case 'F': p = new Female(aRecord.name); break;
            default: p = new Person(aRecord.name);
        }
        result.push(p);
    });
    return result;
}
// 1 将创建选择子类的逻辑提炼到一个函数中
function loadFromInput(data) {
    const result = [];
    data.forEach(aRecord => {
        result.push(createPerson(aRecord));
    });
    return result;
}
function createPerson(aRecord) {
    let p;
    switch (aRecord.gender) {
        case 'M': p = new Male(aRecord.name); break;
        case 'F': p = new Female(aRecord.name); break;
        default: p = new Person(aRecord.name);
    }
    return p;
}

// 2 内联变量&以管道取代循环
function loadFromInput(data) {
    return data.map(aRecord => createPerson(aRecord));
}
function createPerson(aRecord) {
    switch (aRecord.gender) {
        case 'M': return new Male (aRecord.name);
        case 'F': return new Female(aRecord.name);
        default: return new Person(aRecord.name);
    }
}
// 3 将客户端1提炼函数
const numberOfMales = people.filter(p => isMale(p)).length;
function isMale(aPerson) {return aPerson instanceof Male;}
// 4 搬移函数到超类
class Person {
    constructor(name) {
        this._name = name;
    }
    get name() {return this._name;}
    get genderCode() {return "X";}
    get isMale() {return this instanceof Male;}
}
const numberOfMales = people.filter(p => p.isMale).length;
// 5 添加一个字段来表示子类之间的差异
class Person{
    constructor(name, genderCode) {
        this._name = name;
        this._genderCode = genderCode || "X";
    }
    get name() {return this._name;}
    get genderCode() {return this._genderCode;}
    get isMale() {return this instanceof Male;}
}
// 6 修改工厂函数，令其返回一个Person对象
function loadFromInput(data) {
    return data.map(aRecord => createPerson(aRecord));
}
function createPerson(aRecord) {
    switch (aRecord.gender) {
        case 'M': return new Person(aRecord.name, "M");
        case 'F': return new Female(aRecord.name);
        default: return new Person(aRecord.name);
    }
}
// 7 检查 instanceof 逻辑, 使用类型吗进行取代
class Person{
    constructor(name, genderCode) {
        this._name = name;
        this._genderCode = genderCode || "X";
    }
    get name() {return this._name;}
    get genderCode() {return this._genderCode;}
    // get isMale() {return this instanceof Male;}
    get isMale() {return "M" === this._genderCode;}
}
// 8 修改 Female 同上
function createPerson(aRecord) {
    switch (aRecord.gender) {
        case 'M': return new Person(aRecord.name, "M");
        case 'F': return new Person(aRecord.name, "F");
        default: return new Person(aRecord.name, "X");
    }
}