const pricingPlan = retrievePricingPlan();
const order = retreiveOrder();
const baseCharge = pricingPlan.base;
let charge;
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