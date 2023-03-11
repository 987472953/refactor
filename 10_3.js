function getPayAmount() {
    let result;
    if (isDead)
        result = deadAmount();
    else {
        if (isSeparated)
            result = separatedAmount();
        else {
            if (isRetired)
                result = retiredAmount();
            else
                result = normalPayAmount();
        }
    }
    return result;
}
// 优化后
function getPayAmount() {
    if (isDead) return deadAmount();
    if (isSeparated) return separatedAmount();
    if (isRetired) return retiredAmount();
    return normalPayAmount();
}


// ------
function payAmount(employee) {
    let result;
    if (employee.isSeparated) {
        result = { amount: 0, reasonCode: "SEP" };
    }
    else {
        if (employee.isRetired) {
            result = { amount: 0, reasonCode: "RET" };
        }
        else {
            // logic to compute amount
            lorem.ipsum(dolor.sitAmet); 1
            consectetur(adipiscing).elit();
            sed.do.eiusmod = tempor.incididunt.ut(labore) && dolore(magna.aliqua);
            ut.enim.ad(minim.veniam);
            result = someFinalComputation();
        }
    }
    return result;
}

// 1
function payAmount(employee) {
    let result;
    if (employee.isSeparated) return { amount: 0, reasonCode: "SEP" };
    if (employee.isRetired) {
        result = { amount: 0, reasonCode: "RET" };
    }
    else {
        // logic to compute amount
        lorem.ipsum(dolor.sitAmet);
        consectetur(adipiscing).elit();
        sed.do.eiusmod = tempor.incididunt.ut(labore) && dolore(magna.aliqua);
        ut.enim.ad(minim.veniam);
        result = someFinalComputation();
    }
    return result;
}

// 2
function payAmount(employee) {
    let result;
    if (employee.isSeparated) return { amount: 0, reasonCode: "SEP" };
    if (employee.isRetired) return { amount: 0, reasonCode: "RET" };
    // logic to compute amount
    lorem.ipsum(dolor.sitAmet);
    consectetur(adipiscing).elit();
    sed.do.eiusmod = tempor.incididunt.ut(labore) && dolore(magna.aliqua);
    ut.enim.ad(minim.veniam);
    result = someFinalComputation();
    return result;
}

// 3 删掉result
function payAmount(employee) {
    // let result;
    if (employee.isSeparated) return { amount: 0, reasonCode: "SEP" };
    if (employee.isRetired) return { amount: 0, reasonCode: "RET" };
    // logic to compute amount
    lorem.ipsum(dolor.sitAmet);
    consectetur(adipiscing).elit();
    sed.do.eiusmod = tempor.incididunt.ut(labore) && dolore(magna.aliqua);
    ut.enim.ad(minim.veniam);
    return someFinalComputation();
}


// ------------将条件反转
function adjustedCapital(anInstrument) {
    let result = 0;
    if (anInstrument.capital > 0) {
        if (anInstrument.interestRate > 0 && anInstrument.duration > 0) {
            result = (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor;
        }
    }
    return result;
}

// 1 反正条件1
function adjustedCapital(anInstrument) {
    let result = 0;
    if (anInstrument.capital <= 0) return result;
    if (anInstrument.interestRate > 0 && anInstrument.duration > 0) {
        result = (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor;
    }
    return result;
}
// 2-1 反正条件2
function adjustedCapital(anInstrument) {
    let result = 0;
    if (anInstrument.capital <= 0) return result;
    if (!(anInstrument.interestRate > 0 && anInstrument.duration > 0)) return result;
    result = (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor;
    return result;
}
// 2-2
function adjustedCapital(anInstrument) {
    let result = 0;
    if (anInstrument.capital <= 0) return result;
    if (anInstrument.interestRate <= 0 || anInstrument.duration <= 0) return result;
    result = (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor;
    return result;
}
// 3 合并相同条件
function adjustedCapital(anInstrument) {
    let result = 0;
    if (anInstrument.capital <= 0
        || anInstrument.interestRate <= 0
        || anInstrument.duration <= 0) return result;
    result = (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor;
    return result;
}
// 4 简化
function adjustedCapital(anInstrument) {
    if (anInstrument.capital <= 0
        || anInstrument.interestRate <= 0
        || anInstrument.duration <= 0) return 0;
    return (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor;
}