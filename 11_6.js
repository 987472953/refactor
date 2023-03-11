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