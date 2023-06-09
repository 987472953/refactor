// 以工厂函数取代构造函数
/**
 * Java的构造函数只能返回当前所调用类的实例， 也就是说， 我无法根据环境或参数信息返回子类实例或代理对象；
 * 构造函数的名字是固定的， 因此无法使用比默认名字更清晰的函数名；
 * 构造函数需要通过特殊的操作符来调用（在很多语言中是new关键字） ， 所以在要求普通函数的场合就难以使用。
 */
// 新建一个工厂函数， 让它调用现有的构造函数。将调用构造函数的代码改为调用工厂函数。
// 每修改一处， 就执行测试。
// 尽量缩小构造函数的可见范围。
leadEngineer = new Employee(document.leadEngineer, 'E');
// 重构后
leadEngineer = createEngineer(document.leadEngineer);