/**
 * voyageRisk 和 captainHistoryRisk 两个函数负责打出风险分数，
 * voyageProfitFactor 负责打出盈利潜力分数，rating 函数将3个分数组合到一起，给出一次航行的综合评级。
 * 
 */
function rating(voyage, history) {
    const vpf = voyageProfitFactor(voyage, history);
    const vr = voyageRisk(voyage);
    const chr = captainHistoryRisk(voyage, history);
    if (vpf * 3 > (vr + chr * 2)) return "A";
    else return "B";
}
function voyageRisk(voyage) {
    let result = 1;
    if (voyage.length > 4) result += 2;
    if (voyage.length > 8) result += voyage.length - 8;
    if (["china", "east-indies"].includes(voyage.zone)) result += 4;
    return Math.max(result, 0);
}
function captainHistoryRisk(voyage, history) {
    let result = 1;
    if (history.length < 5) result += 4;
    result += history.filter(v => v.profit < 0).length;
    // 1
    if (voyage.zone === "china" && hasChina(history)) result -= 2;
    return Math.max(result, 0);
}
function hasChina(history) {
    return history.some(v => "china" === v.zone);
}
function voyageProfitFactor(voyage, history) {
    let result = 2;
    if (voyage.zone === "china") result += 1;
    if (voyage.zone === "east-indies") result += 1;
    // 2
    if (voyage.zone === "china" && hasChina(history)) {
        result += 3;
        if (history.length > 10) result += 1;
        if (voyage.length > 12) result += 1;
        if (voyage.length > 18) result -= 1;
    } else {
        if (history.length > 8) result += 1;
        if (voyage.length > 14) result -= 1;
    }
    return result;
}
// 调用方
const voyage = { zone: "west-indies", length: 10 };
const history = [
    { zone: "east-indies", profit: 5 },
    { zone: "west-indies", profit: 15 },
    { zone: "china", profit: -2 },
    { zone: "west-africa", profit: 7 },
];
const myRating = rating(voyage, history);

// 1 方法组合成类
function rating(voyage, history) {
    return new Rating(voyage, history).value;
}
class Rating {
    constructor(voyage, history) {
        this.voyage = voyage;
        this.history = history;
    }
    get value() {
        const vpf = this.voyageProfitFactor;
        const vr = this.voyageRisk;
        const chr = this.captainHistoryRisk;
        if (vpf * 3 > (vr + chr * 2)) return "A";
        else return "B";
    }
    get voyageRisk() {
        let result = 1;
        if (this.voyage.length > 4) result += 2;
        if (this.voyage.length > 8) result += this.voyage.length - 8;
        if (["china", "east-indies"].includes(this.voyage.zone)) result += 4;
        return Math.max(result, 0);
    }
    get captainHistoryRisk() {
        let result = 1;
        if (this.history.length < 5) result += 4;
        result += this.history.filter(v => v.profit < 0).length;
        if (this.voyage.zone === "china" && this.hasChinaHistory) result -= 2;
        return Math.max(result, 0);
    }
    get voyageProfitFactor() {
        let result = 2;
        if (this.voyage.zone === "china") result += 1;
        if (this.voyage.zone === "east-indies") result += 1;
        if (this.voyage.zone === "china" && this.hasChinaHistory) {
            result += 3;
            if (this.history.length > 10) result += 1;
            if (this.voyage.length > 12) result += 1;
            if (this.voyage.length > 18) result -= 1;
        } else {
            if (this.history.length > 8) result += 1;
            if (this.voyage.length > 14) result -= 1;
        }
        return result;
    }
    get hasChinaHistory() {
        return this.history.some(v => "china" === v.zone);
    }
}

// 2 创建子类
class ExperiencedChinaRating extends Rating {
}

// 3 创建工厂
function createRating(voyage, history) {
    if (voyage.zone === "china" && history.some(v => "china" === v.zone))
        return new ExperiencedChinaRating(voyage, history);
    else return new Rating(voyage, history);
}

// 4 修改调用方代码
function rating(voyage, history) {
    return createRating(voyage, history).value;
}

// 5 子类复写被需要处理逻辑
class ExperiencedChinaRating {
    get captainHistoryRisk() {
        const result = super.captainHistoryRisk - 2;
        return Math.max(result, 0);
    }
}

// 5 父类删除需要抽离逻辑
class Rating {
    get captainHistoryRisk() {
        let result = 1;
        if (this.history.length < 5) result += 4;
        result += this.history.filter(v => v.profit < 0).length;
        // if (this.voyage.zone === "china" && this.hasChinaHistory) result -= 2;
        return Math.max(result, 0);
    }
}

// 6 处理其他地方
class Rating {
    get voyageProfitFactor() {
        let result = 2;
        if (this.voyage.zone === "china") result += 1;
        if (this.voyage.zone === "east-indies") result += 1;
        if (this.voyage.zone === "china" && this.hasChinaHistory) {
            result += 3;
            if (this.history.length > 10) result += 1;
            if (this.voyage.length > 12) result += 1;
            if (this.voyage.length > 18) result -= 1;
        } else {
            if (this.history.length > 8) result += 1;
            if (this.voyage.length > 14) result -= 1;
        }
        return result;
    }
}

// 7
class Rating {
    get voyageProfitFactor() {
        let result = 2;
        if (this.voyage.zone === "china") result += 1;
        if (this.voyage.zone === "east-indies") result += 1;
        result += this.voyageAndHistoryLengthFactor;
        return result;
    }
    get voyageAndHistoryLengthFactor() {
        let result = 0;
        if (this.voyage.zone === "china" && this.hasChinaHistory) {
            result += 3;
            if (this.history.length > 10) result += 1;
            if (this.voyage.length > 12) result += 1;
            if (this.voyage.length > 18) result -= 1;
        } else {
            if (this.history.length > 8) result += 1;
            if (this.voyage.length > 14) result -= 1;
        }
        return result;
    }
}

// 8 结束
class Rating {
    get voyageAndHistoryLengthFactor() {
        let result = 0;
        if (this.history.length > 8) result += 1;
        if (this.voyage.length > 14) result -= 1;
        return result;
    }
}
class ExperiencedChinaRating {
    get voyageAndHistoryLengthFactor() {
        let result = 0;
        result += 3;
        if (this.history.length > 10) result += 1;
        if (this.voyage.length > 12) result += 1;
        if (this.voyage.length > 18) result -= 1;
        return result;
    }
}

// 9 将 voyageAndHistoryLengthFactor 拆分
class Rating {
    get voyageAndHistoryLengthFactor() {
        let result = 0;
        result += this.historyLengthFactor;
        if (this.voyage.length > 14) result -= 1;
        return result;
    }
    get historyLengthFactor() {
        return (this.history.length > 8) ? 1 : 0;
    }
}
class ExperiencedChinaRating {
    get voyageAndHistoryLengthFactor() {
        let result = 0;
        result += 3;
        result += this.historyLengthFactor;
        if (this.voyage.length > 12) result += 1;
        if (this.voyage.length > 18) result -= 1;
        return result;
    }
    get historyLengthFactor() {
        return (this.history.length > 10) ? 1 : 0;
    }
}

// 10 搬移语句
class Rating {
    get voyageProfitFactor() {
        let result = 2;
        if (this.voyage.zone === "china") result += 1;
        if (this.voyage.zone === "east-indies") result += 1;
        // add
        result += this.historyLengthFactor;
        result += this.voyageAndHistoryLengthFactor;
        return result;
    }
    get voyageAndHistoryLengthFactor() {
        let result = 0;
        // result += this.historyLengthFactor;
        if (this.voyage.length > 14) result -= 1;
        return result;
    }
}
class ExperiencedChinaRating {
    get voyageAndHistoryLengthFactor() {
        let result = 0;
        result += 3;
        // result += this.historyLengthFactor;
        if (this.voyage.length > 12) result += 1;
        if (this.voyage.length > 18) result -= 1;
        return result;
    }
}
// 函数改名
class Rating {
    get voyageProfitFactor() {
        let result = 2;
        if (this.voyage.zone === "china") result += 1;
        if (this.voyage.zone === "east-indies") result += 1;
        result += this.historyLengthFactor;
        result += this.voyageLengthFactor;
        return result;
    }
    // get voyageAndHistoryLengthFactor() {
    get voyageLengthFactor() {
        return (this.voyage.length > 14) ? - 1 : 0;
    }
}
// 清晰逻辑
class ExperiencedChinaRating {
    get voyageLengthFactor() {
        let result = 0;
        result += 3;
        if (this.voyage.length > 12) result += 1;
        if (this.voyage.length > 18) result -= 1;
        return result;
    }
}
class ExperiencedChinaRating {
    get voyageProfitFactor() {
        return super.voyageProfitFactor + 3;
    }
    get voyageLengthFactor() {
        let result = 0;
        result += 3;
        if (this.voyage.length > 12) result += 1;
        if (this.voyage.length > 18) result -= 1;
        return result;
    }
}

// 最终效果

class Rating {
    constructor(voyage, history) {
        this.voyage = voyage;
        this.history = history;
    }
    get value() {
        const vpf = this.voyageProfitFactor; const vr = this.voyageRisk;
        const chr = this.captainHistoryRisk;
        if (vpf * 3 > (vr + chr * 2)) return "A";
        else return "B";
    }
    get voyageRisk() {
        let result = 1;
        if (this.voyage.length > 4) result += 2;
        if (this.voyage.length > 8) result += this.voyage.length - 8;
        if (["china", "east-indies"].includes(this.voyage.zone)) result += 4;
        return Math.max(result, 0);
    }
    get captainHistoryRisk() {
        let result = 1;
        if (this.history.length < 5) result += 4;
        result += this.history.filter(v => v.profit < 0).length;
        return Math.max(result, 0);
    }
    get voyageProfitFactor() {
        let result = 2;
        if (this.voyage.zone === "china") result += 1;
        if (this.voyage.zone === "east-indies") result += 1;
        result += this.historyLengthFactor;
        result += this.voyageLengthFactor;
        return result;
    }
    get voyageLengthFactor() {
        return (this.voyage.length > 14) ? - 1 : 0;
    }
    get historyLengthFactor() {
        return (this.history.length > 8) ? 1 : 0;
    }
}

class ExperiencedChinaRating extends Rating {
    get captainHistoryRisk() {
        const result = super.captainHistoryRisk - 2;
        return Math.max(result, 0);
    }
    get voyageLengthFactor() {
        let result = 0;
        if (this.voyage.length > 12) result += 1;
        if (this.voyage.length > 18) result -= 1;
        return result;
    }
    get historyLengthFactor() {
        return (this.history.length > 10) ? 1 : 0;
    }
    get voyageProfitFactor() {
        return super.voyageProfitFactor + 3;
    }
}