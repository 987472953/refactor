// 字段下移
/**
 * 某个字段只被一个子类（或者一小部分子类） 用到
 */
// 在所有需要该字段的子类中声明该字段。
// 将该字段从超类中移除。
// 测试。
// 将该字段从所有不需要它的那些子类中删掉。
// 测试。
class Employee { // Java
    private String quota;
} 
class Engineer extends Employee {...}
class Salesman extends Employee {...}

//
class Employee {...}
class Engineer extends Employee {...}
class Salesman extends Employee {
    protected String quota;
}