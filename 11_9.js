function score(candidate, medicalExam, scoringGuide) {
    let result = 0;
    let healthLevel = 0;
    // long body code
}

class Scorer {
    constructor(candidate, medicalExam, scoringGuide) {
        this._candidate = candidate;
        this._medicalExam = medicalExam;
        this._scoringGuide = scoringGuide;
    }
    execute() {
        this._result = 0;
        this._healthLevel = 0;
        // long body code
    }
}

// ------------

function score(candidate, medicalExam, scoringGuide) {
    let result = 0;
    let healthLevel = 0;
    let highMedicalRiskFlag = false;
    if (medicalExam.isSmoker) {
        healthLevel += 10;
        highMedicalRiskFlag = true;
    }
    let certificationGrade = "regular";
    if (scoringGuide.stateWithLowCertification(candidate.originState)) {
        certificationGrade = "low";
        result -= 5;
    }
    // lots more code like this
    result -= Math.max(healthLevel - 5, 0);
    return result;
}

// 1 创建空类, 将函数搬移到类
function score(candidate, medicalExam, scoringGuide) {
    return new Scorer().execute(candidate, medicalExam, scoringGuide);
}
class Scorer {
    execute(candidate, medicalExam, scoringGuide) {
        let result = 0;
        let healthLevel = 0;
        let highMedicalRiskFlag = false; if (medicalExam.isSmoker) {
            healthLevel += 10;
            highMedicalRiskFlag = true;
        }
        let certificationGrade = "regular";
        if (scoringGuide.stateWithLowCertification(candidate.originState)) {
            certificationGrade = "low";
            result -= 5;
        }
        // lots more code like this
        result -= Math.max(healthLevel - 5, 0);
        return result;
    }
}

// 2 逐步使用构造函数传入方法参数
function score(candidate, medicalExam, scoringGuide) {
    return new Scorer(candidate).execute(candidate, medicalExam, scoringGuide);
}
class Scorer {
    constructor(candidate) {
        this._candidate = candidate;
    }
    execute(candidate, medicalExam, scoringGuide) {
        let result = 0;
        let healthLevel = 0;
        let highMedicalRiskFlag = false;
        if (medicalExam.isSmoker) {
            healthLevel += 10;
            highMedicalRiskFlag = true;
        }
        let certificationGrade = "regular";
        if (scoringGuide.stateWithLowCertification(this._candidate.originState)) {
            certificationGrade = "low";
            result -= 5;
        }
        // lots more code like this
        result -= Math.max(healthLevel - 5, 0);
        return result;
    }
}

// 3 完成转移 (完成对象化)
function score(candidate, medicalExam, scoringGuide) {
    return new Scorer(candidate, medicalExam, scoringGuide).execute();
}
class Scorer {
    constructor(candidate, medicalExam, scoringGuide) {
        this._candidate = candidate;
        this._medicalExam = medicalExam;
        this._scoringGuide = scoringGuide;
    }
    execute() {
        let result = 0;
        let healthLevel = 0;
        let highMedicalRiskFlag = false;
        if (this._medicalExam.isSmoker) {
            healthLevel += 10;
            highMedicalRiskFlag = true;
        }
        let certificationGrade = "regular";
        if (this._scoringGuide.stateWithLowCertification(this._candidate.originState)) {
            certificationGrade = "low";
            result -= 5;
        }
        // lots more code like this
        result -= Math.max(healthLevel - 5, 0);
        return result;
    }
}

// 4 开始拆解复杂函数
class Scorer {
    constructor(candidate, medicalExam, scoringGuide) {
        this._candidate = candidate;
        this._medicalExam = medicalExam;
        this._scoringGuide = scoringGuide;
    }
    execute() {
        this._result = 0;
        let healthLevel = 0;
        let highMedicalRiskFlag = false;
        if (this._medicalExam.isSmoker) {
            healthLevel += 10;
            highMedicalRiskFlag = true;
        }
        let certificationGrade = "regular";
        if (this._scoringGuide.stateWithLowCertification(this._candidate.originState)) {
            certificationGrade = "low";
            this._result -= 5;
        }
        // lots more code like this
        this._result -= Math.max(healthLevel - 5, 0);
        return this._result;
    }
}

// 5 局部变量变为字段
class Scorer {
    constructor(candidate, medicalExam, scoringGuide) {
        this._candidate = candidate;
        this._medicalExam = medicalExam;
        this._scoringGuide = scoringGuide;
    }
    execute() {
        this._result = 0;
        this._healthLevel = 0;
        this._highMedicalRiskFlag = false;
        if (this._medicalExam.isSmoker) {
            this._healthLevel += 10;
            this._highMedicalRiskFlag = true;
        }
        this._certificationGrade = "regular";
        if (this._scoringGuide.stateWithLowCertification(this._candidate.originState)) {
            this._certificationGrade = "low";
            this._result -= 5;
        }
        // lots more code like this
        this._result -= Math.max(this._healthLevel - 5, 0);
        return this._result;
    }
}

// 6 提炼函数 等等
class Scorer {
    execute() {
        this._result = 0;
        this._healthLevel = 0;
        this._highMedicalRiskFlag = false;
        this.scoreSmoking();
        this._certificationGrade = "regular";
        if (this._scoringGuide.stateWithLowCertification(this._candidate.originState)) {
            this._certificationGrade = "low";
            this._result -= 5;
        }
        // lots more code like this
        this._result -= Math.max(this._healthLevel - 5, 0); return this._result;
    }
    scoreSmoking() {
        if (this._medicalExam.isSmoker) {
            this._healthLevel += 10;
            this._highMedicalRiskFlag = true;
        }
    }
}