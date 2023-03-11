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
if (anEmployee.onVacation)
    if (anEmployee.seniority > 10)
        return 1;
return 0.5;

// 1
if ((anEmployee.onVacation)
    && (anEmployee.seniority > 10)) return 1;
return 0.5;