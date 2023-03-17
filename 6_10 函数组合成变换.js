// 函数组合成变换(将多个函数结合起来形成一个新函数)
/**
 * 避免计算派生数据的逻辑到处重复
 * 让相关的逻辑找起来方便
 */
// 创建一个变换函数， 输入参数是需要变换的记录， 并直接返回该记录的值。
// 挑选一块逻辑， 将其主体移入变换函数中， 把结果作为字段添加到输出记录中。 修改客户端代码， 令其使用这个新字段。
// 测试。
// 针对其他相关的计算逻辑， 重复上述步骤。
function base(aReading) {
}
function taxableCharge(aReading) {
}
// 重构后
function enrichReading(argReading) {
    const aReading = _.cloneDeep(argReading);
    aReading.baseCharge = base(aReading);
    aReading.taxableCharge = taxableCharge(aReading);
    return aReading;
}

// ------------------
// public static int square(int x) {
//     return x * x;
// }
//
// public static List<Integer> squareList(List<Integer> numbers) {
//     List<Integer> result = new ArrayList<>();
//     for (int number : numbers) {
//         result.add(square(number));
//     }
//     return result;
// }
// ------------------
reading = {customer: "ivan", quantity: 10, month: 5, year: 2017};
// 调用者1
const aReading = acquireReading();
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;
// 调用者2
const aReading = acquireReading();
const base = (baseRate(aReading.month, aReading.year) * aReading.quantity);
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));
// 调用者3
const aReading = acquireReading();
const basicChargeAmount = calculateBaseCharge(aReading);
function calculateBaseCharge(aReading) {
    return baseRate(aReading.month, aReading.year) * aReading.quantity;
}

// 创建变换函数
function enrichReading(original) {
    const result = _.cloneDeep(original);
    return result;
}
// 调用者3
const rawReading = acquireReading();

const aReading = enrichReading(rawReading);

const basicChargeAmount = calculateBaseCharge(aReading);
function calculateBaseCharge(aReading) {
    return baseRate(aReading.month, aReading.year) * aReading.quantity;
}
// 调用者3: 把calculateBaseCharge函数搬移到增强过程中
function enrichReading(original) {
    const result = _.cloneDeep(original);
    result.baseCharge = calculateBaseCharge(result);
    return result;
}
const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const basicChargeAmount = calculateBaseCharge(aReading);
function calculateBaseCharge(aReading) {
    return baseRate(aReading.month, aReading.year) * aReading.quantity;
}

// basicChargeAmount从客户端代码中消失了，但是它的计算逻辑仍然存在于enrichReading函数中。
const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const basicChargeAmount = aReading.baseCharge;

// 调用者2 现状
const aReading = acquireReading();
const base = baseRate(aReading.month, aReading.year) * aReading.quantity;
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));
function enrichReading(original) {
    const result = _.cloneDeep(original);
    result.baseCharge = calculateBaseCharge(result);
    return result;
}
// 调用者2:使用变换函数
const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const base = aReading.baseCharge;
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));
// 调用者2:使用内联去掉base
const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
// const base = aReading.baseCharge;
const taxableCharge = Math.max(0, aReading.baseCharge - taxThreshold(aReading.year));
// 调用者2:将taxableCharge函数搬移到变换函数中
function enrichReading(original) {
    const result = _.cloneDeep(original);
    result.baseCharge = calculateBaseCharge(result);
    result.taxableCharge = Math.max(0, result.baseCharge - taxThreshold(result.year));
    return result;
}
// 调用者2:使用内联去掉taxableCharge
const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const taxableCharge = aReading.taxableCharge;