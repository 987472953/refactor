// 拆分变量
/**
 * 临时变量被多次赋值
 * 临时变量应该只被赋值一次. 如果它们被赋值超过一次，就意味它们在函数中承担了一个以上的责任
 */
// 在待分解变量的声明及其第一次被赋值处， 修改其名称。
// 如果可能的话， 将新的变量声明为不可修改。
// 以该变量的第二次赋值动作为界， 修改此前对该变量的所有引用， 让它们引用
// 新变量。
// 测试。
// 重复上述过程。 每次都在声明处对变量改名， 并修改下次赋值之前的引用， 直至到达最后一处赋值。
function oldFun() {
    let temp = 2 * (height + width);
    console.log(temp);
    temp = height * width;
    console.log(temp);
}

function newFun() {
    const perimeter = 2 * (height + width);
    console.log(perimeter);
    const area = height * width;
    console.log(area);
}


// ---- 苏格兰布丁运动的距离
function distanceTravelled(scenario, time) {
    let result;
    let acc = scenario.primaryForce / scenario.mass;
    let primaryTime = Math.min(time, scenario.delay);
    result = 0.5 * acc * primaryTime * primaryTime;
    let secondaryTime = time - scenario.delay;
    if (secondaryTime > 0) {
        let primaryVelocity = acc * scenario.delay;
        acc = (scenario.primaryForce + scenario.secondaryForce) / scenario.mass;
        result += primaryVelocity * secondaryTime + 0.5 * acc * secondaryTime * secondaryTime;
    }
    return result;
}

// 1 第一个acc重命名并用const修饰
function distanceTravelled(scenario, time) {
    let result;
    const primaryAcceleration = scenario.primaryForce / scenario.mass;
    let primaryTime = Math.min(time, scenario.delay);
    result = 0.5 * primaryAcceleration * primaryTime * primaryTime;
    let secondaryTime = time - scenario.delay;
    if (secondaryTime > 0) {
        let primaryVelocity = primaryAcceleration * scenario.delay;
        let acc = (scenario.primaryForce + scenario.secondaryForce) / scenario.mass;
        result += primaryVelocity * secondaryTime + 0.5 * acc * secondaryTime * secondaryTime;
    }
    return result;
}

// 2 第二个acc重命名用const修饰
function distanceTravelled(scenario, time) {
    let result;
    const primaryAcceleration = scenario.primaryForce / scenario.mass;
    let primaryTime = Math.min(time, scenario.delay);
    result = 0.5 * primaryAcceleration * primaryTime * primaryTime;
    let secondaryTime = time - scenario.delay;
    if (secondaryTime > 0) {
        let primaryVelocity = primaryAcceleration * scenario.delay;
        const secondaryAcceleration = (scenario.primaryForce + scenario.secondaryForce) / scenario.mass;
        result += primaryVelocity * secondaryTime + 0.5 * secondaryAcceleration * secondaryTime * secondaryTime;
    }
    return result;
}


// -----------------  对输入参数赋值
function discount(inputValue, quantity) {
    if (inputValue > 50) inputValue = inputValue - 2;
    if (quantity > 100) inputValue = inputValue - 1;
    return inputValue;
}

function discount(originalInputValue, quantity) {
    let inputValue = originalInputValue;
    if (inputValue > 50) inputValue = inputValue - 2;
    if (quantity > 100) inputValue = inputValue - 1;
    return inputValue;
}

function discount(inputValue, quantity) {
    let result = inputValue;
    if (inputValue > 50) result = result - 2;
    if (quantity > 100) result = result - 1;
    return result;
}