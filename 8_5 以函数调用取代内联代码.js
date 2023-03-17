// 以函数调用取代内联代码
/**
 * 将一段内联代码的功能由一个函数来完成。
 */
// 将内联代码替代为对一个既有函数的调用。
// 测试
let appliesToMass = false;
for(const s of states) {
    if (s === "MA") appliesToMass = true;
}
// 重构后
appliesToMass = states.includes("MA");