// 内联变量(内联临时变量)
/**
 * 这个名字并不比表达式本身更具表现力。
 * 变量可能会妨碍重构附近的代码, 内联以进行其他重构
 */
// 做法
// 检查确认变量赋值语句的右侧表达式没有副作用。
// 如果变量没有被声明为不可修改， 先将其变为不可修改， 并执行测试。
// 找到第一处使用该变量的地方， 将其替换为直接使用赋值语句的右侧表达式。
// 测试。
// 重复前面两步， 逐一替换其他所有使用该变量的地方。
// 删除该变量的声明点和赋值语句。
// 测试
function oldFun() {
    let basePrice = anOrder.basePrice;
    return (basePrice > 1000);
}
// 重构后
function newFun() {
    return anOrder.basePrice > 1000;
}