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