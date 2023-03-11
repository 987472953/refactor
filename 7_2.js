// 封装集合
class Person {
    get courses() { return this._courses; }
    set courses(aList) { this._courses = aList; }
}
// 重构后
class Person {
    get courses() { return this._courses.slice(); }
    addCourse(aCourse) { 
        // ... 
    }
    removeCourse(aCourse) { 
        // ...
    }
}

// 人对象
class Person {
    constructor(name) {
        this._name = name;
        this._courses = [];
    }
    get name() { return this._name; }
    get courses() { return this._courses; }
    set courses(aList) { this._courses = aList; }
}

class Course {
    constructor(name, isAdvanced) {
        this._name = name;
        this._isAdvanced = isAdvanced;
    }
    get name() { return this._name; }
    get isAdvanced() { return this._isAdvanced; }
}
const aPerson = new Person("张三")
aPerson.courses([new Course("Java", false), new Course("Python", true)])
numAdvancedCourses = aPerson.courses.filter(c => c.isAdvanced).length;

const basicCourseNames = readBasicCourseNames(filename)

aPerson.courses = basicCourseNames.map(name => new Course(name, false));

for (const name of readBasicCourseNames(filename)) {
    // 直接更新list, 破坏了封装性
    aPerson.courses.push(new Course(name, false));
}


// 重构
class Person {
    constructor(name) {
        this._name = name;
        this._courses = [];
    }
    get name() { return this._name; }
    // get courses() { return this._courses; }
    get courses() { this._courses.slice() }
    // set courses(aList) { this._courses = aList; }
    set courses(aList) { this._courses = aList.slice(); }

    addCourse(aCourse) {
        this._courses.push(aCourse);
    }
    removeCourse(aCourse, fnIfAbsent = () => { throw new RangeError(); }) {
        const index = this._courses.indexOf(aCourse);
        if (index === -1) fnIfAbsent();
        else this._courses.splice(index, 1);
    }
}
