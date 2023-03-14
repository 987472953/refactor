// 函数下移
/**
 * 超类中的某个函数只与一个（或少数几个） 子类有关
 */
// 将超类中的函数本体复制到每一个需要此函数的子类中。
// 删除超类中的函数。
// 测试。
// 将该函数从所有不需要它的那些子类中删除。
// 测试
class Employee {
    get quota() {
        // ...
    }
}
class Engineer extends Employee {
    // ...
}
class Salesman extends Employee {
    // ...
}

// 重构
class Employee {}
class Engineer extends Employee {}
class Salesman extends Employee {
    get quota() {}
}