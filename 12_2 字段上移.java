//字段上移
/**
 * 观察函数如何使用它们。 如果它们被使用的方式很相似， 我就可以将它们提升到超类中去。
 * 字段上移基本上是应用 构造函数本体上移 后的必然结果
 */
// 针对待提升之字段， 检查它们的所有使用点， 确认它们以同样的方式被使用。
// 如果这些字段的名称不同， 先使用变量改名（137） 为它们取个相同的名字。
// 在超类中新建一个字段。
// 新字段需要对所有子类可见（在大多数语言中protected权限便已足够） 。
// 移除子类中的字段。
// 测试。
class Employee {
    // ...
}
class Salesman extends Employee {
    private String name;
}
class Engineer extends Employee {
    private String name;
}
