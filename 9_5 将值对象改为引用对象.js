// 将值对象改为引用对象
/**
 *
 */
// 为相关对象创建一个仓库（如果还没有这样一个仓库的话） 。
// 确保构造函数有办法找到关联对象的正确实例。
// 修改宿主对象的构造函数， 令其从仓库中获取关联对象。 每次修改后执行测试。

// 每个订单都会创建一个顾客, 顾客修改信息后存在问题
class Order {
    constructor(data) {
        this._number = data.number;
        this._customer = new Customer(data.customer);
        // load other data
    }
    get customer() { return this._customer; }
}
class Customer {
    constructor(id) {
        this._id = id;
    }
    get id() { return this._id; }
}


// 使用全局注册客户对象
let _repositoryData;
export function initialize() {
    _repositoryData = {};
    _repositoryData.customers = new Map();
}
export function registerCustomer(id) {
    if (!_repositoryData.customers.has(id))
        _repositoryData.customers.set(id, new Customer(id));
    return findCustomer(id);
}
export function findCustomer(id) {
    return _repositoryData.customers.get(id);
}

class Order {
    constructor(data) {
        this._number = data.number;
        this._customer = registerCustomer(data.customer);
        // load other data
    }
    get customer() { return this._customer; }
}