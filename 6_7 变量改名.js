// 变量改名
// 如果变量被广泛使用， 考虑运用 封装变量 将其封装起来。
// 找出所有使用该变量的代码， 逐一修改。
let a = height * width;
// 重构后
let area = height * width;