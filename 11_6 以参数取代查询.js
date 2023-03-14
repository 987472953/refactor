// 以参数取代查询
/**
 * 引用一个全局变量， 或者引用另一个我想要移除的元素。
 * 改变代码的依赖关系，为了让目标函数不再依赖于某个元素
 */
// 对执行查询操作的代码使用 提炼变量 ， 将其从函数体中分离出来。
// 现在函数体代码已经不再执行查询操作（而是使用前一步提炼出的变量） ，对这部分代码使用 提炼函数 。
// 使用 内联变量 ， 消除刚才提炼出来的变量。
// 对原来的函数使用 内联函数 。
// 对新函数改名， 改回原来函数的名字。
class HeatingPlan {
    get targetTemperature() {
        if (thermostat.selectedTemperature > this._max) return this._max;
        else if (thermostat.selectedTemperature < this._min) return this._min;
        else return thermostat.selectedTemperature;
    }
}

function client() {
    if (thePlan.targetTemperature > thermostat.currentTemperature) setToHeat();
    else if (thePlan.targetTemperature < thermostat.currentTemperature) setToCool();
    else setOff();
}

// 1 提炼参数
class HeatingPlan {
    get targetTemperature() {
        const selectedTemperature = thermostat.selectedTemperature;
        if (selectedTemperature > this._max) return this._max;
        else if (selectedTemperature < this._min) return this._min;
        else return selectedTemperature;
    }
}
// 2 提炼出
class HeatingPlan {
    get targetTemperature() {
        const selectedTemperature = thermostat.selectedTemperature;
        return this.xxNEWtargetTemperature(selectedTemperature);
    }
    xxNEWtargetTemperature(selectedTemperature) {
        if (selectedTemperature > this._max) return this._max;
        else if (selectedTemperature < this._min) return this._min;
        else return selectedTemperature;
    }
}
// 3 内联
class HeatingPlan {
    get targetTemperature() {
        return this.xxNEWtargetTemperature(thermostat.selectedTemperature);
    }
    xxNEWtargetTemperature(selectedTemperature) {
        if (selectedTemperature > this._max) return this._max;
        else if (selectedTemperature < this._min) return this._min;
        else return selectedTemperature;
    }
}
function clinet() {
    if (thePlan.xxNEWtargetTemperature(thermostat.selectedTemperature) >
        thermostat.currentTemperature)
        setToHeat();
    else if (thePlan.xxNEWtargetTemperature(thermostat.selectedTemperature) <
        thermostat.currentTemperature)
        setToCool();
    else
        setOff();
}

// 4 函数改名
function clinet() {
    if (thePlan.targetTemperature(thermostat.selectedTemperature) >
        thermostat.currentTemperature)
        setToHeat();
    else if (thePlan.targetTemperature(thermostat.selectedTemperature) <
        thermostat.currentTemperature)
        setToCool();
    else
        setOff();
}
class HeatingPlan {
    targetTemperature(selectedTemperature) {
        if (selectedTemperature > this._max) return this._max;
        else if (selectedTemperature < this._min) return this._min;
        else return selectedTemperature;
    }
}