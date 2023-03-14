// 分解条件表达式
/**
 * 分解为多个独立的函数， 根据每个小块代码的用途， 为分解而得的新函数命名.
 * 将原函数中对应的代码改为调用新函数， 从而更清楚地表达自己的意图
 */
// 对条件判断和每个条件分支分别运用 提炼函数 手法。
// --------------------------------------------
// 购买某个商品 价格在夏天不同
if (!aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd))
    charge = quantity * plan.summerRate;
else
    charge = quantity * plan.regularRate + plan.regularServiceCharge;

// 1 提炼判断语句
if (summer())
    charge = quantity * plan.summerRate;
else
    charge = quantity * plan.regularRate + plan.regularServiceCharge;

function summer() {
    return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
}

// 2 提炼true情况
if (summer())
    charge = summerCharge();
else
    charge = quantity * plan.regularRate + plan.regularServiceCharge;
function summer() {
    return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
}
function summerCharge() {
    return quantity * plan.summerRate;
}

// 3 提炼false情况
if (summer())
    charge = summerCharge();
else
    charge = regularCharge(); function summer() {
        return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
    }
function summerCharge() {
    return quantity * plan.summerRate;
}
function regularCharge() {
    return quantity * plan.regularRate + plan.regularServiceCharge;
}

// 4 取代为三目运算符
charge = summer() ? summerCharge() : regularCharge();
function summer() {
    return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
}
function summerCharge() {
    return quantity * plan.summerRate;
}
function regularCharge() {
    return quantity * plan.regularRate + plan.regularServiceCharge;
}