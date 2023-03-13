// 封装变量

// 创建封装函数， 在其中访问和更新变量值。
// 执行静态检查。
// 逐一修改使用该变量的代码， 将其改为调用合适的封装函数。 每次替换之后，执行测试。
// 限制变量的可见性。
// 测试。
// 如果变量的值是一个记录， 考虑使用 封装记录 。
let defaultOwner = { firstName: "Martin", lastName: "Fowler" };
// 重构后
let defaultOwnerData = { firstName: "Martin", lastName: "Fowler" };
export function defaultOwner() { return defaultOwnerData; }
export function setDefaultOwner(arg) { defaultOwnerData = arg; }