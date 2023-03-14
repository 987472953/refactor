// 移动语句
/**
 * 让存在关联的东西一起出现
 */
// 确定待移动的代码片段应该被搬往何处。 仔细检查待移动片段与目的地之间的
// 剪切源代码片段， 粘贴到上一步选定的位置上。
// 测试。
function oldFun() {
    const pricingPlan = retrievePricingPlan();
    const order = retreiveOrder();
    let charge;
    const chargePerUnit = pricingPlan.unit;
}
// 重构后
function newFun() {
    const pricingPlan = retrievePricingPlan();
    const chargePerUnit = pricingPlan.unit;
    const order = retreiveOrder();
    let charge;
}
// -----------
const baseCharge = pricingPlan.base;
const chargePerUnit = pricingPlan.unit;
const units = order.units;
let discount;
charge = baseCharge + units * chargePerUnit;
let discountableUnits = Math.max(units - pricingPlan.discountThreshold, 0);
discount = discountableUnits * pricingPlan.discountFactor;
if (order.isRepeat) discount += 20;
charge = charge - discount;
chargeOrder(charge);


// let result;
// if (availableResources.length === 0) {
//     result = createResource();
//     allocatedResources.push(result);
// } else {
//     result = availableResources.pop();
//     allocatedResources.push(result);
// }
// return result;

// let result;
// if (availableResources.length === 0) {
//     result = createResource();
// } else {
//     result = availableResources.pop();
// }
// allocatedResources.push(result);
// return result;