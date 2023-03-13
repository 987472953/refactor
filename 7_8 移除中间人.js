// 移除中间人
/**
 * 随着受托类的特性（功能） 越来越多， 更多的转发函数就会使人烦躁。
 * 服务类完全变成了一个中间人，此时就应该让客户直接调用受托类。
 * 简化代码/减少转发函数/提高性能/降低耦合
 * 懂音律项目中的ServiceContainer可以看做是中间人
 */
// 为受托对象创建一个取值函数。
// 对于每个委托函数， 让其客户端转为连续的访问函数调用。 每次替换后运行测试
manager = aPerson.manager;
class Person {
    get manager() {return this.department.manager;}
}
// 重构后
manager = aPerson.department.manager;

// ----------------------
manager = aPerson.manager;
class Person {
    get manager() {return this._department.manager;}
}
class Department {
    get manager() {return this._manager;}
}

// 1 中间人代理对象直接返回
class Person {
    get department() {return this._department;}
}
// manager = aPerson.manager;
manager = aPerson.department.manager;