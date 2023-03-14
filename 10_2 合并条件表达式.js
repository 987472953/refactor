// 合并条件表达式
/**
 * 合并后的条件代码会表述“实际上只有一次条件检查， 只不过有多个并列条件需要检查而已”， 从而使这一次检查的用意更清晰
 * 将“做什么”的语句换成了“为什么这样做”
 */
// 确定这些条件表达式都没有副作用。
// 使用适当的逻辑运算符， 将两个相关条件表达式合并为一个。
// 测试。
// 重复前面的合并过程， 直到所有相关的条件表达式都合并到一起。
// 可以考虑对合并后的条件表达式实施提炼函数（106） 。
function disabilityAmount(anEmployee) {
    if (anEmployee.seniority < 2) return 0;
    if (anEmployee.monthsDisabled > 12) return 0;
    if (anEmployee.isPartTime) return 0;
    // compute the disability amount
}

// 1 使用一个条件表达式
function disabilityAmount(anEmployee) {
    if ((anEmployee.seniority < 2)
        || (anEmployee.monthsDisabled > 12)
        || (anEmployee.isPartTime)) return 0;
    // compute the disability amount
}

// 2 抽离函数
function disabilityAmount(anEmployee) {
    if (isNotEligableForDisability()) return 0;
    // compute the disability amount
}
function isNotEligableForDisability() {
    return ((anEmployee.seniority < 2)
        || (anEmployee.monthsDisabled > 12)
        || (anEmployee.isPartTime));
}

// ------------------
function demo(){
    if (anEmployee.onVacation)
        if (anEmployee.seniority > 10)
            return 1;
    return 0.5;
}


// 1
function demo() {
    if ((anEmployee.onVacation)
        && (anEmployee.seniority > 10)) return 1;
    return 0.5;
}
