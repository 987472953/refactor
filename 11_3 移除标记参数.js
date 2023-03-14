// 移除标记参数
/**
 * 标记参数通常是一些布尔值或者枚举类型的变量，用来表示函数的一些行为特性。
 * 函数拆分成多个小函数，每个函数都只负责单个操作
 * 如果标记参数确实是必需的，我们也可以通过给参数起一个更加具体的名称来提高代码的可读性，
 * 或者将标记参数的类型修改为更加明确的枚举类型
 */
// 针对参数的每一种可能值， 新建一个明确函数。
// 对于“用字面量值作为参数”的函数调用者， 将其改为调用新建的明确函数
function setDimension(name, value) {
    if (name === "height") {
        this._height = value;
        return;
    }
    if (name === "width") {
        this._width = value;
        return;
    }
}

// update
function setHeight(value) { this._height = value; }
function setWidth(value) { this._width = value; }

// 固定的布尔 枚举 字符串
aShipment.deliveryDate = deliveryDate(anOrder, true);
aShipment.deliveryDate = deliveryDate(anOrder, false);

function deliveryDate(anOrder, isRush) {
    if (isRush) {
        let deliveryTime;
        if (["MA", "CT"].includes(anOrder.deliveryState)) deliveryTime = 1;
        else if (["NY", "NH"].includes(anOrder.deliveryState)) deliveryTime = 2;
        else deliveryTime = 3;
        return anOrder.placedOn.plusDays(1 + deliveryTime);
    }
    else {
        let deliveryTime;
        if (["MA", "CT", "NY"].includes(anOrder.deliveryState)) deliveryTime = 2;
        else if (["ME", "NH"].includes(anOrder.deliveryState)) deliveryTime = 3;
        else deliveryTime = 4;
        return anOrder.placedOn.plusDays(2 + deliveryTime);
    }
}
// 1 分解条件
function deliveryDate(anOrder, isRush) {
    if (isRush) return rushDeliveryDate(anOrder);
    else return regularDeliveryDate(anOrder);
}
function rushDeliveryDate(anOrder) {
    let deliveryTime;
    if (["MA", "CT"].includes(anOrder.deliveryState)) deliveryTime = 1;
    else if (["NY", "NH"].includes(anOrder.deliveryState)) deliveryTime = 2;
    else deliveryTime = 3;
    return anOrder.placedOn.plusDays(1 + deliveryTime);
}
function regularDeliveryDate(anOrder) {
    let deliveryTime;
    if (["MA", "CT", "NY"].includes(anOrder.deliveryState)) deliveryTime = 2;
    else if (["ME", "NH"].includes(anOrder.deliveryState)) deliveryTime = 3;
    else deliveryTime = 4;
    return anOrder.placedOn.plusDays(2 + deliveryTime);
}
// 2 修改调用方
// aShipment.deliveryDate = deliveryDate(anOrder,true);
aShipment.deliveryDate = rushDeliveryDate(anOrder);



// -------------------
function deliveryDate(anOrder, isRush) {
    let result;
    let deliveryTime;
    if (anOrder.deliveryState === "MA" || anOrder.deliveryState === "CT")
        deliveryTime = isRush ? 1 : 2;
    else if (anOrder.deliveryState === "NY" || anOrder.deliveryState === "NH") {
        deliveryTime = 2;
        if (anOrder.deliveryState === "NH" && !isRush)
            deliveryTime = 3;
    }
    else if (isRush)
        deliveryTime = 3;
    else if (anOrder.deliveryState === "ME")
        deliveryTime = 3;
    else
        deliveryTime = 4;
    result = anOrder.placedOn.plusDays(2 + deliveryTime);
    if (isRush) result = result.minusDays(1);
    return result;
}
// 1
function rushDeliveryDate(anOrder) { return deliveryDate(anOrder, true); }
function regularDeliveryDate(anOrder) { return deliveryDate(anOrder, false); }